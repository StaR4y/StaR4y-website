<script setup lang="ts">
import { computed, onMounted, onUnmounted, provide, ref } from 'vue';
import Loading from "@/components/Loading.vue";
import { useThemeStore } from "@/stores/theme";
import Background from "@/components/Background.vue";
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

const backgroundModules = import.meta.glob('./assets/backgrounds/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const backgrounds = Object.entries(backgroundModules)
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([, url]) => url);
const bgUrl = ref('');
const bgImage = computed(() => bgUrl.value ? `url("${bgUrl.value}")` : 'none');
let currentBackgroundHour = -1;
let backgroundTimer: number | undefined;

const applyBackground = (url: string, shouldMarkLoaded = false) => {
  const img = new Image();

  img.onload = () => {
    bgUrl.value = url;
    document.documentElement.style.setProperty('--bg-url', `url("${url}")`);

    if (shouldMarkLoaded) {
      isLoaded.value = true;
    }
  };

  img.onerror = () => {
    if (shouldMarkLoaded) {
      isLoaded.value = true;
    }
  };

  img.src = url;
};

const getHourlyBackground = (date = new Date()) => {
  if (backgrounds.length === 0) {
    return undefined;
  }

  const daySeed = date.getFullYear() * 372 + date.getMonth() * 31 + date.getDate();
  const index = (daySeed + date.getHours()) % backgrounds.length;

  return backgrounds[index];
};

const updateHourlyBackground = (shouldMarkLoaded = false) => {
  const now = new Date();
  const nextBackground = getHourlyBackground(now);

  if (!nextBackground) {
    isLoaded.value = true;
    return;
  }

  if (currentBackgroundHour === now.getHours() && bgUrl.value === nextBackground) {
    if (shouldMarkLoaded) {
      isLoaded.value = true;
    }
    return;
  }

  currentBackgroundHour = now.getHours();
  applyBackground(nextBackground, shouldMarkLoaded);
};

onMounted(() => {
  updateHourlyBackground(true);

  backgroundTimer = window.setInterval(() => {
    updateHourlyBackground();
  }, 60000);
});

onUnmounted(() => {
  window.clearInterval(backgroundTimer);
});
</script>

<template>
  <div class="app-wrapper" :style="{ '--bg-url': bgImage }">
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
  align-items: center;
  padding-bottom: 60px;
  width: 100%;
}

/*noinspection ALL*/
.page-fade-leave-active {
  transition: opacity 800ms ease !important;
}

/*noinspection ALL*/
.page-fade-leave-to {
  opacity: 0 !important;
}

/*noinspection ALL*/
.page-fade-leave-from {
  opacity: 1;
}
</style>
