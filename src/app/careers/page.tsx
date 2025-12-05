'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Careers() {
  return (
    <div className="bg-mattis-black min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-display text-6xl md:text-8xl mb-8 slash-accent inline-block">
            <span className="text-mattis-lime">CAREERS</span>
          </h1>
          <p className="text-2xl text-mattis-gray leading-relaxed max-w-3xl mx-auto mb-16">
            Join a team that operates with military precision and founder-first values.
          </p>
          
          <div className="bg-mattis-charcoal p-16 border border-mattis-lime/20 max-w-2xl mx-auto mb-12">
            <p className="text-xl text-mattis-white mb-4">No Current Openings</p>
            <p className="text-mattis-gray mb-8">
              We're always looking for exceptional operators. If you think you'd be a fit, reach out.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold border-2 border-mattis-lime text-mattis-lime hover:bg-mattis-lime hover:text-mattis-black transition-all"
            >
              GET IN TOUCH
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
