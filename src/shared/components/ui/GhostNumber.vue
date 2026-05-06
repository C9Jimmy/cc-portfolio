<script setup lang="ts">
defineProps<{ number: string; light?: boolean }>()
</script>

<template>
  <div class="ghost" :class="{ 'ghost--light': light }" aria-hidden="true">{{ number }}</div>
</template>

<style scoped>
.ghost--light { color: var(--yellow); opacity: 0.06; }
</style>
