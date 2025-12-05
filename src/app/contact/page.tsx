'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    interest: '',
  })

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    
    // TODO: Integrate with Resend or your email service
    // For now, just simulate sending
    setTimeout(() => {
      setStatus('sent')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="bg-mattis-black min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="font-display text-6xl md:text-7xl mb-8 slash-accent">
              MAKE
              <br />
              <span className="text-mattis-lime">CONTACT</span>
            </h1>
            
            <p className="text-xl text-mattis-gray mb-12 leading-relaxed">
              Ready to deploy capital, scale operations, or explore strategic partnerships? 
              Let's talk about your mission.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl text-mattis-lime mb-2">LOCATION</h3>
                <p className="text-mattis-gray">Raleigh, NC</p>
              </div>

              <div>
                <h3 className="font-display text-xl text-mattis-lime mb-2">PHONE</h3>
                <a href="tel:8142327404" className="text-mattis-white hover:text-mattis-lime transition-colors">
                  814.232.7404
                </a>
              </div>

              <div>
                <h3 className="font-display text-xl text-mattis-lime mb-2">EMAIL</h3>
                <a href="mailto:info@mattisco.com" className="text-mattis-white hover:text-mattis-lime transition-colors">
                  info@mattisco.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-mattis-charcoal p-8 border border-mattis-lime/20"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-mattis-white mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-mattis-black border border-mattis-gray/30 text-mattis-white focus:border-mattis-lime focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-mattis-white mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-mattis-black border border-mattis-gray/30 text-mattis-white focus:border-mattis-lime focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-mattis-white mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-mattis-black border border-mattis-gray/30 text-mattis-white focus:border-mattis-lime focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-mattis-white mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-mattis-black border border-mattis-gray/30 text-mattis-white focus:border-mattis-lime focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-mattis-white mb-2">
                  Area of Interest *
                </label>
                <select
                  id="interest"
                  name="interest"
                  required
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-mattis-black border border-mattis-gray/30 text-mattis-white focus:border-mattis-lime focus:outline-none transition-colors"
                >
                  <option value="">Select...</option>
                  <option value="pe">Private Equity / Capital</option>
                  <option value="advisory">Strategic Advisory</option>
                  <option value="micro-nuclear">Micro Nuclear</option>
                  <option value="ai-integration">AI Integration</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-mattis-white mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-mattis-black border border-mattis-gray/30 text-mattis-white focus:border-mattis-lime focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="w-full px-8 py-4 font-bold bg-mattis-lime text-mattis-black hover:bg-mattis-lime-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {status === 'sending' && 'SENDING...'}
                {status === 'sent' && 'MESSAGE SENT ✓'}
                {status === 'idle' && 'SEND MESSAGE'}
                {status === 'error' && 'TRY AGAIN'}
              </button>

              <p className="text-sm text-mattis-gray text-center">
                We typically respond within 24 hours.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
