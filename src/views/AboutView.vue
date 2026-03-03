<script setup lang="ts">
import Avatar from "@/components/card/Avatar.vue";
import {ref} from "vue";

const showAvatarDesc = ref(false);
</script>

<template>
  <div class="global">
    <Avatar @click="showAvatarDesc = !showAvatarDesc" />
    <Transition name="slide-fade">
      <div v-if="showAvatarDesc" class="avatar-desc">
        Character from TUYU's album
        <span class="album-name">"アンダーメンタリティ"</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.global {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  flex-direction: column;
}

.avatar-desc {
  margin-top: 1.5rem;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  color: #a855f7;
  background: linear-gradient(135deg, #c084fc 0%, #f472b6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(192, 132, 252, 0.4));
}

.album-name {
  font-style: italic;
  margin-left: 0.3rem;
  background: linear-gradient(135deg, #e9d5ff 0%, #fbcfe8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: underline dotted rgba(236, 72, 153, 0.3);
}

/*noinspection ALL*/
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

/*noinspection ALL*/
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
  filter: blur(4px);
}
</style>