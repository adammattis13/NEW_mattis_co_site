'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="bg-mattis-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with speed lines effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-mattis-lime/20 to-transparent" />
          <div className="speed-lines absolute inset-0" />
        </div>

        {/* Diagonal accent slash */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-br from-mattis-lime/5 to-transparent transform skew-x-12 translate-x-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-px w-12 bg-mattis-lime" />
              <span className="text-mattis-lime text-sm font-mono tracking-wider uppercase">
                Battle-Tested. Mission-Ready.
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-7xl md:text-9xl leading-none mb-8 tracking-tight"
            >
              CAPITAL.
              <br />
              CLARITY.
              <br />
              <span className="text-mattis-lime">FULL SEND.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-mattis-gray leading-relaxed mb-12 max-w-2xl"
            >
              Private equity and strategic advisory for operators who refuse to settle. 
              <span className="text-mattis-white"> We deploy capital and clarity with the same precision we brought to the battlefield.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold bg-mattis-lime text-mattis-black hover:bg-mattis-lime-dark transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(186,218,85,0.3)]"
              >
                LET'S TALK
              </Link>
              <Link
                href="/approach"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold border-2 border-mattis-lime text-mattis-lime hover:bg-mattis-lime hover:text-mattis-black transition-all"
              >
                OUR APPROACH
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, repeat: Infinity, duration: 2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <div className="w-px h-16 bg-gradient-to-b from-mattis-lime to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-24 px-6 lg:px-8 bg-mattis-charcoal">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-5xl md:text-6xl mb-6 slash-accent inline-block">
              PRECISION-BUILT PARTNERSHIPS
            </h2>
            <p className="text-xl text-mattis-gray max-w-3xl mx-auto">
              After decades building teams and scaling enterprises, we're doing something different. 
              We partner, not consult. Your mission becomes our mission.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Micro Nuclear Pioneers',
                description: 'One of the only PE/advisory firms actively targeting decentralized small-modular reactors to power the AI/data-center explosion.',
              },
              {
                number: '02',
                title: 'Battle-Tested Operators',
                description: 'Military-grade strategic rigor applied to rollups, AI integration, and operating model redesigns.',
              },
              {
                number: '03',
                title: 'Founder-First PE',
                description: 'We buy and build with the same intensity and loyalty shown on the battlefield. Long-term hold, zero drama, maximum throttle.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-mattis-black p-8 border border-mattis-lime/20 hover:border-mattis-lime transition-all group"
              >
                <div className="font-mono text-xs text-mattis-lime mb-4 tracking-wider">
                  {item.number}
                </div>
                <h3 className="font-display text-2xl mb-4 group-hover:text-mattis-lime transition-colors">
                  {item.title}
                </h3>
                <p className="text-mattis-gray leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats / Impact */}
      <section className="py-24 px-6 lg:px-8 bg-mattis-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-mattis-lime/5 via-transparent to-mattis-lime/5" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="font-display text-6xl text-mattis-lime mb-2">20+</div>
              <div className="text-mattis-gray uppercase text-sm tracking-wider">Years Combined Experience</div>
            </div>
            <div>
              <div className="font-display text-6xl text-mattis-lime mb-2">$500M+</div>
              <div className="text-mattis-gray uppercase text-sm tracking-wider">Capital Under Management</div>
            </div>
            <div>
              <div className="font-display text-6xl text-mattis-lime mb-2">100%</div>
              <div className="text-mattis-gray uppercase text-sm tracking-wider">Mission-First Mentality</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 lg:px-8 bg-gradient-to-br from-mattis-charcoal to-mattis-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-5xl md:text-7xl mb-8">
              READY TO <span className="text-mattis-lime">DEPLOY?</span>
            </h2>
            <p className="text-xl text-mattis-gray mb-12 max-w-2xl mx-auto">
              Whether you're scaling operations or seeking capital, let's talk about how we can support your mission.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-12 py-5 text-xl font-bold bg-mattis-lime text-mattis-black hover:bg-mattis-lime-dark transition-all transform hover:scale-105 hover:shadow-[0_0_40px_rgba(186,218,85,0.4)]"
            >
              MAKE CONTACT
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
