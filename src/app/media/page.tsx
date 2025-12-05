'use client'

import { motion } from 'framer-motion'

export default function Media() {
  return (
    <div className="bg-mattis-black min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-display text-6xl md:text-8xl mb-8 slash-accent inline-block">
            <span className="text-mattis-lime">MEDIA</span>
          </h1>
          <p className="text-2xl text-mattis-gray leading-relaxed max-w-3xl mx-auto mb-16">
            Press releases, media coverage, and company updates.
          </p>
          
          <div className="bg-mattis-charcoal p-16 border border-mattis-lime/20 max-w-2xl mx-auto">
            <p className="text-xl text-mattis-white mb-4">Coming Soon</p>
            <p className="text-mattis-gray">
              Media kit, press releases, and coverage will be published here.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
