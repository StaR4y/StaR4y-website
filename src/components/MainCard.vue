<script setup lang="ts">
import Avatar from "@/components/card/Avatar.vue";
import UserInfo from "@/components/card/UserInfo.vue";
import SocialLinks from "@/components/card/SocialLinks.vue";
</script>

<template>
  <div class="card-body">
    <Avatar />
    <div class="content-wrapper">
      <UserInfo />
      <SocialLinks />
    </div>
  </div>
</template>

<style scoped>
.card-body {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2.5rem;

  width: fit-content;
  min-width: 600px;
  max-width: 90%;
  padding: 3rem 4rem;

  background: var(--toggle-bg);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid var(--track-border);
  border-radius: 40px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

@media (max-width: 650px) {
  .card-body {
    flex-direction: column;
    padding: 2rem 2rem;
    gap: 2rem;
    min-width: 85%;
  }

  .content-wrapper {
    align-items: center;
    text-align: center;
  }
}
</style>