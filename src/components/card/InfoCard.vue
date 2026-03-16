<script setup lang="ts">
import { ref, type Component } from 'vue';

withDefaults(defineProps<{
  icon?: Component | string
  label?: string
  value?: string
  subValue?: string
  link?: string
  delay?: number
  colSpan?: 1 | 2 | 3
  tall?: boolean
  fontSize?: string  // 自定义 value 字号，例如 "0.75rem"
}>(), {
  delay: 0,
  colSpan: 1,
  tall: false,
})

const hovered = ref(false)
</script>

<template>
  <a
      class="info-card"
      :class="{ hovered, tall }"
      :href="link || undefined"
      :target="link ? '_blank' : undefined"
      :style="{
      animationDelay: `${delay}ms`,
      gridColumn: colSpan > 1 ? `span ${colSpan}` : undefined,
    }"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
  >
    <div v-if="icon" class="card-icon">
      <component v-if="typeof icon !== 'string'" :is="icon" class="card-icon-svg" />
      <span v-else>{{ icon }}</span>
    </div>
    <div class="card-body">
      <span v-if="label" class="card-label">{{ label }}</span>
      <span v-if="value" class="card-value" :style="fontSize ? { fontSize } : {}">{{ value }}</span>
      <span v-if="subValue" class="card-sub">{{ subValue }}</span>
    </div>
    <div v-if="link" class="card-arrow">↗</div>
  </a>
</template>

<style scoped>
.info-card {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.8rem 1.1rem;
  border-radius: 16px;
  border: 1px solid rgba(192, 132, 252, 0.15);
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  text-decoration: none;
  cursor: default;
  position: relative;
  overflow: hidden;

  opacity: 0;
  transform: translateY(12px);
  animation: cardIn 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;

  transition: border-color 0.3s ease,
  background 0.3s ease,
  transform 0.3s cubic-bezier(0.25, 1, 0.5, 1),
  box-shadow 0.3s ease;
}

.info-card[href] {
  cursor: pointer;
}

.info-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(192, 132, 252, 0.06), rgba(244, 114, 182, 0.06));
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: inherit;
}

.info-card.hovered {
  border-color: rgba(192, 132, 252, 0.4);
  background: rgba(255, 255, 255, 0.07);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(192, 132, 252, 0.12);
}

.info-card.hovered::before {
  opacity: 1;
}

.card-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(192, 132, 252, 0.1);
  border: 1px solid rgba(192, 132, 252, 0.2);
  transition: background 0.3s ease, border-color 0.3s ease;
}

.card-icon-svg {
  width: 1.1rem;
  height: 1.1rem;
}

.info-card.hovered .card-icon {
  background: rgba(192, 132, 252, 0.18);
  border-color: rgba(192, 132, 252, 0.4);
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  flex: 1;
  min-width: 0;
}

.card-label {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(192, 132, 252, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: #f1f1f1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-sub {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.4);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-arrow {
  font-size: 0.85rem;
  color: rgba(192, 132, 252, 0.5);
  flex-shrink: 0;
  transition: color 0.3s ease, transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.info-card.hovered .card-arrow {
  color: rgba(192, 132, 252, 0.9);
  transform: translate(2px, -2px);
}

.info-card.tall {
  min-height: 100px;
  align-items: flex-start;
  padding: 1.1rem 1.2rem;
}

.info-card.tall .card-body {
  gap: 0.3rem;
}

.info-card.tall .card-value {
  font-size: 1.15rem;
}

@keyframes cardIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>