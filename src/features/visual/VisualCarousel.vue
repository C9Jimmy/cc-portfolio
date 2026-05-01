<script setup lang="ts">
import { projectCards } from '@/shared/data/resume'
import { useCarousel } from './useCarousel'

const cards = projectCards
const { flippedIdx, positionFor, next, prev, clickCard } = useCarousel(cards.length)
</script>

<template>
  <div class="carousel-wrap">
    <div class="carousel-stage">
      <div
        v-for="(card, cardIndex) in cards"
        :key="`${card.name}-${card.url ?? card.year}`"
        class="c-card"
        :class="[positionFor(cardIndex), { flipped: flippedIdx === cardIndex }]"
        :data-idx="cardIndex"
        @click="clickCard(cardIndex)"
      >
        <div class="c-card-inner">
          <div class="c-face c-front" :class="card.bg">
            <div class="c-deco"><i :class="`fa-solid ${card.icon}`"></i></div>
            <div>
              <div class="c-type">{{ card.type }}</div>
              <div class="c-name">{{ card.name }}</div>
              <div class="c-year">{{ card.year }}</div>
            </div>
          </div>
          <div class="c-face c-back">
            <div class="c-back-type">{{ card.type }}</div>
            <div class="c-back-title">{{ card.name }}</div>
            <div class="c-back-desc">{{ card.desc }}</div>
            <div class="c-back-tags">
              <span v-for="t in card.tags" :key="t" class="c-back-tag">{{ t }}</span>
            </div>
            <a v-if="card.url" :href="card.url" target="_blank" rel="noopener noreferrer" class="c-back-link" @click.stop>
              查看連結 <i class="fa-solid fa-arrow-up-right-from-square fa-xs"></i>
            </a>
            <div class="c-back-hint">close</div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-controls">
      <button class="cc-btn" @click="prev" aria-label="上一張">
        <i class="fa-solid fa-arrow-left fa-xs"></i>
      </button>
      <button class="cc-btn" @click="next" aria-label="下一張">
        <i class="fa-solid fa-arrow-right fa-xs"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.carousel-wrap { width: 100%; overflow-x: clip; }

.carousel-stage {
  position: relative;
  height: 440px;
  perspective: 1400px;
  margin-bottom: 40px;
}

.c-card {
  position: absolute;
  width: 280px; height: 380px;
  top: 50%; left: 50%;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s;
  cursor: pointer;
}

/* Carousel positions */
.pos-center { transform: translate(-50%, -50%) translateX(0) scale(1) rotateY(0deg); z-index: 5; }
.pos-right1 { transform: translate(-50%, -50%) translateX(280px) scale(0.84) rotateY(-18deg); z-index: 4; opacity: 0.8; }
.pos-left1  { transform: translate(-50%, -50%) translateX(-280px) scale(0.84) rotateY(18deg); z-index: 4; opacity: 0.8; }
.pos-right2 { transform: translate(-50%, -50%) translateX(280px) scale(0.62) rotateY(-28deg); opacity: 0; pointer-events: none; z-index: 0; }
.pos-left2  { transform: translate(-50%, -50%) translateX(-280px) scale(0.62) rotateY(28deg); opacity: 0; pointer-events: none; z-index: 0; }
.pos-hidden { transform: translate(-50%, -50%) translateX(0) scale(0.5); opacity: 0; pointer-events: none; z-index: 0; }

.c-card.flipped .c-card-inner { transform: rotateY(180deg); }

.c-card-inner {
  width: 100%; height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.c-face {
  position: absolute; inset: 0;
  backface-visibility: hidden;
  border-radius: 16px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.c-front { background: var(--black); color: #fff; }
.bg-1 { background: linear-gradient(145deg, #FFF176 0%, #FFD600 48%, #F59E0B 100%); }
.bg-2 { background: linear-gradient(145deg, #FFE082 0%, #FFC107 48%, #FF8F00 100%); }
.bg-3 { background: linear-gradient(145deg, #FFF9C4 0%, #FDD835 48%, #F9A825 100%); }
.bg-4 { background: linear-gradient(145deg, #FDE68A 0%, #FACC15 48%, #D97706 100%); }
.bg-5 { background: linear-gradient(145deg, #FEF3C7 0%, #FBBF24 48%, #F97316 100%); }
.bg-6 { background: linear-gradient(145deg, #ECFCCB 0%, #D9F99D 38%, #EAB308 100%); }
.bg-7 { background: linear-gradient(145deg, #FFECB3 0%, #FFD54F 48%, #FB8C00 100%); }
.bg-8 { background: linear-gradient(145deg, #FFF7AD 0%, #FFE14D 48%, #D6A400 100%); }
.bg-9 { background: linear-gradient(145deg, #F7F37A 0%, #E6C229 48%, #B7791F 100%); }
.bg-10 { background: linear-gradient(145deg, #FFF3B0 0%, #FFD166 48%, #E09F3E 100%); }

.c-back {
  background: #fff;
  color: var(--black);
  transform: rotateY(180deg);
  border: 1px solid var(--border);
}

.c-deco { font-size: 32px; color: var(--yellow); }
.c-type { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.72); margin-bottom: 4px; }
.c-name { font-size: 20px; font-weight: 700; color: #fff; }
.c-year { font-size: 11px; color: rgba(255,255,255,0.72); margin-top: 4px; }

.c-back-type { font-size: 13px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; color: var(--gray2); margin-bottom: 18px; }
.c-back-title { font-size: 21px; font-weight: 800; margin-bottom: 18px; }
.c-back-desc { font-size: 14px; color: var(--gray); line-height: 1.8; margin-bottom: auto; word-break: normal; }
.c-back-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px; margin-bottom: 14px; }
.c-back-tag { font-size: 12px; color: var(--gray); border: 1px solid var(--border); background: var(--white); padding: 4px 10px; border-radius: 100px; }
.c-back-link { align-self: flex-start; font-size: 14px; font-weight: 800; color: var(--black); border-bottom: 2px solid var(--yellow); display: inline-block; margin-bottom: 18px; }
.c-back-hint { font-size: 12px; color: var(--gray2); text-align: center; }
.c-back-hint::before {
  content: 'x';
  margin-right: 4px;
  font-weight: 700;
}

.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 120px;
  margin: 0 auto;
}

.cc-btn {
  width: 36px; height: 36px;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: none;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, border-color 0.2s;
}
.cc-btn:hover { background: var(--yellow); border-color: var(--yellow); }
</style>
