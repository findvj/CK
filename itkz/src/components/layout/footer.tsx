import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/footer_logo.png"
                alt="Bhupati Info Solution LLP"
                width={280}
                height={100}
                className="h-20 w-auto"
              />
            </div>
            <p className="text-sm text-white/70">
              Your trusted source for premium PC hardware and custom-built computers. 
              Build your dream PC with our expert guidance and top-quality components.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-white/80"><b>Phone:</b> <a href="tel:+917977186317">+91 7977186317</a></li>
              <li className="text-white/80"><b>Email:</b> <a href="mailto:support@bhupatiinfo.com">support@bhupatiinfo.com</a></li>
              <li className="text-white/80"><b>Hours:</b> Mon-Sat, 10:00 AM - 7:00 PM</li>
              <li className="text-white/80">
                <b>Address:</b> 
                <a 
                  href="https://maps.google.com/?q=Aditya+Arcade+Topiwala+Ln+Grant+Road+E+Shapur+Baug+Grant+Road+Mumbai+Maharashtra+400007+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <address>Aditya Arcade, Topiwala Ln, Grant Road (E), Shapur Baug, Grant Road, Mumbai, Maharashtra 400007, India</address>
                </a>
              </li>
              </ul>
          </div>

          {/* Quick Links + Support (side-by-side on mobile only) */}
          <div className="grid grid-cols-2 gap-6 md:hidden">
            <div className="space-y-4">
              <h3 className="font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/products" className="text-white/70 hover:text-primary transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/pc-builder" className="text-white/70 hover:text-primary transition-colors">
                    PC Builder
                  </Link>
                </li>
                <li>
                  <Link href="/prebuilt" className="text-white/70 hover:text-primary transition-colors">
                    Pre-built PCs
                  </Link>
                </li>
                <li>
                  <Link href="/deals" className="text-white/70 hover:text-primary transition-colors">
                    Special Deals
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/contact" className="text-white/70 hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-white/70 hover:text-primary transition-colors">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-white/70 hover:text-primary transition-colors">
                    Returns & Warranty
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-white/70 hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Desktop/Tablet: separate columns as before */}
          <div className="space-y-4 hidden md:block">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-white/70 hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/pc-builder" className="text-white/70 hover:text-primary transition-colors">
                  PC Builder
                </Link>
              </li>
              <li>
                <Link href="/prebuilt" className="text-white/70 hover:text-primary transition-colors">
                  Pre-built PCs
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-white/70 hover:text-primary transition-colors">
                  Special Deals
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4 hidden md:block">
            <h3 className="font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-white/70 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-white/70 hover:text-primary transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-white/70 hover:text-primary transition-colors">
                  Returns & Warranty
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-white/70 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/60">
            © 2024 Bhupati Info Solution LLP. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-white/70 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-white/70 hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
