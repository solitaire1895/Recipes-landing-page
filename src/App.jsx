import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import { CONFIG, checkoutHref } from './config'
import ReviewStack from './components/ReviewStack'
import { REVIEWS, reviewsReady } from './reviews'
import { RevealText, FadeUp, BuyButton, Todo } from './components/Motion'

const m = (n) => `/media/${n}.webp`

const CHAPTERS = [
  { name: 'Entrées', img: 'salade-2', count: '9 recettes', items: ['Salade d’Avocat', 'Macédoine de Légumes', 'Avocat Ananas au Poivre de Penja'] },
  { name: 'Plats', img: 'main-course-1', count: '70+ recettes', items: ['N’Dolé aux Crevettes', 'Eru', 'Poulet DG', 'Ekwang', 'Mbongo Tchobi'] },
  { name: 'Compléments', img: 'main-course-5', count: '25 recettes', items: ['Miondos', 'Water Fufu', 'Plantains Frits aux Épices'] },
  { name: 'Pâtisseries', img: 'dessert', count: '38 recettes', items: ['Beignets Soufflés', 'Bonbons Coconut', 'Gâteau au Yaourt'] },
  { name: 'Jus & Boissons', img: 'jus-2', count: '19 recettes', items: ['Foléré – Jus de bissap', 'Jus de Gingembre', 'Lait de Coco'] },
  { name: 'Épices & Astuces', img: 'salade-6', count: '26 épices', items: ['Djansang', 'Pèbè', 'Rondelles', 'Corriger l’excès de sel'] },
]

const MARQUEE = ['N’Dolé', 'Eru', 'Poulet DG', 'Koki', 'Okok', 'Mbongo Tchobi', 'Ekwang', 'Kondre', 'Pepper Soup', 'Beignets', 'Foléré', 'Kwacoco']

const BENEFITS = [
  { t: 'Les vrais goûts du pays', d: 'Les recettes camerounaises comme à la maison, sans approximation — du Ndolé au Kondre.', icon: '🌶️' },
  { t: 'Pas à pas, sans stress', d: 'Ingrédients listés, étapes numérotées : même si tu débutes, tu réussis du premier coup.', icon: '📖' },
  { t: 'Du matin au dessert', d: 'Entrées, plats, compléments, pâtisseries, jus : tout ton repas dans un seul livre.', icon: '🍽️' },
  { t: 'Sur ton téléphone', d: 'Un PDF de 284 pages, à garder dans ta poche et à ouvrir en cuisine, même hors ligne.', icon: '📱' },
]

const FAQ = [
  { q: 'Comment je reçois le livre ?', a: 'Juste après le paiement, tu reçois le lien de téléchargement du PDF par email (et sur la page de confirmation).' },
  { q: 'Je débute en cuisine, c’est pour moi ?', a: 'Oui. Chaque recette liste ses ingrédients et détaille les étapes simplement. Une section astuces t’aide aussi à rattraper les petites erreurs (trop de sel, piment…).' },
  { q: 'Je vis hors du Cameroun, je trouverai les ingrédients ?', a: 'Une grande partie des recettes utilise des ingrédients faciles à trouver. Le chapitre épices te présente chaque épice locale pour bien la reconnaître en marché africain.' },
  { q: 'Sur quel appareil puis-je le lire ?', a: 'Téléphone, tablette ou ordinateur : c’est un PDF classique. Tu peux aussi l’imprimer.' },
  { q: 'Quels moyens de paiement ?', a: '[À REMPLACER : moyens de paiement acceptés — Mobile Money, Orange Money, carte…]' },
]

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.1 })
    let id
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Chapters />
        <Benefits />
        <VideoBand />
        <Gallery />
        <Inside />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}

const LINKS = [['#chapitres', 'Chapitres'], ['#contenu', 'Contenu'], ['#prix', 'Prix'], ['#faq', 'FAQ']]

// Bright pulsing pill with the promo price, so it stands out over the hero video
function NavBuy() {
  // On click: colors flip like a switch, then we go to the checkout
  const [on, setOn] = useState(false)
  const href = checkoutHref()
  const click = (e) => {
    e.preventDefault()
    setOn(true)
    setTimeout(() => { window.location.href = href }, 350)
  }
  return (
    <motion.a
      href={href} data-cta onClick={click}
      whileTap={{ scale: 0.88 }}
      animate={{ backgroundColor: on ? '#fffae5' : '#ff8b20', color: on ? '#335230' : '#fffae5' }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="relative inline-flex items-center gap-1.5 rounded-full py-1 pl-2.5 pr-1 font-display text-[9px] font-bold uppercase shadow-[0_0_0_2px_rgba(255,250,229,.35)] sm:gap-2 sm:py-2.5 sm:pl-4 sm:pr-2.5 sm:text-xs"
    >
      {!on && <span className="absolute inset-0 animate-ping rounded-full bg-flame opacity-40 [animation-duration:2s]" />}
      <span className="relative">Acheter</span>
      <motion.span
        animate={{ backgroundColor: on ? '#ff8b20' : '#fffae5', color: on ? '#fffae5' : '#335230', rotate: on ? 360 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        className="relative flex items-center gap-1 rounded-full px-1.5 py-0.5 sm:px-2.5 sm:py-1"
      >
        {on ? '✓' : CONFIG.price}
        {!on && <motion.span animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}>→</motion.span>}
      </motion.span>
    </motion.a>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <motion.header
      initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled ? 'bg-forest/95 backdrop-blur' : ''}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
        <a href="#top" className="font-display text-lg font-extrabold text-cream">
          Yummy<span className="text-flame">.</span>Chefs
        </a>
        <nav className="hidden gap-8 font-medium text-cream/80 md:flex">
          {LINKS.map(([href, label]) => <a key={href} href={href} className="hover:text-flame">{label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <NavBuy />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu" aria-expanded={open}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full bg-cream/15 backdrop-blur md:hidden"
          >
            <motion.span animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }} className="h-0.5 w-5 rounded bg-cream" />
            <motion.span animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }} className="h-0.5 w-5 rounded bg-cream" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 -z-10 flex h-[100svh] flex-col justify-center gap-6 bg-forest px-6 md:hidden"
          >
            {LINKS.map(([href, label], i) => (
              <motion.a
                key={href} href={href} onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.07 }}
                className="font-display text-4xl font-bold text-cream"
              >
                {label}
              </motion.a>
            ))}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-6">
              <BuyButton className="w-full">Acheter · {CONFIG.price}</BuyButton>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden bg-forest">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <video className="h-full w-full object-cover" src="/media/v1.mp4" poster="/media/v1.jpg" autoPlay muted loop playsInline preload="metadata" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/50 to-forest/20" />
      <div className="relative mx-auto w-full max-w-7xl px-4 pl-[21px] pb-16 pt-32 sm:px-8 sm:pl-[37px] sm:pb-24">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="eyebrow mb-5">
          Ebook · {CONFIG.pages} pages · {CONFIG.recipes} recettes
        </motion.p>
        <RevealText
          as="h1"
          delay={0.4}
          text="Cuisine le Cameroun comme une vraie maman chef"
          className="max-w-5xl font-display text-[2.5rem] font-extrabold leading-[1.02] text-cream sm:text-7xl lg:text-8xl"
        />
        <FadeUp delay={1} className="mt-6 max-w-xl text-lg text-cream/85 sm:text-xl">
          Ndolé, Eru, Poulet DG, Koki, beignets, jus de foléré… Toutes les recettes du pays expliquées pas à pas, dans un seul livre à garder sur ton téléphone.
        </FadeUp>
        <FadeUp delay={1.2} className="mt-8 flex flex-wrap items-center gap-5">
          <BuyButton className="max-sm:gap-1.5 max-sm:px-5 max-sm:py-2.5 max-sm:text-[9.5px]">Je télécharge le livre</BuyButton>
          <span className="flex items-baseline gap-3 font-display font-bold text-cream">
            {CONFIG.oldPrice && <span className="text-lg text-cream/60 line-through">{CONFIG.oldPrice}</span>}
            <span className="text-2xl text-flame">{CONFIG.price}</span>
            {CONFIG.oldPrice && <span className="rounded-full bg-cream px-2.5 py-1 text-xs text-forest">-50%</span>}
          </span>
        </FadeUp>
      </div>
    </section>
  )
}

function Marquee() {
  const row = [...MARQUEE, ...MARQUEE]
  return (
    <div className="overflow-hidden border-y border-forest/10 bg-flame py-5">
      <div className="marquee flex w-max gap-10">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-xl font-bold uppercase text-cream sm:text-3xl">
            {w} <span className="text-forest">✺</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function About() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-8 md:grid-cols-2 md:py-32">
      <div>
        <p className="eyebrow mb-4">Le livre</p>
        <RevealText text="Fini les recettes approximatives et les plats ratés" className="h-section" />
        <FadeUp className="mt-6 space-y-4 text-lg text-forest/80">
          <p>Tu veux retrouver le goût du Ndolé de ta grand-mère, impressionner ta belle-famille avec un bon Poulet DG, ou simplement varier les repas de la semaine ?</p>
          <p><strong className="text-forest">Les délices de Yummy Chefs</strong> réunit plus de 160 recettes camerounaises, classées par chapitre, avec une couleur par type de plat pour trouver ce que tu cherches en un instant.</p>
        </FadeUp>
        <FadeUp className="mt-8"><BuyButton>Je le veux</BuyButton></FadeUp>
      </div>
      <div className="relative h-[420px] sm:h-[520px]">
        <FadeUp className="absolute left-0 top-0 w-[62%]" y={60}>
          <img src={m('main-course-3')} alt="Plat camerounais" loading="lazy" className="aspect-[3/4] w-full rounded-[2rem] object-cover shadow-2xl" />
        </FadeUp>
        <FadeUp className="absolute bottom-0 right-0 w-[55%]" y={100} delay={0.2}>
          <img src={m('dessert-3')} alt="Dessert" loading="lazy" className="aspect-square w-full rounded-[2rem] border-8 border-cream object-cover shadow-2xl" />
        </FadeUp>
        <motion.div
          animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          className="absolute right-[8%] top-[6%] flex h-28 w-28 items-center justify-center rounded-full bg-flame text-center font-display text-xs font-bold uppercase leading-tight text-cream"
        >
          {CONFIG.pages}<br />pages
        </motion.div>
      </div>
    </section>
  )
}

function Chapters() {
  return (
    <section id="chapitres" className="bg-forest py-24 text-cream md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4">Au menu</p>
            <RevealText text="6 chapitres pour tout ton repas" className="h-section max-w-2xl" />
          </div>
          <p className="max-w-sm text-cream/70">Chaque recette a la couleur de son chapitre : tu trouves ce que tu veux cuisiner en quelques secondes.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CHAPTERS.map((c, i) => (
            <FadeUp key={c.name} delay={(i % 3) * 0.1}>
              <article className="group relative h-[420px] overflow-hidden rounded-[2rem]">
                <img src={m(c.img)} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/30 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-cream px-4 py-1.5 text-sm font-semibold text-forest">{c.count}</span>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl font-bold">{c.name}</h3>
                  <p className="mt-2 text-cream/75">{c.items.join(' · ')}…</p>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Benefits() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8 md:py-32">
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <p className="eyebrow mb-4">Pourquoi ce livre</p>
        <RevealText text="Tout ce qu’il faut pour cuisiner avec confiance" className="h-section" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((b, i) => (
          <FadeUp key={b.t} delay={i * 0.1}>
            <div className="h-full rounded-[2rem] bg-butter p-8 transition-transform duration-500 hover:-translate-y-2">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-cream text-2xl">{b.icon}</div>
              <h3 className="font-display text-lg font-bold">{b.t}</h3>
              <p className="mt-3 text-forest/75">{b.d}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

function VideoBand() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const radius = useTransform(scrollYProgress, [0, 0.5], ['4rem', '0rem'])
  const width = useTransform(scrollYProgress, [0, 0.5], ['88%', '100%'])
  return (
    <section ref={ref} className="flex justify-center">
      <motion.div style={{ borderRadius: radius, width }} className="relative h-[70vh] overflow-hidden">
        <video className="h-full w-full object-cover" src="/media/v2.mp4" poster="/media/v2.jpg" autoPlay muted loop playsInline preload="none" />
        <div className="absolute inset-0 flex items-center justify-center bg-forest/45 p-6 text-center">
          <RevealText text="Le goût de chez nous, à chaque repas" className="max-w-4xl font-display text-3xl font-extrabold leading-tight text-cream sm:text-6xl" />
        </div>
      </motion.div>
    </section>
  )
}

function Inside() {
  const samples = ['Assok Bitetam', 'Poulet DG', 'N’Dolé aux Crevettes', 'Eru', 'Koki', 'Okok Sucré', 'Mbongo Tchobi', 'Riz Jollof façon Buea', 'Kondre de Porc', 'Sanga', 'Taro Sauce Jaune', 'Tenue Militaire', 'Beignets Koki', 'Bonbon Toffee', 'Kossam', 'Vin de Palme – Matango']
  return (
    <section id="contenu" className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 md:grid-cols-[1fr_1.2fr] md:py-32">
      <div className="md:sticky md:top-28 md:self-start">
        <p className="eyebrow mb-4">À l’intérieur</p>
        <RevealText text="Un aperçu des recettes" className="h-section" />
        <FadeUp className="mt-6 text-lg text-forest/80">
          Des grands classiques aux recettes de village qu’on ne trouve presque plus : voici une petite partie de ce qui t’attend.
        </FadeUp>
        <FadeUp className="mt-8 grid grid-cols-3 gap-4">
          {[[CONFIG.pages, 'pages'], [CONFIG.recipes, 'recettes'], ['26', 'épices']].map(([n, l]) => (
            <div key={l} className="rounded-2xl bg-butter p-4 text-center">
              <div className="font-display text-2xl font-extrabold text-flame">{n}</div>
              <div className="text-sm">{l}</div>
            </div>
          ))}
        </FadeUp>
      </div>
      <div>
        <ul className="divide-y divide-forest/15 border-y border-forest/15">
          {samples.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.05 }}
              className="group flex items-center justify-between py-4"
            >
              <span className="font-display text-lg font-semibold transition-all duration-300 group-hover:translate-x-2 group-hover:text-flame sm:text-xl">{s}</span>
              <span className="text-sm text-sage">✓ inclus</span>
            </motion.li>
          ))}
        </ul>
        <div className="mt-8 grid grid-cols-3 gap-3">
          {['jus-3', 'salade-4', 'main-course-6'].map((n) => (
            <img key={n} src={m(n)} alt="" loading="lazy" className="aspect-square w-full rounded-2xl object-cover" />
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  // Aucune preuve inventée : masqué en production tant que les avis ne sont pas réels.
  if (!reviewsReady && !import.meta.env.DEV) return null
  return (
    <section className="overflow-hidden bg-butter py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <p className="eyebrow mb-4 text-center">Ils cuisinent avec</p>
        <RevealText text="Ce qu’en disent les lecteurs" className="h-section mb-14 text-center" />
        {!reviewsReady && <p className="mb-8 text-center"><Todo>Avis à remplacer dans src/reviews.js</Todo></p>}
        <FadeUp><ReviewStack reviews={REVIEWS} /></FadeUp>
      </div>
    </section>
  )
}

function Pricing() {
  const list = [
    `Le livre complet en PDF — ${CONFIG.pages} pages`,
    'Entrées, plats, compléments, pâtisseries, jus',
    'Le guide des 26 épices camerounaises',
    'Les astuces pour rattraper un plat raté',
    'Téléchargement immédiat après paiement',
    'Lisible sur téléphone, tablette et ordinateur',
  ]
  return (
    <section id="prix" className="relative overflow-hidden py-24 md:py-32">
      <img src={m('hero')} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-forest/80" />
      <div className="relative mx-auto max-w-xl px-4">
        <FadeUp>
          <div className="rounded-[2.5rem] bg-cream p-8 text-center shadow-2xl sm:p-12">
            <p className="eyebrow mb-3">Offre</p>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{CONFIG.product}</h2>
            <div className="my-8">
              {CONFIG.oldPrice && <span className="mr-3 text-xl text-forest/50 line-through">{CONFIG.oldPrice}</span>}
              <span className="font-display text-5xl font-extrabold text-flame">{CONFIG.price}</span>
              {CONFIG.price.startsWith('[') && <Todo />}
            </div>
            <ul className="mb-10 space-y-3 text-left">
              {list.map((l) => (
                <li key={l} className="flex gap-3"><span className="font-bold text-flame">✓</span>{l}</li>
              ))}
            </ul>
            <BuyButton className="w-full">Je télécharge maintenant</BuyButton>
            <p className="mt-4 text-sm text-forest/60">🔒 Paiement sécurisé · Accès immédiat</p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-24 sm:px-8 md:py-32">
      <p className="eyebrow mb-4 text-center">Questions</p>
      <RevealText text="Tu te demandes peut-être…" className="h-section mb-12 text-center" />
      <div className="space-y-3">
        {FAQ.map((f, i) => (
          <div key={f.q} className="overflow-hidden rounded-3xl bg-butter">
            <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 p-6 text-left font-display font-semibold" aria-expanded={open === i}>
              {f.q}
              <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-2xl text-flame">+</motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.35 }}>
                  <p className="px-6 pb-6 text-forest/80">{f.a}{f.a.startsWith('[') && <Todo />}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="px-4 pb-24 sm:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-flame px-6 py-20 text-center sm:py-28">
        <img src={m('main-course-2')} alt="" loading="lazy" className="absolute -left-10 -top-10 hidden h-56 w-56 rounded-full object-cover opacity-90 md:block" />
        <img src={m('jus-1')} alt="" loading="lazy" className="absolute -bottom-10 -right-10 hidden h-56 w-56 rounded-full object-cover opacity-90 md:block" />
        <RevealText text="Ce soir, c’est toi le chef" className="relative font-display text-4xl font-extrabold text-cream sm:text-6xl" />
        <FadeUp className="relative mx-auto mt-5 max-w-lg text-lg text-cream/90">Télécharge le livre maintenant et cuisine ta première recette dès aujourd’hui.</FadeUp>
        <FadeUp className="relative mt-10"><BuyButton variant="cream">Je télécharge le livre</BuyButton></FadeUp>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-forest px-4 pb-28 pt-12 text-cream/70 sm:px-8 md:pb-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm md:flex-row">
        <span className="font-display font-bold text-cream">Yummy<span className="text-flame">.</span>Chefs</span>
        <span className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <a className="hover:text-flame" href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>
          <a className="hover:text-flame" href={`tel:${CONFIG.phone.replace(/ /g, "")}`}>{CONFIG.phone}</a>
          <a className="hover:text-flame" href={CONFIG.whatsapp} target="_blank" rel="noopener">WhatsApp</a>
        </span>
        <span>© {new Date().getFullYear()} {CONFIG.brand}. Tous droits réservés.</span>
      </div>
    </footer>
  )
}

function StickyCta() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="fixed inset-x-0 bottom-0 z-50 bg-forest/95 p-3 backdrop-blur md:hidden">
          <BuyButton className="w-full">Acheter · {CONFIG.price} <s className="opacity-70">{CONFIG.oldPrice}</s></BuyButton>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Gallery() {
  const imgs = ['p1', 'salade-1', 'dessert-2', 'jus', 'main-course-4', 'p2', 'salade-3', 'dessert-4', 'salade-5', 'p3', 'salade-7']
  const row = [...imgs, ...imgs]
  return (
    <div className="overflow-hidden py-16">
      <div className="marquee flex w-max gap-4" style={{ animationDuration: '60s' }}>
        {row.map((n, i) => (
          <img key={i} src={m(n)} alt="" loading="lazy" className="h-64 w-52 rounded-[2rem] object-cover sm:h-80 sm:w-64" />
        ))}
      </div>
    </div>
  )
}
