import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

import Home from './components/Home.vue'
import Contact from './components/Contact.vue'
import Services from './components/Services.vue'
import About from './components/About.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        title: 'M&R Brooke Transportation LLC | Oklahoma City Auto Transport',
        description: 'Oklahoma City\'s licensed car hauler. M&R Brooke Transportation moves cars, trucks, classics, and dealer fleets across all 48 states. Call (405) 761-4477 for a free quote.'
      }
    },
    {
      path: '/services',
      component: Services,
      meta: {
        title: 'Auto Transport Services | M&R Brooke Transportation LLC – OKC',
        description: 'Oklahoma City auto transport, classic car hauling, and dealer fleet transport across the US. Licensed under DOT# 4352389 | MC# 1701962. Get a free quote today.'
      }
    },
    {
      path: '/about',
      component: About,
      meta: {
        title: 'About Us | M&R Brooke Transportation LLC – Oklahoma City',
        description: 'Family-owned and owner-operated auto transport out of the Oklahoma City area. When you call M&R Brooke Transportation, you reach the driver. Nationwide coverage, personal service.'
      }
    },
    {
      path: '/contact',
      component: Contact,
      meta: {
        title: 'Get a Free Quote | M&R Brooke Transportation LLC – OKC',
        description: 'Request a free auto transport quote from M&R Brooke Transportation in Oklahoma City. We haul cars, trucks, and collector vehicles across the US. Call (405) 761-4477.'
      }
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title || 'M&R Brooke Transportation LLC'
  const desc = document.querySelector('meta[name="description"]')
  if (desc && to.meta.description) {
    desc.setAttribute('content', to.meta.description)
  }
})

createApp(App).use(router).mount('#app')
