import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { checkoutHref } from '../config'

// Pile de cartes : on fait glisser la carte du dessus pour l'envoyer sous la pile.
export default function ReviewStack({ reviews }) {
  const [order, setOrder] = useState(() => reviews.map((_, i) => i))
  const next = () => setOrder((o) => [...o.slice(1), o[0]])
  const prev = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)])
  const visible = order.slice(0, 4)

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[430px] w-full max-w-[340px] sm:max-w-[380px]">
        <AnimatePresence initial={false}>
          {visible.map((idx, depth) => (
            <Card
              key={idx}
              review={reviews[idx]}
              depth={depth}
              side={idx % 2 ? 1 : -1}
              onSwipe={next}
            />
          )).reverse()}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button onClick={prev} aria-label="Avis précédent" className="flex h-12 w-12 items-center justify-center rounded-full border border-forest/15 bg-cream text-xl transition hover:bg-forest hover:text-cream">←</button>
        <span className="font-display text-sm">{order[0] + 1} / {reviews.length}</span>
        <button onClick={next} aria-label="Avis suivant" className="flex h-12 w-12 items-center justify-center rounded-full border border-forest/15 bg-cream text-xl transition hover:bg-forest hover:text-cream">→</button>
      </div>
      <p className="mt-3 text-sm text-forest/60">Fais glisser la carte pour voir l’avis suivant</p>
    </div>
  )
}

function Card({ review, depth, side, onSwipe }) {
  const top = depth === 0
  return (
    <motion.div
      className="absolute inset-x-0 top-0 touch-pan-y"
      style={{ zIndex: 10 - depth }}
      initial={{ scale: 0.85, opacity: 0, y: 40 }}
      animate={{
        scale: 1 - depth * 0.06,
        y: depth * 18,
        x: depth * side * 22,
        rotate: depth * side * 4,
        opacity: depth > 2 ? 0 : 1,
      }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      drag={top ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      whileDrag={{ scale: 1.03, cursor: 'grabbing' }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 500) onSwipe()
      }}
    >
      <ReviewCard review={review} interactive={top} />
    </motion.div>
  )
}

function ReviewCard({ review, interactive }) {
  return (
    <article className="relative cursor-grab select-none overflow-hidden rounded-[2.5rem] p-2.5 shadow-[0_30px_60px_-20px_rgba(51,82,48,.35)]">
      {/* fond dégradé flou, comme le modèle */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#ff8b20_0%,#f6b26b_25%,#e7a3a8_50%,#b9c7dc_80%)]" />
      <div className="relative pt-20">
        <div className="absolute left-5 top-6 z-10 flex h-24 w-24 items-end justify-center overflow-hidden rounded-full border-4 border-cream bg-[#e8e6fb] shadow-lg" aria-hidden>
          <svg viewBox="0 0 24 24" className="h-20 w-20 translate-y-2 fill-sage">
            <circle cx="12" cy="8" r="4.5" />
            <path d="M3 22c0-5 4-8.5 9-8.5s9 3.5 9 8.5z" />
          </svg>
        </div>
        <div className="rounded-[2rem] bg-white px-5 pb-5 pt-4">
          <div className="pl-[6.5rem]">
            <h3 className="truncate font-display text-lg font-semibold">{review.name}</h3>
            <div className="mt-1.5 flex flex-wrap gap-1.5 text-[11px]">
              <span className="rounded-full bg-[#e8e6fb] px-2.5 py-0.5">{review.city}</span>
              <span className="rounded-full bg-[#f7ecd0] px-2.5 py-0.5">A cuisiné : {review.dish}</span>
            </div>
          </div>
          <div className="mt-5 text-flame" aria-label="5 étoiles">★★★★★</div>
          <p className="mt-2 min-h-[96px] text-[15px] leading-relaxed text-forest/75">« {review.text} »</p>
          <div className="mt-4 flex items-center gap-2">
            <a
              href={checkoutHref()} data-cta tabIndex={interactive ? 0 : -1}
              onPointerDown={(e) => e.stopPropagation()}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#2a2a2a] to-black py-3.5 font-display text-sm font-semibold text-white shadow-lg transition active:scale-95"
            >
              <span className="text-lg leading-none">+</span> Moi aussi
            </a>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-lg">💬</span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-lg">❤</span>
          </div>
        </div>
      </div>
    </article>
  )
}
