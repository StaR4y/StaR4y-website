<script setup>
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import MainCard from "@/components/MainCard.vue";
import CurrentTime from "@/components/CurrentTime.vue";
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
NeteaseMiniPlayer.init();
</script>

<template>
  <div class="app-container">
    <ThemeSwitcher class="theme-switcher" />
    <Navbar />
    <main class="content">
      <CurrentTime />
      <MainCard />
    </main>
    <Footer />
  </div>
</template>

<style>

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}

.theme-switcher {
  position: fixed;
  right: 1vmin;
  bottom: 1vmin;
  z-index: 100;
}
</style>