<script setup lang="ts">
import GhostNumber from '@/shared/components/ui/GhostNumber.vue'
import SectionTitle from '@/shared/components/ui/SectionTitle.vue'
import ExpRow from './ExpRow.vue'
import { experiences } from '@/shared/data/resume'
</script>

<template>
  <section class="section" id="exp">
    <GhostNumber number="03" />
    <div class="col">
      <SectionTitle text="Experience" />
      <div class="exp-list">
        <ExpRow v-for="item in experiences" :key="item.company" :item="item" />
      </div>
    </div>
  </section>
</template>
