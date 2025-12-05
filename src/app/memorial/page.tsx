'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Memorial() {
  return (
    <div className="bg-mattis-black min-h-screen">
      {/* Minimal navigation override - just logo */}
      <div className="fixed top-0 w-full z-50 bg-mattis-black/80 backdrop-blur-sm border-b border-mattis-gray/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/" className="font-display text-2xl tracking-tight text-mattis-gray hover:text-mattis-white transition-colors">
            MATTIS<span className="text-mattis-gray/50">&</span>CO
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Photo Placeholder - Replace with actual B&W photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-16"
          >
            <div className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-mattis-gray/20 to-mattis-charcoal border-2 border-mattis-gray/30 flex items-center justify-center overflow-hidden">
              {/* Replace this with actual image: */}
              {/* <Image src="/assets/kevin-smith.jpg" alt="1st Lt. Kevin J. Smith" fill className="object-cover grayscale" /> */}
              <div className="text-mattis-gray text-6xl font-bold">KJS</div>
            </div>
          </motion.div>

          {/* Service Details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12 text-mattis-gray font-mono text-sm tracking-wider space-y-1"
          >
            <p>WEST POINT '02</p>
            <p>1ST LT, 1-76 FA, 3RD INFANTRY DIVISION</p>
            <p>KIA 8 DEC 2005, BAGHDAD</p>
          </motion.div>

          {/* Main Tribute */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-3xl leading-relaxed mb-16 text-mattis-white max-w-3xl mx-auto"
          >
            <p className="mb-8">
              "Kevin embodied what it means to lead from the front. His courage, 
              integrity, and unwavering commitment to his soldiers set a standard 
              that continues to inspire everyone who had the honor of serving alongside him."
            </p>
            <p className="mb-8">
              "He believed in service above self, in protecting those who couldn't 
              protect themselves, and in the idea that leadership means being willing 
              to sacrifice everything for those you lead."
            </p>
            <p>
              "This company exists to honor that legacy—by approaching every mission 
              with the same intensity, loyalty, and precision that Kevin brought to 
              the battlefield every single day."
            </p>
          </motion.blockquote>

          {/* Adam's Dedication */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-16"
          >
            <div className="h-px w-16 bg-mattis-lime mx-auto mb-8" />
            <p className="text-mattis-gray italic text-lg">
              — Adam Mattis
            </p>
          </motion.div>

          {/* Closing Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mb-12"
          >
            <p className="font-display text-4xl text-mattis-lime mb-2 tracking-tight">
              REST EASY, KJ.
            </p>
            <p className="font-display text-2xl text-mattis-white tracking-tight">
              WE HAVE THE WATCH.
            </p>
          </motion.div>

          {/* Scholarship CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <a
              href="https://www.mattisfoundation.org/scholarship-application.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold border-2 border-mattis-gray text-mattis-gray hover:border-mattis-lime hover:text-mattis-lime transition-all"
            >
              KEVIN J. SMITH MEMORIAL SCHOLARSHIP
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-mattis-gray/20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-mattis-gray text-sm">
            © {new Date().getFullYear()} Mattis&Co. In honor and memory of 1st Lt. Kevin J. Smith.
          </p>
        </div>
      </footer>
    </div>
  )
}
