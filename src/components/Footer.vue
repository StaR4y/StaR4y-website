<script setup lang="ts">
import { onMounted, ref } from 'vue';

type MoeCounterRecord = {
  name: string;
  num: number | string;
};

const visitCount = ref('...');
const counterEndpoint = 'https://count.getloli.com/record/@jiyun233';

onMounted(async () => {
  try {
    const response = await fetch(counterEndpoint);

    if (!response.ok) {
      throw new Error(`Counter request failed: ${response.status}`);
    }

    const data = await response.json() as MoeCounterRecord;
    const count = Number(data.num);

    visitCount.value = Number.isFinite(count) ? count.toLocaleString() : String(data.num ?? '--');
  } catch (error) {
    console.error(error);
    visitCount.value = '--';
  }
});
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <span class="visit-count">访问量 {{ visitCount }}</span>

      <p class="copyright">
        &copy; {{ new Date().getFullYear() }} <span class="brand">StaR4y</span>. All Rights Reserved.
      </p>

      <div class="service-tag">
        <a href="https://www.tencentcloud.com/products/edgeone" target="_blank" rel="noopener noreferrer">
          <span class="dot"></span>
          Site Secured & Accelerated by Tencent Cloud EdgeOne (Pages, Security, CDN)
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.35rem 0;
  z-index: 10;
  pointer-events: none;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  pointer-events: auto;
}

.copyright, .service-tag a, .visit-count {
  margin: 0;
  font-size: 0.7rem;
  color: var(--text-color);
  opacity: 0.5;
  text-decoration: none;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.1);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.copyright {
  font-weight: 400;
  letter-spacing: 0.01em;
}

.copyright .brand {
  font-weight: 600;
  opacity: 0.85;
}

.visit-count {
  font-weight: 500;
}

.service-tag a {
  font-size: 0.65rem;
  opacity: 0.4;
  letter-spacing: 0.08em;
  display: flex;
  align-items: center;
  gap: 4px;
}

.service-tag .dot {
  width: 3px;
  height: 3px;
  background-color: var(--track-border, currentColor);
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 4px var(--track-border);
}

.service-tag a:hover {
  opacity: 0.7;
  color: var(--track-border);
  text-shadow: 0 0 8px var(--track-border);
}

@media (max-width: 600px) {
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    padding: 0.5rem 0;
    background: transparent;
    z-index: 10;

    pointer-events: none;
  }

  .footer-content {
    pointer-events: auto;
    gap: 0.05rem;
  }

  .copyright, .service-tag a, .visit-count {
    font-size: 0.6rem;
  }
}
</style>
