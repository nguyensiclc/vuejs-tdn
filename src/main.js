import { createApp } from 'vue'
import App from './App.vue'
// import axios from 'axios';

createApp(App).mount('#app')

window.axios = require('axios');

// export const positionMixin = {
//     data() {
//         positions: []
//     },
//     mount: function () {
//         axios.get('http://localhost:3000/positions/')
//         .then(
            
//         )
//     },
//   }