<template>
  <div class="user-info">
    <h1 class="name">StaR4y</h1>
    <div class="divider"></div>
    <p class="bio">「先生，人生相談です」</p>
  </div>
</template>

<style scoped>
.user-info {
  display: flex;
  flex-direction: column;
  filter: drop-shadow(0 0 18px rgba(214, 92, 255, 0.24));
}

.name {
  line-height: 1.3;
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #ffffff 0%, #d8d8df 48%, #8f909a 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow:
      0 0 14px rgba(255, 255, 255, 0.36),
      0 0 32px rgba(210, 210, 220, 0.24),
      0 0 54px rgba(120, 120, 135, 0.16);
}

.divider {
  width: 48px;
  height: 5px;
  background: var(--name-gradient);
  border-radius: 10px;
  margin: 0.4rem 0 0.8rem 0;
  box-shadow: 0 0 18px rgba(214, 92, 255, 0.44);
}

.bio {
  font-size: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #d8d8df 48%, #8f909a 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.92;
  line-height: 1;
  font-weight: 400;
  max-width: 350px;
  text-shadow:
      0 0 12px rgba(255, 255, 255, 0.3),
      0 0 26px rgba(210, 210, 220, 0.2),
      0 0 44px rgba(120, 120, 135, 0.14);
}

@media (max-width: 600px) {
  .user-info {
    align-items: center;
    text-align: center;
  }
  .name { font-size: 1.8rem; }
}
</style>
