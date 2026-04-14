'use client'

import { useEffect, useRef, ReactNode, ElementType } from 'react'

interface Props {
  children: ReactNode
  className?: string
  as?: ElementType
}

export default function AnimateOnScroll({ children, className = '', as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`animate-fade-up ${className}`}>
      {children}
    </Tag>
  )
}
