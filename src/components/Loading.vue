<script setup lang="ts">
import { computed, inject, onBeforeUnmount, ref, watch, type Ref } from "vue";
import { sleep } from "@/util/sleep";

const emit = defineEmits(["close"]);
const loaded = inject<Ref<boolean>>("loaded");
const width = ref(0);
const progress = computed(() => Math.round(width.value));

let animationFinish = false;
let isClosing = false;

watch(() => loaded?.value, () => hide());

const timer = window.setInterval(() => {
  width.value += (94 - width.value) / 5;
  if (width.value > 90) {
    window.clearInterval(timer);
    animationFinish = true;
    hide();
  }
}, 120);

const hide = async () => {
  if (isClosing || !animationFinish || !loaded?.value) return;

  isClosing = true;
  await sleep(420);
  width.value = 100;
  await sleep(620);
  emit("close");
};

onBeforeUnmount(() => {
  window.clearInterval(timer);
});
</script>

<template>
  <section class="loading-screen" aria-label="Loading">
    <div class="ambient ambient-one" aria-hidden="true"></div>
    <div class="ambient ambient-two" aria-hidden="true"></div>

    <div class="loader-card">
      <div class="mark" aria-hidden="true">
        <span></span>
      </div>

      <div class="copy">
        <p>StaR4y</p>
        <h1>正在准备页面</h1>
      </div>

      <div class="progress-track" aria-hidden="true">
        <div class="progress-fill" :style="{ width: width + '%' }"></div>
      </div>

      <div class="progress-meta">
        <span>请稍候</span>
        <span>{{ progress }}%</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
  color: #fff7fd;
  background:
    radial-gradient(circle at 28% 22%, rgba(255, 151, 218, 0.2), transparent 30%),
    radial-gradient(circle at 74% 72%, rgba(154, 146, 255, 0.18), transparent 34%),
    linear-gradient(145deg, #140d18 0%, #201827 52%, #100d17 100%);
}

.ambient {
  position: absolute;
  width: min(62vw, 520px);
  aspect-ratio: 1;
  border-radius: 50%;
  filter: blur(18px);
  opacity: 0.48;
  animation: float-glow 7s ease-in-out infinite;
}

.ambient-one {
  left: -10%;
  top: 10%;
  background: radial-gradient(circle, rgba(255, 139, 216, 0.42), transparent 62%);
}

.ambient-two {
  right: -12%;
  bottom: 2%;
  background: radial-gradient(circle, rgba(139, 125, 255, 0.38), transparent 64%);
  animation-delay: -2.4s;
}

.loader-card {
  position: relative;
  width: min(82vw, 440px);
  padding: clamp(1.6rem, 5vw, 2.2rem);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 24px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.06)),
    rgba(255, 255, 255, 0.08);
  box-shadow:
    0 28px 80px rgba(0, 0, 0, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.24);
  backdrop-filter: blur(26px) saturate(150%);
  -webkit-backdrop-filter: blur(26px) saturate(150%);
}

.loader-card::before {
  content: "";
  position: absolute;
  inset: 1px;
  pointer-events: none;
  border-radius: inherit;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.24), transparent 36%),
    radial-gradient(circle at 82% 12%, rgba(255, 139, 216, 0.22), transparent 34%);
}

.mark,
.copy,
.progress-track,
.progress-meta {
  position: relative;
  z-index: 1;
}

.mark {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  margin: 0 auto 1.15rem;
  border-radius: 50%;
  background:
    linear-gradient(135deg, rgba(255, 139, 216, 0.95), rgba(214, 92, 255, 0.86), rgba(139, 125, 255, 0.9));
  box-shadow:
    0 0 24px rgba(255, 139, 216, 0.42),
    0 0 54px rgba(214, 92, 255, 0.32);
  animation: breathe 2.8s ease-in-out infinite;
}

.mark span {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.78);
  box-shadow: inset 0 0 18px rgba(255, 255, 255, 0.34);
}

.copy {
  text-align: center;
}

.copy p {
  margin: 0;
  color: rgba(255, 247, 253, 0.68);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.copy h1 {
  margin: 0.45rem 0 1.35rem;
  color: #ffffff;
  font-size: clamp(1.55rem, 6vw, 2.5rem);
  line-height: 1.2;
  font-weight: 820;
  letter-spacing: 0;
  text-shadow:
    0 0 18px rgba(255, 139, 216, 0.34),
    0 0 34px rgba(139, 125, 255, 0.22);
}

.progress-track {
  height: 8px;
  padding: 2px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.13);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #ff9bdd, #d65cff 52%, #9aa7ff);
  box-shadow: 0 0 18px rgba(214, 92, 255, 0.46);
  transition: width 520ms ease;
}

.progress-meta {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.7rem;
  color: rgba(255, 247, 253, 0.58);
  font-size: 0.78rem;
}

@keyframes breathe {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.055);
  }
}

@keyframes float-glow {
  0%, 100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(2rem, -1rem, 0) scale(1.08);
  }
}

@media (max-width: 560px) {
  .loader-card {
    width: min(88vw, 380px);
    border-radius: 22px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ambient,
  .mark {
    animation: none;
  }
}
</style>
