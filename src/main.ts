/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

import VuetifyNotifier from 'vuetify-notifier'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

registerPlugins(app)

app.use(VuetifyNotifier, {
  default: {
    defaultColor: 'primary',
    closeIcon: 'mdi-close',
  },
})

app.mount('#app')
