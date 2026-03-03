<script setup lang="ts">
import { ref, provide } from 'vue';
import Loading from "@/components/Loading.vue";
import { useThemeStore } from "@/stores/theme";
import Background from "@/components/Background.vue";
import { Collections } from './util/collections.ts'
import { Analytics } from '@vercel/analytics/vue';
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const themeStore = useThemeStore();
const isLoaded = ref(false);
const showLoading = ref(true);

provide('loaded', isLoaded);

const handleClose = () => {
  showLoading.value = false;
};

const bgs = [
    "amia.jpg","ena.png"
]

const bgUrl = `/assets/${Collections.getRandomItem(bgs)}`;
const img = new Image();
img.src = bgUrl;
img.onload = () => {
  isLoaded.value = true;
  document.documentElement.style.setProperty('--bg-url', `url(${bgUrl})`);
};
</script>

<template>
  <div class="app-wrapper" :style="{ '--bg-url': `url(${bgUrl})` }">
    <Analytics />
    <Transition name="page-fade">
      <Loading v-if="showLoading" @close="handleClose" />
    </Transition>
    <Navbar />
    <main class="main-content">
      <RouterView />
    </main>
    <Footer />
    <Background />
  </div>
</template>

<style>
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
}

.page-fade-leave-active {
  transition: opacity 800ms ease !important;
}

.page-fade-leave-to {
  opacity: 0 !important;
}

.page-fade-leave-from {
  opacity: 1;
}
</style>