require('dotenv').config();
const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");
const express= require('express');
const bodyParser= require('body-parser');
const axios = require('axios');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

/**
 * CORS
 */
server.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', '*');
    response.header('Access-Control-Allow-Headers', '*');

    next();
})

server.post('/authentication/line', async function(request, response) {
    const code = request.body.code;

    const requestParams = new URLSearchParams();
    requestParams.append('grant_type', 'authorization_code');
    requestParams.append('code', code);
    requestParams.append('redirect_uri', process.env.LINE_REDIRECT_URL);
    requestParams.append('client_id', process.env.LINE_CHANNEL_ID);
    requestParams.append('client_secret', process.env.LINE_CLIENT_SECRET);

    const lineResponse = await axios.post(process.env.LINE_ISSUE_TOKEN_URL, requestParams);
    const idToken = lineResponse.data.id_token;

    const customToken = await createCustomTokenFromLineToken(idToken);

    const responseData = {customToken: customToken};
    response.json(responseData);
});

/**
 *
 */
server.post('/authentication/line/token', async function(request, response){
    const idToken = request.body.token;

    const customToken = await createCustomTokenFromLineToken(idToken);

    const responseData = {customToken: customToken};
    response.json(responseData);
});

const createCustomTokenFromLineToken = async function(idToken) {
    const lineResponse = await verifyTokenWithLINE(idToken);

    const uid = 'line:' + lineResponse.sub;
    await createNewUserInFirebaseIfNotExisted(uid, lineResponse);

    return await admin.auth().createCustomToken(uid);
}

const verifyTokenWithLINE = async function(idToken) {
    const request = new URLSearchParams();
    request.append('id_token', idToken);
    request.append('client_id', process.env.LINE_CHANNEL_ID);

    // Send request to LINE server for token verification
    const response = await axios.post(process.env.LINE_TOKEN_VERIFICATION_URL, request);

    if (response.status !== 200) {
        //TODO handle error
    }
    return response.data;
}

const createNewUserInFirebaseIfNotExisted = async function (uid, userData) {
    const existedUser = await admin.auth().getUser(uid);
    console.log('existedUser');
    console.log(existedUser);
    console.log('userData');
    console.log(userData);

    if (!existedUser) {
        const createUserRequest = {
            uid: uid,
            displayName: userData.name,
            photoURL: userData.picture,
            email: userData.email
        };
        await admin.auth().createUser(createUserRequest);
    } else {
        const updateRequest = {
            displayName: userData.name,
            photoURL: userData.picture,
            email: userData.email
        }
        await admin.auth().updateUser(uid, updateRequest);
    }
}

const port = 3000;
server.listen(port, function() {
    console.log(`Server listen on port ${port}`);
})
