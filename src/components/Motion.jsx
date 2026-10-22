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

export function BuyButton({ children = 'Je veux le livre', variant = 'flame', className = '' }) {
  return (
    <a href={checkoutHref()} className={`btn-${variant} ${className}`} data-cta>
      <span>{children}</span>
      <span aria-hidden>→</span>
    </a>
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
