import { Link } from "@tanstack/react-router";
import { Send, Shield } from "lucide-react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";

const SOCIAL = [
  { Icon: SiX, href: "#", label: "X" },
  { Icon: SiFacebook, href: "#", label: "Facebook" },
  { Icon: SiInstagram, href: "#", label: "Instagram" },
  { Icon: SiYoutube, href: "#", label: "YouTube" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="border-t border-navy-border bg-[oklch(0.10_0.022_242)] mt-20">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield size={18} className="text-gold" />
              <span className="font-bold uppercase tracking-wider text-foreground">
                Slots <span className="text-gold">Unfiltered</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Independent, honest slot game reviews. We test every game
              rigorously so you can play with confidence. No paid placements, no
              bias — just real analysis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="uppercase text-xs font-bold tracking-widest text-gold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "All Reviews", to: "/reviews" },
                { label: "Featured Games", to: "/" },
                { label: "Highest Rated", to: "/reviews" },
                { label: "New Releases", to: "/reviews" },
                { label: "Guides & Tips", to: "/" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    data-ocid="nav.link"
                    className="text-xs text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="uppercase text-xs font-bold tracking-widest text-gold mb-4">
              Categories
            </h4>
            <ul className="space-y-2">
              {[
                "Megaways Slots",
                "Video Slots",
                "Classic Slots",
                "Progressive Jackpots",
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    to="/reviews"
                    data-ocid="nav.link"
                    className="text-xs text-muted-foreground hover:text-gold transition-colors"
                    search={{ q: undefined, sort: undefined }}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="uppercase text-xs font-bold tracking-widest text-gold mb-4">
              Newsletter
            </h4>
            <p className="text-xs text-muted-foreground mb-3">
              Get the latest reviews and slot game news in your inbox.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                data-ocid="footer.input"
                className="flex-1 bg-navy-light border border-navy-border text-xs text-foreground placeholder:text-muted-foreground rounded-lg px-3 py-2 focus:outline-none focus:border-gold/50 transition-colors min-w-0"
              />
              <button
                type="submit"
                data-ocid="footer.submit_button"
                className="shrink-0 bg-gold text-[oklch(0.20_0.03_242)] hover:bg-gold-light font-bold rounded-lg px-3 py-2 transition-colors"
                aria-label="Subscribe"
              >
                <Send size={14} />
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-5">
              {SOCIAL.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-navy-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-navy-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {year} Slots Unfiltered. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
