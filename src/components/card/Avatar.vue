<script setup lang="ts">
const qq = "1025336361";
const fallbackAvatar = "/assets/avatar.png";
const qqAvatar = `https://q1.qlogo.cn/g?b=qq&nk=${qq}&s=640`;

const handleAvatarError = (event: Event) => {
  const image = event.target as HTMLImageElement;

  if (image.src.endsWith(fallbackAvatar)) return;

  image.src = fallbackAvatar;
};
</script>

<template>
  <div class="avatar-wrapper">
    <img :src="qqAvatar" alt="QQ avatar" class="avatar" referrerpolicy="no-referrer" @error="handleAvatarError">
  </div>
</template>

<style scoped>
.avatar-wrapper {
  display: flex;
  justify-content: center;
}

.avatar {
  width: 100px;
  height: 100px;
  object-fit: cover;

  border-radius: 28px;
  border: 2px solid var(--avatar-border);

  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1),
  0 0 20px var(--thumb-shadow);

  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* 带有轻微回弹效果 */
  cursor: pointer;
}

.avatar:hover {
  transform: scale(1.1) rotate(1deg);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2),
  0 0 30px var(--primary-color);
  border-color: var(--primary-color);
}
</style>
