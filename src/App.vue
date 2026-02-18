<script setup lang="ts">
import { ref, provide } from 'vue';
import Loading from "@/components/Loading.vue";
import { useThemeStore } from "@/stores/theme";
import Background from "@/components/Background.vue";

const themeStore = useThemeStore();
const isLoaded = ref(false);
const showLoading = ref(true);

provide('loaded', isLoaded);

const handleClose = () => {
  showLoading.value = false;
};

const bgUrl = "http://www.uapis.cn/api/v1/random/image?category=acg&type=pc";
const img = new Image();
img.src = bgUrl;
img.onload = () => {
  isLoaded.value = true;
  document.documentElement.style.setProperty('--bg-url', `url(${bgUrl})`);
};
</script>

<template>
  <div :style="{ '--bg-url': `url(${bgUrl})` }">
    <Transition name="page-fade">
      <Loading v-if="showLoading" @close="handleClose" />
    </Transition>
    <RouterView />
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