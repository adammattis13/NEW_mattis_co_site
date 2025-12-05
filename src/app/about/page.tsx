'use client'

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="bg-mattis-black min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <h1 className="font-display text-6xl md:text-8xl mb-8 slash-accent">
            WHO WE <span className="text-mattis-lime">ARE</span>
          </h1>
          <p className="text-2xl md:text-3xl text-mattis-gray leading-relaxed max-w-4xl">
            After decades of working with enterprises and building teams, it's time for something different.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-32 max-w-5xl"
        >
          <div className="bg-mattis-charcoal p-12 border-l-4 border-mattis-lime">
            <p className="text-xl md:text-2xl text-mattis-white leading-relaxed mb-6">
              <strong className="text-mattis-lime">We want to help our clients win.</strong> We want to be partners, not vendors.
            </p>
            <p className="text-xl md:text-2xl text-mattis-white leading-relaxed">
              Your goals become our mission. Your challenges become our objectives. Your success becomes our victory.
            </p>
          </div>
        </motion.section>

        {/* What We Believe */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <h2 className="font-display text-4xl md:text-5xl mb-12 text-mattis-lime">
            WHAT WE BELIEVE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Mission First',
                description: 'Every decision, every deployment of capital, every strategic recommendation starts with one question: Does this serve the mission?',
              },
              {
                title: 'Long-Term Hold',
                description: 'We're not flippers. We buy to build. We partner to scale. We commit with the same intensity and loyalty we learned on the battlefield.',
              },
              {
                title: 'Operational Excellence',
                description: 'Strategy without execution is just conversation. We deploy military-grade operational rigor to every engagement.',
              },
              {
                title: 'Full Transparency',
                description: 'No hidden agendas. No vendor games. Just honest partnership and clear communication at every step.',
              },
            ].map((belief, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-mattis-charcoal p-8 border border-mattis-lime/20 hover:border-mattis-lime transition-all"
              >
                <h3 className="font-display text-2xl mb-4 text-mattis-white">
                  {belief.title}
                </h3>
                <p className="text-mattis-gray leading-relaxed">
                  {belief.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <h2 className="font-display text-4xl md:text-5xl mb-16 text-mattis-lime">
            LEADERSHIP
          </h2>

          {/* Adam Mattis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-1">
              <div className="aspect-square bg-gradient-to-br from-mattis-gray/20 to-mattis-charcoal border-2 border-mattis-lime/30 flex items-center justify-center mb-6">
                {/* Replace with actual photo */}
                <div className="text-mattis-lime text-6xl font-bold">AM</div>
              </div>
              <h3 className="font-display text-3xl mb-2">ADAM MATTIS</h3>
              <p className="text-mattis-lime font-medium mb-4">Founding Partner & President</p>
            </div>
            <div className="lg:col-span-2">
              <p className="text-lg text-mattis-gray leading-relaxed mb-4">
                Adam Mattis brings over two decades of experience building and scaling high-performance teams 
                across defense, technology, and enterprise sectors. After serving in roles demanding both strategic 
                vision and tactical execution, he founded Mattis&Co to bridge the gap between capital deployment 
                and operational excellence.
              </p>
              <p className="text-lg text-mattis-gray leading-relaxed mb-4">
                His approach is simple: treat every investment and every advisory engagement with the same 
                precision, loyalty, and intensity he learned from mentors like 1st Lt. Kevin J. Smith. 
                No shortcuts. No drama. Just mission-focused partnership and relentless execution.
              </p>
              <p className="text-lg text-mattis-gray leading-relaxed">
                Adam specializes in identifying high-conviction themes—from micro nuclear infrastructure 
                to AI-enabled service businesses—and deploying both capital and strategic clarity to help 
                founders and operators achieve breakthrough results.
              </p>
            </div>
          </div>

          {/* Board/Advisors Teaser */}
          <div className="bg-mattis-charcoal p-12 text-center border border-mattis-lime/20">
            <h3 className="font-display text-3xl mb-4 text-mattis-white">
              BOARD & ADVISORS
            </h3>
            <p className="text-lg text-mattis-gray mb-8 max-w-2xl mx-auto">
              We're building a network of battle-tested operators, technical experts, and industry veterans. 
              More details coming soon.
            </p>
            <Link
              href="/board"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold border-2 border-mattis-lime text-mattis-lime hover:bg-mattis-lime hover:text-mattis-black transition-all"
            >
              VIEW FULL BOARD
            </Link>
          </div>
        </motion.section>

        {/* Memorial CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-20 border-t border-mattis-gray/20"
        >
          <h2 className="font-display text-4xl mb-6">
            IN MEMORY OF <span className="text-mattis-lime">1ST LT. KEVIN J. SMITH</span>
          </h2>
          <p className="text-lg text-mattis-gray mb-8 max-w-2xl mx-auto">
            This company exists to honor a legacy of service, leadership, and sacrifice.
          </p>
          <Link
            href="/memorial"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold border-2 border-mattis-gray text-mattis-gray hover:border-mattis-lime hover:text-mattis-lime transition-all"
          >
            LEARN MORE
          </Link>
        </motion.section>
      </div>
    </div>
  )
}
