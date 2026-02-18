<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="copyright">
        &copy; {{ new Date().getFullYear() }} <span>Moe Jiyun233</span>. All rights reserved.
      </p>
      <div class="credits">
          Loading Animation From <a href="https://github.com/Ceale/ceale.moe" target="_blank">Ceale/ceale.moe</a>
      </div>
      <div class="icp">
        <a href="https://icp.gov.moe/?keyword=20269527" target="_blank">萌ICP备20269527号</a>
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
  padding: 1.5rem 0;
  z-index: 10;
  pointer-events: none;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: auto;
}

.copyright, .credits a, .icp a {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--text-color);
  opacity: 0.4;
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: opacity 0.3s ease, color 0.3s ease;
}

.credits {
  color: var(--text-color);
  opacity: 0.4;
  font-size: 0.75rem;
  font-weight: 400;
}

.copyright span {
  font-weight: 600;
}

.credits a:hover, .icp a:hover {
  opacity: 0.9;
  color: var(--track-border);
}

.copyright:hover {
  opacity: 0.8;
}

@media (max-width: 600px) {
  .footer {
    position: relative;
    clear: both;
    margin-top: auto;
    padding: 3rem 0;
  }
}
</style>