<template>
  <div class="not-found-container">
    <div class="error-card">
      <h1 class="error-code">404</h1>
      <p class="error-msg">未知领域!</p>
      <router-link to="/" class="back-home">
        返回首页
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-card {
  text-align: center;
  padding: 3rem 4rem;
  background: var(--toggle-bg);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid var(--track-border);
  border-radius: 40px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
}

.error-code {
  font-size: 6rem;
  font-weight: 900;
  margin: 0;
  background: var(--name-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -4px;
}

.error-msg {
  font-size: 1.2rem;
  color: var(--text-color);
  opacity: 0.6;
  margin: 1rem 0 2rem;
}

.back-home {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: var(--text-color);
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.back-home:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  opacity: 0.9;
}
</style>