<script setup lang="ts">
import { ref } from 'vue'
import { useRevealOnScroll } from '@/shared/composables/useRevealOnScroll'

defineProps<{ text: string }>()

const titleEl = ref<HTMLElement | null>(null)
const { isVisible } = useRevealOnScroll(titleEl, 0.2)
</script>

<template>
  <h2 ref="titleEl" class="sec-title">
    <span class="sec-hl" :class="{ 'hl-vis': isVisible }">{{ text }}</span>
  </h2>
</template>
