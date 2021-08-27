import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import FirebaseConfiguration from '@/configuration/firebase-configuration';

FirebaseConfiguration.initialize();
createApp(App).use(router).mount('#app')
