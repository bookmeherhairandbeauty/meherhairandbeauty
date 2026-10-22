import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, MapPin, Phone, Instagram } from "lucide-react";
import { business, imagePath } from "../data/business";
const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/services", "Services & Prices"],
  ["/contact", "Contact"],
];
const metadata = {
  "/": [
    "Meher Hair & Beauty | Hair & Beauty Salon in Canning Town",
    "Discover haircuts, hair colouring, facials, waxing and eyebrow threading at Meher Hair & Beauty, 44 Fife Road, Canning Town, East London. Call the salon to arrange an appointment.",
  ],
  "/about": [
    "About Meher Hair & Beauty | Canning Town",
    "Meet Meher Hair & Beauty, your hair and beauty destination at 44 Fife Road, Canning Town, East London.",
  ],
  "/services": [
    "Services & Prices | Meher Hair & Beauty",
    "Browse hair colouring, facials, waxing, eyebrow threading, lash and bridal makeup prices in Canning Town.",
  ],
  "/book": [
    "Request an Appointment | Meher Hair & Beauty",
    "Choose a treatment and preferred appointment time, then call Meher Hair & Beauty to arrange your visit.",
  ],
  "/contact": [
    "Contact & Directions | Meher Hair & Beauty",
    "Visit Meher Hair & Beauty at 44 Fife Road, Canning Town, London E16 1QB. Call 07903 129 511 or contact us by email.",
  ],
};
export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
    const meta = metadata[pathname] || [
      "Page not found | Meher Hair & Beauty",
      "Page not found.",
    ];
    document.title = meta[0];
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta[1]);
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main").focus();
        }}
      >
        Skip to content
      </a>
      <div className="topbar">
        <span>
          <MapPin size={12} />
          44 Fife Road, Canning Town, London
        </span>
        <a href={business.phoneHref}>
          <Phone size={12} />
          {business.phone}
        </a>
      </div>
      <header className="header">
        <div className="wrap nav-shell">
          <Link to="/" aria-label="Meher Hair & Beauty home" className="brand">
            <img
              src={imagePath("meher-logo.jpeg")}
              width="70"
              height="70"
              alt="Meher Hair & Beauty logo"
            />
            <span>
              MEHER<small>HAIR & BEAUTY</small>
            </span>
          </Link>
          <button
            id="menu-toggle"
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
          <nav
            id="navigation"
            className={open ? "navigation is-open" : "navigation"}
            aria-label="Main navigation"
          >
            {links.map(([path, label]) => (
              <NavLink key={path} to={path} end>
                {label}
              </NavLink>
            ))}
            <NavLink to="/book" className="nav-book">
              Book Appointment <ArrowUpRight size={16} />
            </NavLink>
          </nav>
        </div>
      </header>
      <main id="main" tabIndex="-1">
        <Outlet />
      </main>
      <footer>
        <div className="wrap footer-grid">
          <div>
            <Link to="/" className="brand">
              <img
                src={imagePath("meher-logo.jpeg")}
                width="64"
                height="64"
                alt="Meher Hair & Beauty logo"
              />
              <span>
                MEHER<small>HAIR & BEAUTY</small>
              </span>
            </Link>
            <p>
              Hair, beauty & a little time for you.
              <br />
              In the heart of Canning Town.
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            {links.map(([path, label]) => (
              <Link key={path} to={path}>
                {label}
              </Link>
            ))}
            <Link to="/book">Book Appointment</Link>
          </div>
          <div>
            <h3>Let’s connect</h3>
            <a href={business.phoneHref}>{business.phone}</a>
            <a href={`mailto:${business.email}`}>{business.email}</a>
            <a href={business.instagram} target="_blank" rel="noreferrer">
              <Instagram size={15} /> Instagram <ArrowUpRight size={12} />
            </a>
            <a href={business.tiktok} target="_blank" rel="noreferrer">
              TikTok <ArrowUpRight size={12} />
            </a>
          </div>
          <div>
            <h3>Visit us</h3>
            <p>
              44 Fife Road, Canning Town
              <br />
              London E16 1QB
              <br />
              United Kingdom
            </p>
            <p className="small">Opening hours to be confirmed.</p>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>© {new Date().getFullYear()} Meher Hair & Beauty</span>
          <a href={business.WebburnerTech} target="_blank" rel="noreferrer">
            Powered by Webburner Tech
          </a>
        </div>
      </footer>
      {pathname !== "/book" && (
        <Link to="/book" className="mobile-book">
          Book Appointment <ArrowUpRight size={18} />
        </Link>
      )}
    </>
  );
}
