<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="copyright">
        &copy; {{ new Date().getFullYear() }} <span class="brand">Moe Jiyun233</span>. All Rights Reserved.
      </p>

      <div class="icp">
        <a href="https://icp.gov.moe/?keyword=20269527" target="_blank" class="icp-link">萌ICP备20269527号</a>
        <a href="https://beian.miit.gov.cn/#/Integrated/" target="_blank" class="icp-link">闽ICP备2026006101号-1</a>
      </div>

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

.copyright, .service-tag a, .icp-link {
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

.icp {
  display: flex;
  gap: 0.4rem;
  align-items: center;
}

.icp-link {
  font-size: 0.75rem;
  padding: 0.02rem 0.35rem;
  border-radius: 4px;
  background-color: rgba(128, 128, 128, 0.03);
  border: 1px solid rgba(128, 128, 128, 0.06);
}

.icp-link:hover {
  opacity: 0.9;
  color: var(--track-border);
  background-color: rgba(128, 128, 128, 0.06);
  border-color: var(--track-border);
  box-shadow: 0 0 10px rgba(var(--track-border-rgb, 128, 128, 128), 0.2);
  transform: translateY(-0.5px);
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
    position: relative;
    padding: 1.2rem 0;
    margin-top: 1.5rem;
  }
}
</style>

<script setup lang="ts">
</script>