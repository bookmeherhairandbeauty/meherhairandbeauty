import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Scissors,
  Sparkles,
  MapPin,
  Heart,
  MessageCircle,
  Check,
} from "lucide-react";
import {
  Button,
  Eyebrow,
  BookingCTA,
  Gallery,
  Location,
  icons,
} from "../components/Shared";
import { imagePath } from "../data/business";
import { categories } from "../data/services";
const startingPrice = (id) =>
  `From £${categories.find((c) => c.id === id).services[0].price}`;
const previews = [
  ["haircuts", "Haircuts & Styling", "A fresh perspective."],
  ["colour", "Colour & Highlights", "Find your signature shade."],
  ["facials", "Facials & Skincare", "A little care for your skin."],
];
export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <Eyebrow>HAIR & BEAUTY · CANNING TOWN</Eyebrow>
          <h1>
            Your Beauty,
            <br />
            <em>Our Passion.</em>
          </h1>
          <p className="lede">
            Discover professional hair, beauty and skincare treatments at Meher
            Hair & Beauty in Canning Town, London.
          </p>
          <div className="button-row">
            <Button to="/book">Book Appointment</Button>
            <Link to="/services" className="text-link">
              Explore Services <ArrowRight size={18} />
            </Link>
          </div>
          <div className="hero-note">
            <span className="mini-icon">
              <Heart size={19} />
            </span>
            <span>
              From everyday care to special occasions.
              <br />
              <strong>A little time, just for you.</strong>
            </span>
          </div>
        </div>
        <div className="hero-art">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <span className="art-label">A BEAUTIFUL MOMENT STARTS HERE</span>
          <div className="logo-medallion">
            <img
              src={imagePath("meher-logo.jpeg")}
              alt="Meher Hair & Beauty — pink salon emblem"
              width="1254"
              height="1254"
              fetchPriority="high"
            />
          </div>
          <div className="art-caption">
            <span>
              YOUR LOCAL
              <br />
              BEAUTY DESTINATION
            </span>
            <Sparkles strokeWidth={1} size={36} />
          </div>
          <div className="floating-note">
            <span className="mini-icon">
              <Scissors size={22} />
            </span>
            <div>
              Beautifully you.<small>Hair · Beauty · Skincare</small>
            </div>
          </div>
        </div>
      </section>
      <div className="service-ribbon">
        <span>HAIR & STYLING</span>
        <i>✧</i>
        <span>BROWS & LASHES</span>
        <i>✧</i>
        <span>FACIALS & SKINCARE</span>
        <i>✧</i>
        <span>MAKEUP & BRIDAL</span>
      </div>
      <section className="section wrap intro">
        <Eyebrow>WELCOME TO MEHER</Eyebrow>
        <h2>
          Your neighbourhood salon.
          <br />
          <em>Your moment to shine.</em>
        </h2>
        <div>
          <p>
            Looking for a fresh cut, beautifully defined brows or makeup for a
            special day? Find hair, beauty and skincare treatments together at
            our Canning Town salon.
          </p>
          <Link to="/about" className="text-link">
            A little more about us <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="soft-section">
        <div className="wrap section">
          <div className="section-heading">
            <div>
              <Eyebrow>FIND YOUR NEXT TREATMENT</Eyebrow>
              <h2>
                A little care. <em>A lovely difference.</em>
              </h2>
            </div>
            <Link to="/services" className="text-link">
              All services & prices <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="preview-grid">
            {previews.map(([id, title, desc], i) => {
              const Icon = icons[id];
              return (
                <Link
                  key={id}
                  to={`/services?category=${id}`}
                  className={`service-preview preview-${i}`}
                >
                  <div className="service-illustration">
                    <Icon size={82} strokeWidth={0.8} />
                    <span className="preview-number">0{i + 1}</span>
                  </div>
                  <div className="preview-copy">
                    <span className="price-chip">{startingPrice(id)}</span>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                    <span className="round-arrow">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="category-links">
            {[
              ["waxing", "Body Waxing"],
              ["threading", "Eyebrow Threading & Tinting"],
              ["lashes", "Eyelash Extensions & Lifts"],
              ["makeup", "Makeup & Bridal Beauty"],
            ].map(([id, label]) => (
              <Link to={`/services?category=${id}`} key={id}>
                {label}
                <ArrowUpRight size={15} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section wrap why">
        <div>
          <Eyebrow>BEAUTY, MADE PERSONAL</Eyebrow>
          <h2>
            Good reasons
            <br />
            to make it <em>Meher.</em>
          </h2>
        </div>
        <div className="reason-grid">
          {[
            [
              Sparkles,
              "More in one place",
              "Hair, brows, lashes, skincare and makeup, all on one treatment menu.",
            ],
            [
              Check,
              "Clear treatment prices",
              "Browse our printed-menu prices before sending a booking request.",
            ],
            [
              MapPin,
              "Right here in Canning Town",
              "Find us at 44 Fife Road, London E16 1QB.",
            ],
            [
              MessageCircle,
              "A direct conversation",
              "Call the salon to discuss your treatment and appointment.",
            ],
          ].map(([Icon, title, text]) => (
            <div key={title}>
              <Icon size={23} strokeWidth={1.5} />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
      <Gallery />
      <Location />
      <BookingCTA />
    </>
  );
}
