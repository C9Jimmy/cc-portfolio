<script setup lang="ts">
import GhostNumber from '@/shared/components/ui/GhostNumber.vue'
import SectionTitle from '@/shared/components/ui/SectionTitle.vue'
import ProjectRow from './ProjectRow.vue'
import { projects, profile } from '@/shared/data/resume'
</script>

<template>
  <section class="section" id="projects">
    <GhostNumber number="04" />
    <div class="col">
      <SectionTitle text="Projects" />
      <div class="wk-list">
        <ProjectRow v-for="item in projects" :key="item.idx" :item="item" />
        <a :href="`mailto:${profile.email}`" class="wk-line wk-more">
          <span class="wk-idx">+</span>
          <div class="wk-body">
            <div class="wk-title wk-more-title">更多作品洽詢</div>
          </div>
          <span class="wk-arr"><i class="fa-solid fa-arrow-right"></i></span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wk-more-title { color: var(--gray2); }
</style>
