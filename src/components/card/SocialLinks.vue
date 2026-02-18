<script setup lang="ts">
import BiliBili from "@/components/icons/BiliBili.vue";
import GitHub from "@/components/icons/GitHub.vue";
import QQ from "@/components/icons/QQ.vue";
import Mail from "@/components/icons/Mail.vue";

const socialLinks = [
  { icon: GitHub, url: 'https://github.com/jiyun233', label: 'Github' },
  { icon: BiliBili, url: 'https://space.bilibili.com/245830927', label: 'Bilibili' },
  { icon: QQ, url: 'tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=3312268214', label: 'Telegram' },
  { icon: Mail, url: 'mailto:koishi@origin.pw', label: 'Mail' },
];
</script>

<template>
  <div class="social-wrapper">
    <a v-for="item in socialLinks"
       :key="item.label"
       :href="item.url"
       target="_blank"
       class="social-item"
    >
      <component :is="item.icon" :size="20" stroke-width="1.5" />
    </a>
  </div>
</template>

<style scoped>
.social-wrapper {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  justify-content: center;
}

.social-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 30px;

  color: var(--text-color);
  border: 1px solid var(--text-color-light);
  border-radius: 12px;

  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  cursor: pointer;
  text-decoration: none;
  opacity: 0.8;
}

.social-item:hover {
  opacity: 1;
  transform: translateY(-5px);
  border-color: var(--primary-color);
  color: var(--primary-color);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

[data-theme='dark'] .social-item {
  background: rgba(255, 255, 255, 0.03);
}
</style>