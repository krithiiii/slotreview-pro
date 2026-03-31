import { Link, useRouter } from "@tanstack/react-router";
import { Menu, Search, Shield, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.navigate({
        to: "/reviews",
        search: { q: searchQuery.trim(), sort: undefined },
      });
      setSearchOpen(false);
      setSearchQuery("");
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-navy-border bg-[oklch(0.12_0.025_242)]/95 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          data-ocid="nav.link"
          className="flex items-center gap-2.5 shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/40 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
            <Shield size={16} className="text-gold" />
          </div>
          <span className="font-bold text-base tracking-wider uppercase text-foreground">
            Slots <span className="text-gold">Unfiltered</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            { label: "Reviews", to: "/reviews" },
            { label: "Latest", to: "/reviews" },
            { label: "Top Rated", to: "/reviews" },
            { label: "Guides", to: "/" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              data-ocid="nav.link"
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-gold transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search slots…"
                data-ocid="header.search_input"
                className="bg-navy-light border border-navy-border text-sm text-foreground placeholder:text-muted-foreground rounded-lg px-3 py-1.5 w-48 focus:outline-none focus:border-gold/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              data-ocid="header.search_input"
              aria-label="Open search"
              className="p-2 text-muted-foreground hover:text-gold transition-colors"
            >
              <Search size={18} />
            </button>
          )}
          <button
            type="button"
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-navy-border bg-[oklch(0.14_0.028_242)] px-4 py-4 space-y-3">
          {[
            { label: "Reviews", to: "/reviews" },
            { label: "Latest", to: "/reviews" },
            { label: "Top Rated", to: "/reviews" },
            { label: "Guides", to: "/" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              data-ocid="nav.link"
              className="block text-sm font-semibold uppercase tracking-widest text-muted-foreground hover:text-gold py-1"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
