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
    { path: '/', component: Home, meta: { title: 'M&R Brooke Transportation LLC | Car & Freight Hauling' } },
    { path: '/services', component: Services, meta: { title: 'Services | M&R Brooke Transportation LLC' } },
    { path: '/about', component: About, meta: { title: 'About Us | M&R Brooke Transportation LLC' } },
    { path: '/contact', component: Contact, meta: { title: 'Contact Us | M&R Brooke Transportation LLC' } },
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title || 'M&R Brooke Transportation LLC'
})

createApp(App).use(router).mount('#app')
