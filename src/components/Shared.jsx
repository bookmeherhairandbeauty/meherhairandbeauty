import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Phone,
  Clock,
  Scissors,
  Sparkles,
  Eye,
  Flower2,
  Droplets,
  Palette,
  Heart,
} from "lucide-react";
import {
  business,
  imagePath,
  mapsDirections,
  mapsEmbed,
} from "../data/business";
export const icons = {
  haircuts: Scissors,
  colour: Palette,
  treatments: Droplets,
  threading: Eye,
  tinting: Eye,
  waxing: Flower2,
  lashes: Sparkles,
  facials: Droplets,
  makeup: Heart,
};
export function Button({
  to,
  href,
  children,
  secondary = false,
  className = "",
  ...props
}) {
  const style = `button ${secondary ? "button-secondary" : "button-primary"} ${className}`;
  return to ? (
    <Link to={to} className={style} {...props}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  ) : (
    <a href={href} className={style} {...props}>
      {children}
      <ArrowUpRight size={17} />
    </a>
  );
}
export function Eyebrow({ children }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
export function PageHeading({ eyebrow, title, children }) {
  return (
    <div className="page-heading wrap">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p className="lede">{children}</p>
    </div>
  );
}
export function BookingCTA() {
  return (
    <section className="cta-section wrap">
      <div>
        <Eyebrow>A LITTLE TIME FOR YOU</Eyebrow>
        <h2>
          Your next beauty moment
          <br />
          starts here.
        </h2>
        <p>Choose your treatment. Call the salon. We’ll take it from there.</p>
      </div>
      <Button to="/book">Book Appointment</Button>
    </section>
  );
}
export function Gallery() {
  return (
    <section className="section wrap gallery">
      <div>
        <Eyebrow>A CLOSER LOOK</Eyebrow>
        <h2>Meet Meher.</h2>
        <p>Explore our original salon treatment menus.</p>
        <p className="muted">
          Salon & work gallery — coming soon.
          <br />
          Authentic salon and treatment photographs to be added.
        </p>
        <Link className="text-link" to="/services">
          Browse the full price list <ArrowRight size={16} />
        </Link>
      </div>
      <a
        href={imagePath("1.png")}
        target="_blank"
        rel="noreferrer"
        className="menu-photo"
      >
        <img
          loading="lazy"
          src={imagePath("1.png")}
          width="1200"
          height="1600"
          alt="Meher printed price list for hair, waxing, lashes, facials and makeup"
        />
        <span>
          Our treatment menu <ArrowUpRight size={16} />
        </span>
      </a>
      <a
        href={imagePath("2.png")}
        target="_blank"
        rel="noreferrer"
        className="menu-photo"
      >
        <img
          loading="lazy"
          src={imagePath("2.png")}
          width="1200"
          height="1600"
          alt="Meher printed threading, tinting and lamination menu"
        />
        <span>
          Brows & beauty menu <ArrowUpRight size={16} />
        </span>
      </a>
    </section>
  );
}
export function Location({ showMap = true }) {
  return (
    <section className="location-grid wrap section">
      <div>
        <Eyebrow>YOUR LOCAL BEAUTY DESTINATION</Eyebrow>
        <h2>
          Find us in
          <br />
          <em>Canning Town.</em>
        </h2>
        <p className="icon-line">
          <MapPin size={20} />
          <span>{business.address}</span>
        </p>
        <a className="icon-line" href={business.phoneHref}>
          <Phone size={20} />
          {business.phone}
        </a>
        <p className="icon-line muted">
          <Clock size={20} />
          <span>{business.openingHours}</span>
        </p>
        <Button
          href={mapsDirections}
          secondary
          target="_blank"
          rel="noreferrer"
        >
          Get Directions
        </Button>
      </div>
      {showMap && (
        <iframe
          className="map"
          title="Map of 44 Fife Road, Canning Town"
          src={mapsEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      )}
    </section>
  );
}
