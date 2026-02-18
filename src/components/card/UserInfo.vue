<template>
  <div class="user-info">
    <h1 class="name">Moe Jiyun233</h1>
    <div class="divider"></div>
    <p class="bio">声に出すのは簡単で でも伝えるのは難しくて</p>
  </div>
</template>

<style scoped>
.user-info {
  display: flex;
  flex-direction: column;
  text-shadow:
      0 2px 10px rgba(64, 158, 255, 0.15),
      0 5px 20px rgba(64, 158, 255, 0.1);
}

.name {
  line-height: 1.3;
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  background: var(--name-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.divider {
  width: 48px;
  height: 5px;
  background: var(--primary-color);
  border-radius: 10px;
  margin: 0.4rem 0 0.8rem 0;
}

.bio {
  font-size: 1rem;
  color: var(--text-color);
  opacity: 0.85;
  line-height: 1;
  font-weight: 400;
  max-width: 350px;
}

@media (max-width: 600px) {
  .user-info {
    align-items: center;
    text-align: center;
  }
  .name { font-size: 1.8rem; }
}
</style>