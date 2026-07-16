<script setup>
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
import MainCard from "@/components/MainCard.vue";
import CurrentTime from "@/components/CurrentTime.vue";
</script>

<template>
  <div class="app-container">
    <ThemeSwitcher class="theme-switcher" />
    <main class="content">
      <CurrentTime />
      <MainCard />
    </main>
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
