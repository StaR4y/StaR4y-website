<script setup>

import Background from "@/components/Background.vue";
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import MainCard from "@/components/MainCard.vue";
import CurrentTime from "@/components/CurrentTime.vue";
import Footer from "@/components/Footer.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <ThemeSwitcher class="theme-switcher" />
  <Navbar />
  <CurrentTime />
  <MainCard />
  <Footer />
</template>

<style scoped>
.theme-switcher {
  position: absolute;
  top: auto;
  right: 1vmin;
  bottom: 1vmin;
  left: auto;
}
</style>