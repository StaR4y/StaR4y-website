<template>
  <div class="global-background"></div>
</template>

<style scoped>
.global-background {
  z-index: -1;
  position: fixed;
  inset: 0;
  background-image: var(--bg-url);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  opacity: var(--bg-opacity);
  filter: blur(var(--bg-blur)) brightness(var(--bg-brightness));
  transition: opacity 1.2s ease-in-out, filter 0.5s ease;
}
</style>