import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-mattis-charcoal border-t border-mattis-lime/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-display text-3xl mb-4 tracking-tight">
              MATTIS<span className="text-mattis-gray">&</span>CO
            </h3>
            <p className="text-mattis-gray text-sm mb-4">
              Capital. Clarity. Full Send.
            </p>
            <p className="text-mattis-gray text-sm">
              Battle-tested operators deploying capital and strategy with military precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-mattis-lime">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-mattis-gray hover:text-mattis-lime transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/approach" className="text-mattis-gray hover:text-mattis-lime transition-colors">
                  Approach
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-mattis-gray hover:text-mattis-lime transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/memorial" className="text-mattis-gray hover:text-mattis-lime transition-colors">
                  In Memoriam
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-mattis-lime">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-mattis-gray">
              <li>Raleigh, NC</li>
              <li>
                <a href="tel:8142327404" className="hover:text-mattis-lime transition-colors">
                  814.232.7404
                </a>
              </li>
              <li>
                <a href="mailto:info@mattisco.com" className="hover:text-mattis-lime transition-colors">
                  info@mattisco.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-mattis-gray/20">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-mattis-gray">
            <p>© {new Date().getFullYear()} Mattis&Co. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-mattis-lime transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-mattis-lime transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
