import {User} from "@/domains/user";
import axios from "axios";
import firebase from "firebase";
import "firebase/auth";

const AuthService = {

    async createCustomToken(code: string): Promise<string> {
        const createCustomTokenResponse =
            await axios.post('http://localhost:3000/authentication/line', {code: code});
        return createCustomTokenResponse.data.customToken;
    },

    saveCurrentUserInfo(user: User): void {
        if (!user) {
            return;
        }
        window.localStorage.setItem('user.uid', user.uid);
        if (user.name) {
            window.localStorage.setItem('user.name', user.name);
        }
        if (user.avatarUrl) {
            window.localStorage.setItem('user.avatarUrl', user.avatarUrl);
        }
    },

    getCurrentUserInfo(): User | null {
        const uid = window.localStorage.getItem('user.uid') as string;
        const name = window.localStorage.getItem('user.name') as string;
        const avatarUrl = window.localStorage.getItem('user.avatarUrl');

        if (!uid) {
            return null;
        }

        return {
            uid: uid,
            name: name,
            avatarUrl: avatarUrl
        }
    },

    async logout(): Promise<void> {
        await firebase.auth().signOut();
        window.localStorage.removeItem('user.uid');
        window.localStorage.removeItem('user.name');
        window.localStorage.removeItem('user.avatarUrl');
    }
};

export default AuthService;