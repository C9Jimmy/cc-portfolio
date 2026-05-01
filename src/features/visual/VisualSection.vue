<script setup lang="ts">
import GhostNumber from '@/shared/components/ui/GhostNumber.vue'
import SectionTitle from '@/shared/components/ui/SectionTitle.vue'
import VisualCarousel from './VisualCarousel.vue'
</script>

<template>
  <section class="section" id="projects">
    <GhostNumber number="05" />
    <div class="col visual-col">
      <SectionTitle text="Projects" />
      <VisualCarousel />
    </div>
  </section>
</template>

<style scoped>
.visual-col {
  width: min(820px, 100%);
}
</style>
