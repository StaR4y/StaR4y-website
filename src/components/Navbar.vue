<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isOpen = ref(false);
const router = useRouter();

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' }
];

const navigate = (path: string) => {
  router.push(path);
  isOpen.value = false;
};
</script>

<template>
  <nav class="nav-container" :class="{ 'is-open': isOpen }">
    <div class="nav-menu">
      <button
          v-for="item in navItems"
          :key="item.path"
          @click="navigate(item.path)"
          class="nav-link"
      >
        {{ item.name }}
      </button>
    </div>

    <button class="menu-toggle" @click="isOpen = !isOpen" aria-label="Toggle Menu">
      <span class="burger-icon">
        <span class="line top"></span>
        <span class="line bottom"></span>
      </span>
    </button>
  </nav>
</template>

<style scoped>
.nav-container {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.nav-menu {
  display: flex;
  gap: 0.4rem;
  padding: 0.4rem;
  overflow: hidden;

  background: var(--toggle-bg);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid var(--track-border);
  border-radius: 16px;

  max-width: 0;
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  pointer-events: none;
}

.is-open .nav-menu {
  max-width: 500px;
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
}

.nav-link {
  background: transparent;
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-color);
  cursor: pointer;
  border-radius: 10px;
  transition: all 0.2s;
  white-space: nowrap;
}

.nav-link:hover {
  background: var(--text-color-light);
  color: var(--primary-color);
}

.menu-toggle {
  width: 48px;
  height: 48px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  background: var(--toggle-bg);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid var(--track-border);
  border-radius: 16px;
}

.menu-toggle:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.burger-icon {
  width: 20px;
  height: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.line {
  width: 100%;
  height: 2px;
  background: var(--text-color);
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  border-radius: 2px;
}

.is-open .top {
  transform: translateY(4px) rotate(45deg);
}

.is-open .bottom {
  transform: translateY(-4px) rotate(-45deg);
}

@media (max-width: 600px) {
  .nav-container {
    top: 1.5rem;
    right: 1.5rem;
  }
  .nav-menu {
    border-radius: 12px;
  }
}
</style>