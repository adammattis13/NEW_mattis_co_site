'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/board', label: 'Board' },
    { href: '/approach', label: 'Approach' },
    { href: '/insights', label: 'Insights' },
    { href: '/careers', label: 'Careers' },
    { href: '/media', label: 'Media' },
    { href: '/contact', label: 'Contact', highlight: true },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-mattis-black/95 backdrop-blur-md border-b border-mattis-lime/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="h-10 relative">
                <span className="font-display text-3xl tracking-tight group-hover:text-mattis-lime transition-colors">
                  MATTIS<span className="text-mattis-gray">&</span>CO
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium transition-all relative group ${
                    link.highlight
                      ? 'text-mattis-black bg-mattis-lime hover:bg-mattis-lime-dark'
                      : 'text-mattis-white hover:text-mattis-lime'
                  }`}
                >
                  {link.label}
                  {!link.highlight && (
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mattis-lime transition-all group-hover:w-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-mattis-white hover:text-mattis-lime transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-current transition-all ${
                    isOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transition-all ${
                    isOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transition-all ${
                    isOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-mattis-black/95 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 top-0 h-full w-80 bg-mattis-charcoal border-l border-mattis-lime/20 overflow-y-auto">
              <div className="flex flex-col p-8 pt-24 space-y-2">
                {links.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-6 py-4 text-lg font-medium transition-all ${
                        link.highlight
                          ? 'text-mattis-black bg-mattis-lime hover:bg-mattis-lime-dark'
                          : 'text-mattis-white hover:text-mattis-lime hover:translate-x-2'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
