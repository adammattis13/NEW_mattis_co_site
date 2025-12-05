'use client'

import { motion } from 'framer-motion'

export default function Approach() {
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
            OUR <span className="text-mattis-lime">APPROACH</span>
          </h1>
          <p className="text-2xl md:text-3xl text-mattis-gray leading-relaxed max-w-4xl">
            Two complementary engines: Capital deployment with founder-first PE. 
            Strategic clarity through battle-tested advisory.
          </p>
        </motion.div>

        {/* PE Strategy */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="bg-mattis-charcoal p-12 border-l-4 border-mattis-lime mb-12">
            <h2 className="font-display text-4xl md:text-5xl mb-6 text-mattis-lime">
              PRIVATE EQUITY STRATEGY
            </h2>
            <p className="text-xl text-mattis-white leading-relaxed mb-6">
              We're not financial engineers. We're operators who deploy capital to build, not flip.
            </p>
            <p className="text-lg text-mattis-gray leading-relaxed">
              Long-term hold. Zero drama. Maximum support. We buy businesses we understand and commit 
              the same intensity and loyalty we learned on the battlefield.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Investment Themes',
                items: [
                  'Micro nuclear & energy infrastructure',
                  'AI-enabled service businesses',
                  'Industrial rollups',
                  'Defense & aerospace suppliers',
                ],
              },
              {
                title: 'Deal Structure',
                items: [
                  'Control or significant minority',
                  '$5M - $50M check size',
                  'Flexible on leverage',
                  'Founder/operator participation',
                ],
              },
              {
                title: 'Post-Close Value',
                items: [
                  'Operational support',
                  'Strategic hiring',
                  'Tech integration',
                  'M&A add-ons',
                ],
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-mattis-black p-8 border border-mattis-lime/20"
              >
                <h3 className="font-display text-2xl mb-6 text-mattis-white">
                  {category.title}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li key={i} className="text-mattis-gray flex items-start">
                      <span className="text-mattis-lime mr-3 mt-1">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Advisory Services */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="bg-mattis-charcoal p-12 border-l-4 border-mattis-lime mb-12">
            <h2 className="font-display text-4xl md:text-5xl mb-6 text-mattis-lime">
              STRATEGIC ADVISORY
            </h2>
            <p className="text-xl text-mattis-white leading-relaxed mb-6">
              Partners, not vendors. Your goals become our mission.
            </p>
            <p className="text-lg text-mattis-gray leading-relaxed">
              We bring military-grade operational rigor to help you scale faster, integrate smarter, 
              and win more decisively in your market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'AI Integration',
                description: 'Deploy AI where it actually moves the needle. Strategy, implementation, change management.',
              },
              {
                title: 'Operating Model Redesign',
                description: 'Strip out complexity. Build scalable processes. Enable rapid growth without breaking things.',
              },
              {
                title: 'M&A / Rollup Support',
                description: 'Identify targets, execute diligence, integrate acquisitions with precision.',
              },
              {
                title: 'Go-To-Market Strategy',
                description: 'Sharpen positioning, optimize sales processes, accelerate pipeline velocity.',
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-mattis-black p-8 border border-mattis-lime/20 hover:border-mattis-lime transition-all group"
              >
                <h3 className="font-display text-2xl mb-4 group-hover:text-mattis-lime transition-colors">
                  {service.title}
                </h3>
                <p className="text-mattis-gray leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 text-center py-20 border-t border-mattis-gray/20"
        >
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            READY TO <span className="text-mattis-lime">MOVE FORWARD?</span>
          </h2>
          <p className="text-lg text-mattis-gray mb-8 max-w-2xl mx-auto">
            Let's discuss how we can support your mission—whether through capital, strategy, or both.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-12 py-5 text-xl font-bold bg-mattis-lime text-mattis-black hover:bg-mattis-lime-dark transition-all transform hover:scale-105"
          >
            LET'S TALK
          </a>
        </motion.section>
      </div>
    </div>
  )
}
