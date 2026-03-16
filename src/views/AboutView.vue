<script setup lang="ts">
import Avatar from "@/components/card/Avatar.vue";
import {onMounted, onUnmounted, ref} from "vue";
import InfoCard from "@/components/card/InfoCard.vue";

// icons
import GitHub from "@/components/icons/GitHub.vue";
import Sex from "@/components/icons/Sex.vue";
import Person from "@/components/icons/Person.vue";
import BiliBili from "@/components/icons/BiliBili.vue";
import QQ from "@/components/icons/QQ.vue";

const showAvatarDesc = ref(false);

const age = ref('')

const birthDate = new Date('2007-09-23')

function updateAge() {
  const now = new Date()
  const diffMs = now.getTime() - birthDate.getTime()
  const years = diffMs / (1000 * 60 * 60 * 24 * 365.25)
  age.value = years.toFixed(5)
}

let timer: ReturnType<typeof setInterval>

onMounted(() => {
  document.body.style.overflowY = 'auto'
  updateAge()
  timer = setInterval(updateAge, 10)
})

onUnmounted(() => {
  document.body.style.overflowY = 'hidden'
  clearInterval(timer)
})
</script>

<template>
  <div class="global">
    <TransitionGroup name="layout" tag="div" class="group">
      <Avatar
          key="avatar"
          @click="showAvatarDesc = !showAvatarDesc"
          class="avatar-item"
      />

      <div v-if="showAvatarDesc" key="desc" class="avatar-desc">
        Character from TUYU's album
        <span class="album-name">"アンダーメンタリティ"</span>
      </div>

      <div key="name" class="name">
        Moe Jiyun233
      </div>


      <div class="cards">
        <InfoCard icon="✨" label="签名 / Motto" value="声に出すのは簡単で でも伝えるのは難しくて。" :col-span="3" :delay="50" />

        <InfoCard :icon="Sex" label="性别 / Sex" value="男 / Male" :tall="true" :delay="150"  fontSize="1.6rem" />

        <InfoCard icon="📍" label="居所 / Location" value="中国 / Chinese Mainland" subValue="福建 / Fujian" :tall="true" :delay="150" fontSize="0.9rem" />

        <InfoCard :icon="Person" label="年龄 / Age" :value="age" subValue="2007 / 09 / 23" :tall="true" :delay="150" fontSize="1.2rem" />

        <InfoCard :icon="GitHub" label="GitHub" value="@MoeJiyun233" link="https://github.com/jiyun233" :col-span="2" :delay="100" />
        <InfoCard icon="💼" label="职业 / Occupation" value="学生 / Student" :delay="250" />

        <InfoCard icon="🛠️" label="技术栈 / Stack" value="Kotlin · Java · Vue · TypeScript · Python · And more stack learning..." :delay="180" :col-span="3" fontSize="1.2rem" />

        <InfoCard icon="🐦" label="Twitter / X" value="@MoeJiyun233" link="https://x.com/moe_neko233" :delay="200" />
        <InfoCard :icon="BiliBili" label="Bilibili" value="@极云Nya" link="https://space.bilibili.com/245830927" :delay="220" />
        <InfoCard :icon="QQ" label="QQ" value="3312268214" :delay="240" />


        <InfoCard icon="🎵" label="Listening to" value="TUYU" subValue="アンダーメンタリティ" :col-span="2" :delay="200" />

        <InfoCard icon="✉️" label="Email" value="koishi@origin.pw" link="mailto:koishi@origin.pw" :delay="300" />
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.group {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.global {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 4rem 2rem 4rem;
  min-height: 100vh;

  overflow-y: auto;

  opacity: 0;
  animation: pageIn 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.avatar-item {
  cursor: pointer;
  flex-shrink: 0;
  z-index: 2;
}

.avatar-desc {
  margin-top: .5rem;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  text-align: center;
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

.name {
  font-size: 1.6rem;
  font-weight: 700;
  margin-top: 1.2rem;
  letter-spacing: 0.15em;

  background: linear-gradient(135deg, #e2d4f0 0%, #c084fc 40%, #f472b6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  filter: drop-shadow(0 0 12px rgba(192, 132, 252, 0.5));

  position: relative;
}

.name::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c084fc, #f472b6, transparent);
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
  width: 100%;
  max-width: 800px;
  margin-top: 2rem;
}


@keyframes pageIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

/*noinspection ALL*/
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.45s cubic-bezier(0.25, 1, 0.5, 1),
  filter 0.45s cubic-bezier(0.25, 1, 0.5, 1);
}

/*noinspection ALL*/
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(4px);
}

/*noinspection ALL*/
.layout-leave-active {
  position: absolute;  /* 👈 离开时脱离文档流 */
}

/*noinspection ALL*/
.layout-move {
  transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
}

/*noinspection ALL*/
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.45s cubic-bezier(0.25, 1, 0.5, 1),
              filter 0.45s cubic-bezier(0.25, 1, 0.5, 1);
}

/*noinspection ALL*/
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
  filter: blur(4px);
}
</style>