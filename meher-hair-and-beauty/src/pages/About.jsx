import {
  Button,
  PageHeading,
  Eyebrow,
  Gallery,
  BookingCTA,
} from "../components/Shared";
import { business, imagePath } from "../data/business";
export default function About() {
  return (
    <>
      <PageHeading
        eyebrow="OUR SALON"
        title={
          <>
            Beauty begins with
            <br />
            <em>a moment for yourself.</em>
          </>
        }
      >
        Welcome to Meher Hair & Beauty, your hair and beauty destination in
        Canning Town, East London.
      </PageHeading>
      <section className="wrap section about-grid">
        <div className="about-logo">
          <img
            src={imagePath("meher-logo.jpeg")}
            alt="Meher Hair & Beauty salon logo"
            width="1254"
            height="1254"
          />
        </div>
        <div>
          <Eyebrow>HAIR, BEAUTY & YOU</Eyebrow>
          <h2>
            A place for your
            <br />
            <em>beauty routine.</em>
          </h2>
          <p>
            At 44 Fife Road, our treatment menu brings together haircuts, hair
            colour, hair treatments, threading, waxing, brows, lashes, facials
            and makeup.
          </p>
          <p>
            Whether it’s an everyday refresh or preparation for a special
            occasion, we want your visit to begin with a clear conversation
            about what you’re looking for. Contact us to discuss your chosen
            treatment and preferred appointment.
          </p>
          <Button to="/services" secondary>
            Explore Our Treatments
          </Button>
          <div className="editorial-note">
            <span>OUR STORY · COMING SOON</span>
            <p>{business.story}</p>
          </div>
        </div>
      </section>
      <Gallery />
      <BookingCTA />
    </>
  );
}
