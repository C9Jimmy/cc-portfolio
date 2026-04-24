<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import SiteNav from '@/shared/components/layout/SiteNav.vue'
import SiteFooter from '@/shared/components/layout/SiteFooter.vue'
import PageProgress from '@/shared/components/layout/PageProgress.vue'
import HeroSection from '@/features/hero/HeroSection.vue'
import AboutSection from '@/features/about/AboutSection.vue'
import ExpSection from '@/features/exp/ExpSection.vue'
import ProjectsSection from '@/features/projects/ProjectsSection.vue'
import SkillsSection from '@/features/skills/SkillsSection.vue'
import VisualSection from '@/features/visual/VisualSection.vue'
import ContactSection from '@/features/contact/ContactSection.vue'

type Cleanup = () => void
const cleanups: Cleanup[] = []

onMounted(() => {
  document.querySelectorAll<HTMLElement>('.section').forEach(section => {
    const ghost = section.querySelector<HTMLElement>('.ghost')
    if (!ghost) return

    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect()
      const mx = (e.clientX - r.left - r.width  / 2) / r.width
      const my = (e.clientY - r.top  - r.height / 2) / r.height
      ghost.style.transition = 'transform 0.12s ease-out'
      ghost.style.transform = `perspective(900px) rotateX(${-my * 12}deg) rotateY(${mx * 18}deg)`
    }

    const onLeave = () => {
      ghost.style.transition = 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
      ghost.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
    }

    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)
    cleanups.push(() => {
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
    })
  })
})

onUnmounted(() => { cleanups.forEach(fn => fn()) })
</script>

<template>
  <SiteNav />
  <PageProgress />
  <main>
    <HeroSection />
    <AboutSection />
    <ExpSection />
    <ProjectsSection />
    <SkillsSection />
    <VisualSection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
