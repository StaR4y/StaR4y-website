<template>
  <div class="theme-toggle" @click="themeStore.toggleTheme" :class="themeStore.theme">
    <div class="track">
      <div class="thumb">
        <span class="icon">{{ themeStore.theme === 'light' ? '🌙' : '☀️' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useThemeStore} from '@/stores/theme';

const themeStore = useThemeStore();
</script>

<style scoped>
.track {
  width: 60px;
  height: 30px;
  background: var(--toggle-bg);
  border: 1px solid var(--track-border);
  border-radius: 30px;
  position: relative;
  backdrop-filter: blur(4px);
}

.thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  background: var(--thumb-bg);
  box-shadow: var(--thumb-shadow);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s var(--bezier-bounce);
}

/* 状态切换 */
[data-theme='dark'] .thumb {
  transform: translateX(30px);
}
</style>