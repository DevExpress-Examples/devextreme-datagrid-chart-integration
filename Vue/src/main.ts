import config from 'devextreme/core/config';
import { licenseKey } from './devextreme-license';

config({ licenseKey });

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './assets/main.css';
import './assets/chart-styles.css';

const app = createApp(App);

app.use(router);

app.mount('#app');
