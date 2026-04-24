<script setup lang="ts">
import { useCarousel } from './useCarousel'

const cards = [
  { idx: 0, type: 'APP', name: 'Awesome Font',  year: 'App Store', icon: 'fa-globe',                   bg: 'bg-2', url: 'https://apps.apple.com/us/app/awesome-font-font-preview/id1327481616', desc: 'Font 預覽 iOS App', tags: ['APP', 'Side Projects'] },
  { idx: 1, type: 'APP', name: '友善 i 臺中',    year: '截圖展示',  icon: 'fa-print',                    bg: 'bg-3', url: '', desc: '無障礙環境查詢 App', tags: ['APP', 'Side Projects'] },
  { idx: 2, type: 'SEO', name: '魔女柑仔店',     year: '截圖展示',  icon: 'fa-palette',                  bg: 'bg-4', url: 'https://www.witch-store.com/', desc: '電商 SEO 優化', tags: ['SEO', 'Side Projects'] },
  { idx: 3, type: 'APP', name: '計算機',         year: '截圖展示',  icon: 'fa-newspaper',                bg: 'bg-1', url: '', desc: '自製 iOS 計算機 App', tags: ['APP', 'Side Projects'] },
  { idx: 4, type: 'APP', name: 'OAXB',           year: 'App Store', icon: 'fa-magnifying-glass-chart',  bg: 'bg-5', url: '', desc: '截圖展示', tags: ['APP', 'Side Projects'] },
]

const { flippedIdx, positionFor, next, prev, goTo, clickCard, dots } = useCarousel()
</script>

<template>
  <div class="carousel-wrap">
    <div class="carousel-stage">
      <div
        v-for="card in cards"
        :key="card.idx"
        class="c-card"
        :class="[positionFor(card.idx), { flipped: flippedIdx === card.idx }]"
        :data-idx="card.idx"
        @click="clickCard(card.idx)"
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
            <div class="c-back-hint">再點一下關閉</div>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-controls">
      <button class="cc-btn" @click="prev" aria-label="上一張">
        <i class="fa-solid fa-arrow-left fa-xs"></i>
      </button>
      <div class="cc-dots">
        <button
          v-for="dot in dots"
          :key="dot.idx"
          class="cc-dot"
          :class="{ active: dot.active }"
          @click="goTo(dot.idx)"
          :aria-label="`第 ${dot.idx + 1} 張`"
        ></button>
      </div>
      <button class="cc-btn" @click="next" aria-label="下一張">
        <i class="fa-solid fa-arrow-right fa-xs"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.carousel-wrap { width: 100%; }

.carousel-stage {
  position: relative;
  height: 380px;
  perspective: 1200px;
  margin-bottom: 32px;
}

.c-card {
  position: absolute;
  width: 240px; height: 320px;
  top: 50%; left: 50%;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s;
  cursor: pointer;
}

/* Carousel positions */
.pos-center { transform: translate(-50%, -50%) translateX(0) scale(1) rotateY(0deg); z-index: 5; }
.pos-right1 { transform: translate(-50%, -50%) translateX(280px) scale(0.84) rotateY(-18deg); z-index: 4; opacity: 0.8; }
.pos-right2 { transform: translate(-50%, -50%) translateX(490px) scale(0.7) rotateY(-28deg); z-index: 3; opacity: 0.5; }
.pos-left1  { transform: translate(-50%, -50%) translateX(-280px) scale(0.84) rotateY(18deg); z-index: 4; opacity: 0.8; }
.pos-left2  { transform: translate(-50%, -50%) translateX(-490px) scale(0.7) rotateY(28deg); z-index: 3; opacity: 0.5; }
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
.bg-1 { background: #1a1a1a; }
.bg-2 { background: #16191f; }
.bg-3 { background: #1c1924; }
.bg-4 { background: #151d22; }
.bg-5 { background: #1a1526; }

.c-back {
  background: #fff;
  color: var(--black);
  transform: rotateY(180deg);
}

.c-deco { font-size: 32px; color: var(--yellow); }
.c-type { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 4px; }
.c-name { font-size: 20px; font-weight: 700; color: #fff; }
.c-year { font-size: 11px; color: rgba(255,255,255,0.4); margin-top: 4px; }

.c-back-type { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--gray2); margin-bottom: 8px; }
.c-back-title { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
.c-back-desc { font-size: 12px; color: var(--gray); line-height: 1.6; margin-bottom: 12px; word-break: break-all; }
.c-back-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 12px; }
.c-back-tag { font-size: 10px; background: #f3f3f3; padding: 2px 8px; border-radius: 100px; }
.c-back-link { font-size: 12px; color: var(--black); border-bottom: 1px solid var(--yellow); display: inline-block; margin-bottom: 12px; }
.c-back-hint { font-size: 10px; color: var(--gray2); margin-top: auto; }

.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
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

.cc-dots { display: flex; gap: 6px; }

.cc-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--border);
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  padding: 0;
}
.cc-dot.active { background: var(--black); transform: scale(1.3); }
</style>
