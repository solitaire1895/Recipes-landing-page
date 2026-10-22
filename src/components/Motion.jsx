import { useState } from 'react'
import { motion } from 'framer-motion'
import { checkoutHref } from '../config'

const ease = [0.22, 1, 0.36, 1]

// Word-by-word blur/rise reveal, as in the Maestro template headings
export function RevealText({ text, className = '', as = 'h2', delay = 0 }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {text.split(' ').map((w, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          variants={{
            hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
            show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease } },
          }}
        >
          {w + ' '}
        </motion.span>
      ))}
    </Tag>
  )
}

export function FadeUp({ children, className = '', delay = 0, y = 40 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

// Click: press, ripple burst from the tap point, arrow flies out, then checkout
export function BuyButton({ children = 'Je veux le livre', variant = 'flame', className = '' }) {
  const [ripple, setRipple] = useState(null)
  const href = checkoutHref()
  const click = (e) => {
    e.preventDefault()
    const r = e.currentTarget.getBoundingClientRect()
    setRipple({ x: e.clientX - r.left, y: e.clientY - r.top, key: Date.now() })
    setTimeout(() => { window.location.href = href }, 450)
  }
  return (
    <motion.a href={href} onClick={click} whileTap={{ scale: 0.92 }} className={`btn-${variant} ${className}`} data-cta>
      {ripple && (
        <motion.span
          key={ripple.key}
          initial={{ scale: 0, opacity: 0.6 }} animate={{ scale: 12, opacity: 0 }} transition={{ duration: 0.6 }}
          className="pointer-events-none absolute h-10 w-10 rounded-full bg-cream"
          style={{ left: ripple.x - 20, top: ripple.y - 20 }}
        />
      )}
      <span>{children}</span>
      <motion.span aria-hidden animate={ripple ? { x: [0, -4, 40], opacity: [1, 1, 0] } : { x: 0 }} transition={{ duration: 0.45 }}>→</motion.span>
    </motion.a>
  )
}

export function Todo({ children }) {
  // Visible seulement en développement : signale le contenu à remplacer
  if (!import.meta.env.DEV) return null
  return (
    <span className="ml-2 inline-block rounded bg-red-600 px-2 py-0.5 align-middle font-sans text-[10px] font-semibold uppercase text-white">
      {children || 'À remplacer'}
    </span>
  )
}
