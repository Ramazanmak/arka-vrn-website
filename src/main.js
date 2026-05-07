import { ViteSSG } from 'vite-ssg'
import routes from './router'
import App from './App.vue'


export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }

      return { top: 0 };
    },
  },
  ({ app, router, isClient }) => {
  }
);