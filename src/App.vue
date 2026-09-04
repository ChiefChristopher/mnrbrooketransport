<template>
  <div id="site">
    <NavBar />
    <main>
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<style>
#site {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
}
</style>
