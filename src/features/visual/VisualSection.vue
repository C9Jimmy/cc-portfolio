<script setup lang="ts">
import GhostNumber from '@/shared/components/ui/GhostNumber.vue'
import SectionTitle from '@/shared/components/ui/SectionTitle.vue'
import VisualCarousel from './VisualCarousel.vue'
</script>

<template>
  <section class="section" id="visual">
    <GhostNumber number="06" />
    <div class="col">
      <SectionTitle text="Visual" />
      <VisualCarousel />
    </div>
  </section>
</template>
