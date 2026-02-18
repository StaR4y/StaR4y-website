<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const time = ref('');
let timer: number;

const update = () => {
  const now = new Date();
  time.value = now.getHours().toString().padStart(2, '0') + ':' +
      now.getMinutes().toString().padStart(2, '0') + ':' +
      now.getSeconds().toString().padStart(2, '0');
};

onMounted(() => {
  update();
  timer = window.setInterval(update, 1000);
});

onUnmounted(() => clearInterval(timer));
</script>

<template>
  <div class="time-container">
    <span class="time-text">{{ time }}</span>
  </div>
</template>

<style scoped>
.time-container {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  pointer-events: none;
}

.time-text {
  font-size: 5rem;
  font-weight: 900;
  letter-spacing: -2px;
  font-family: 'Inter', system-ui, sans-serif;

  background: var(--name-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  opacity: 0.75;
  transition: opacity 0.3s ease;
}

@media (max-width: 600px) {
  .time-text {
    font-size: 3.5rem;
  }
  .time-container {
    top: 15%;
  }
}
</style>