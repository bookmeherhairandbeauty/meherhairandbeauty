import { Phone, Mail, Instagram, ArrowUpRight, Clock } from "lucide-react";
import { PageHeading, Location, Button } from "../components/Shared";
import { business, mapsSearch } from "../data/business";
export default function Contact() {
  return (
    <>
      <PageHeading
        eyebrow="WE’D LOVE TO HEAR FROM YOU"
        title={
          <>
            Let’s talk <em>beauty.</em>
          </>
        }
      >
        Questions about a treatment or planning your next visit? Get in touch
        with Meher Hair & Beauty.
      </PageHeading>
      <section className="wrap contact-cards contact-cards-two">
        {[
          [Phone, "Give us a call", business.phone, business.phoneHref],
          [
            Mail,
            "Drop us an email",
            business.email,
            `mailto:${business.email}`,
          ],
        ].map(([Icon, title, label, href]) => (
          <a className="contact-card" href={href} key={title}>
            <Icon size={26} strokeWidth={1.3} />
            <h2>{title}</h2>
            <span>
              {label}
              <ArrowUpRight size={16} />
            </span>
          </a>
        ))}
      </section>
      <Location />
      <section className="wrap contact-bottom">
        <div>
          <Clock size={25} />
          <h2>Opening hours</h2>
          <p>{business.openingHours}</p>
          <a
            className="text-link"
            href={mapsSearch}
            target="_blank"
            rel="noreferrer"
          >
            View our address on Google Maps <ArrowUpRight size={16} />
          </a>
        </div>
        <div>
          <Instagram size={25} />
          <h2>Find us on social</h2>
          <p>@meherhairandbeauty</p>
          <div className="button-row">
            <Button
              href={business.instagram}
              secondary
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </Button>
            <Button
              href={business.tiktok}
              secondary
              target="_blank"
              rel="noreferrer"
            >
              TikTok
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
