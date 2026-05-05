<script setup lang="ts">
import { ref } from 'vue'
import GhostNumber from '@/shared/components/ui/GhostNumber.vue'
import { useHeroParallax } from './useHeroParallax'
import { profile } from '@/shared/data/resume'

const heroEl = ref<HTMLElement | null>(null)
const { transforms } = useHeroParallax(heroEl)
const base = import.meta.env.BASE_URL

const iconSrc = `${base}images/cc-icon-b.svg`

const floaters = [
  { cls: 'f1',  src: iconSrc, size: 62 },
  { cls: 'f2',  svg: `<svg width="72" height="72" viewBox="0 0 72 72" fill="none"><path d="M36,2 L39,30 L70,36 L39,42 L36,70 L33,42 L2,36 L33,30 Z" stroke="#1a1a1a" stroke-width="1.3" stroke-linejoin="round"/></svg>` },
  { cls: 'f3',  svg: `<svg width="82" height="82" viewBox="0 0 82 82" fill="none"><path d="M41,3 L44,35 L74,22 L47,41 L74,60 L44,47 L41,79 L38,47 L8,60 L35,41 L8,22 L38,35 Z" stroke="#1a1a1a" stroke-width="1.3" stroke-linejoin="round"/></svg>` },
  { cls: 'f4',  src: iconSrc, size: 34 },
  { cls: 'f5',  svg: `<svg width="46" height="46" viewBox="0 0 46 46" fill="none"><path d="M23,2 L25,20 L44,23 L25,26 L23,44 L21,26 L2,23 L21,20 Z" stroke="#1a1a1a" stroke-width="1.2" stroke-linejoin="round"/></svg>` },
  { cls: 'f6',  svg: `<svg width="98" height="98" viewBox="0 0 98 98" fill="none"><path d="M49,3 L53,37 L86,26 L57,49 L86,72 L53,61 L49,95 L45,61 L12,72 L41,49 L12,26 L45,37 Z" stroke="#1a1a1a" stroke-width="1.3" stroke-linejoin="round"/></svg>` },
  { cls: 'f7',  src: iconSrc, size: 54 },
  { cls: 'f8',  svg: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20,1 L22,17 L39,20 L22,23 L20,39 L18,23 L1,20 L18,17 Z" stroke="#1a1a1a" stroke-width="1.2" stroke-linejoin="round"/></svg>` },
  { cls: 'f9',  src: iconSrc, size: 28 },
  { cls: 'f10', svg: `<svg width="52" height="52" viewBox="0 0 52 52" fill="none"><path d="M26,2 L28,21 L48,26 L28,31 L26,50 L24,31 L4,26 L24,21 Z" stroke="#1a1a1a" stroke-width="1.3" stroke-linejoin="round"/></svg>` },
  { cls: 'f11', svg: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none"><path d="M18,2 L20,14 L30,8 L22,16 L34,18 L22,20 L30,28 L20,22 L18,34 L16,22 L6,28 L14,20 L2,18 L14,16 L6,8 L16,14 Z" stroke="#1a1a1a" stroke-width="1.2" stroke-linejoin="round"/></svg>` },
  { cls: 'f12', svg: `<svg width="44" height="44" viewBox="0 0 44 44" fill="none"><path d="M22,2 L24,18 L42,22 L24,26 L22,42 L20,26 L2,22 L20,18 Z" stroke="#1a1a1a" stroke-width="1.2" stroke-linejoin="round"/></svg>` },
]
</script>

<template>
  <section ref="heroEl" class="section" id="hero">
    <div
      v-for="(f, i) in floaters"
      :key="f.cls"
      class="floater"
      :class="f.cls"
      aria-hidden="true"
    >
      <div :style="{ transform: transforms[i] }">
        <img v-if="f.src" :src="f.src" :width="f.size" :height="f.size" alt="" />
        <span v-else v-html="f.svg" />
      </div>
    </div>

    <GhostNumber number="01" />

    <!-- pigeon seal — top right, links to email -->
    <a :href="`mailto:${profile.email}`" class="pigeon-seal" aria-label="Send an email">
      <svg viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
        <defs>
          <path id="heroSealPath" d="M180 180 m-86 0 a86 86 0 1 1 172 0 a86 86 0 1 1 -172 0"/>
        </defs>
        <g class="seal-ring">
          <text style="font-family:'Helvetica Neue','PingFang TC',sans-serif;font-size:9.8px;font-weight:700;letter-spacing:1.1px;fill:#111111;">
            <textPath href="#heroSealPath" startOffset="0%" textLength="540" lengthAdjust="spacing">SEND A PIGEON  •  OR SEND AN EMAIL  •  SEND A PIGEON  •  OR SEND AN EMAIL  •  </textPath>
          </text>
        </g>
        <image :href="`${base}images/260422-pigeon-mail.svg`" x="108" y="108" width="144" height="144"/>
      </svg>
    </a>

    <div class="col">
      <div class="hero-kicker">PORTFOLIO · 2026</div>
      <div class="hero-type">
        <span class="hero-row"><span class="hero-inner hero-hl">{{ profile.nameEn.split(' ')[0] }}</span></span>
        <span class="hero-row"><span class="hero-inner hero-accent">{{ profile.nameEn.split(' ')[1] }}</span></span>
      </div>
      <div class="hero-sub">
        <span class="hero-name">{{ profile.name }}</span>
        <span class="hero-divider">|</span>
        <span>{{ profile.titles[0] }} · {{ profile.titles[2] }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.floater {
  position: absolute;
  pointer-events: none;
  opacity: 0.22;
}

.floater > div {
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}

.f1  { top: 14%; right: 9%;  animation: drift1 6s  ease-in-out infinite alternate; }
.f2  { top: 58%; left: 5%;   animation: drift2 8s  ease-in-out infinite alternate; }
.f3  { top: 80%; left: 58%;  animation: drift3 5s  ease-in-out infinite alternate; }
.f4  { top: 22%; left: 10%;  animation: drift2 10s ease-in-out infinite alternate-reverse; }
.f5  { top:  6%; left: 40%;  animation: drift4 7s  ease-in-out infinite alternate; }
.f6  { top: 36%; right: 2%;  animation: drift1 9s  ease-in-out infinite alternate-reverse; }
.f7  { top: 76%; left: 32%;  animation: drift5 7s  ease-in-out infinite alternate; }
.f8  { top: 88%; right: 6%;  animation: drift3 5s  ease-in-out infinite alternate-reverse; }
.f9  { top: 44%; left: 22%;  animation: drift4 6s  ease-in-out infinite alternate; }
.f10 { top: 30%; right: 22%; animation: drift5 8s  ease-in-out infinite alternate-reverse; }
.f11 { top: 84%; left: 8%;   animation: drift1 7s  ease-in-out infinite alternate; }
.f12 { top: 12%; right: 26%; animation: drift2 9s  ease-in-out infinite alternate-reverse; }

@keyframes drift1 { from { transform: translate(0,0) rotate(0deg); }   to { transform: translate(14px,-20px) rotate(18deg); } }
@keyframes drift2 { from { transform: translate(0,0) rotate(0deg); }   to { transform: translate(16px,12px) rotate(-12deg); } }
@keyframes drift3 { from { transform: translate(0,0) rotate(0deg); }   to { transform: translate(-12px,-16px) rotate(9deg); } }
@keyframes drift4 { from { transform: translate(0,0) rotate(0deg); }   to { transform: translate(20px,8px) rotate(-20deg); } }
@keyframes drift5 { from { transform: translate(0,0) rotate(0deg); }   to { transform: translate(-8px,18px) rotate(14deg); } }

/* pigeon seal */
.pigeon-seal {
  position: absolute;
  top: 80px;
  right: 60px;
  width: 250px;
  height: 250px;
  display: block;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 10;
}

.pigeon-seal:hover { transform: scale(1.08); }
.pigeon-seal svg { width: 100%; height: 100%; }

.seal-ring {
  transform-origin: 180px 180px;
  animation: sealSpin 24s linear infinite;
}

.pigeon-seal:hover .seal-ring { animation-duration: 5s; }

@keyframes sealSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.hero-kicker {
  font-size: 11px;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--gray);
  margin-bottom: 40px;
}

.hero-type {
  display: block;
  font-size: var(--hero-size);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -5px;
  margin-bottom: 20px;
}

.hero-row { display: block; overflow: hidden; }

.hero-inner {
  display: inline-block;
  transform: translateY(115%);
  animation: slideUp 0.72s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.hero-row:last-child { padding-bottom: 20px; }

.hero-row:nth-child(1) .hero-inner { animation-delay: 0.08s; }
.hero-row:nth-child(2) .hero-inner { animation-delay: 0.22s; }

@keyframes slideUp { to { transform: translateY(0); } }

.hero-hl {
  position: relative;
  display: inline-block;
}
.hero-hl::after {
  content: '';
  position: absolute;
  left: 0; bottom: 10px;
  height: var(--hero-hl-h);
  width: 0;
  background: var(--yellow);
  z-index: -1;
  animation: hlGrow 0.75s 1.05s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.hero-accent {
  -webkit-text-stroke: 2px var(--black);
  color: transparent;
}

.hero-sub {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 14px;
  color: #444;
}

.hero-name { font-weight: 600; }
.hero-divider { color: #ddd; }

@media (max-width: 767px) {
  .pigeon-seal { display: none; }

  /* scale all floaters down and hide the noisiest ones */
  .floater { transform: scale(0.55); transform-origin: center center; }
  .f2, .f3, .f6, .f7, .f11 { display: none; }
}
</style>
