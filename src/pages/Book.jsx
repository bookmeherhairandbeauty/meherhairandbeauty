import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Phone, ArrowRight, Check, LockKeyhole } from "lucide-react";
import { PageHeading } from "../components/Shared";
import { business } from "../data/business";
import { categories, services, formatPrice } from "../data/services";
import { localDate, validateBooking } from "../lib/booking";
export default function Book() {
  const [params] = useSearchParams();
  const initial = services.find((s) => s.id === params.get("service"));
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    category: initial?.categoryId || "",
    service: initial?.id || "",
    date: "",
    time: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [review, setReview] = useState(false);
  const summary = useRef(null);
  const form = useRef(null);
  const selected = services.find((s) => s.id === data.service);
  const change = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" ? { service: "" } : {}),
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setReview(false);
  };
  const validate = () => {
    const next = validateBooking(data);
    setErrors(next);
    if (Object.keys(next).length) {
      setReview(false);
      requestAnimationFrame(() =>
        document.getElementById(Object.keys(next)[0])?.focus(),
      );
      return false;
    }
    return true;
  };
  const submit = (e) => {
    e.preventDefault();
    if (validate()) {
      setReview(true);
      requestAnimationFrame(() => summary.current?.focus());
    }
  };
  const control = (
    name,
    label,
    type = "text",
    required = false,
    extra = {},
  ) => (
    <div className="field">
      <label htmlFor={name}>
        {label}
        {required ? (
          <span aria-hidden="true"> *</span>
        ) : (
          <span className="optional"> (optional)</span>
        )}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={data[name]}
        onChange={change}
        onInput={change}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        {...extra}
      />
      {errors[name] && (
        <span id={`${name}-error`} className="field-error">
          {errors[name]}
        </span>
      )}
    </div>
  );
  const select = (name, label, children) => (
    <div className="field">
      <label htmlFor={name}>{label} *</label>
      <select
        id={name}
        name={name}
        required
        value={data[name]}
        onChange={change}
        disabled={name === "service" && !data.category}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      >
        {children}
      </select>
      {errors[name] && (
        <span id={`${name}-error`} className="field-error">
          {errors[name]}
        </span>
      )}
    </div>
  );
  return (
    <>
      <PageHeading
        eyebrow="MAKE TIME FOR YOURSELF"
        title={
          <>
            Let’s plan your
            <br />
            <em>beauty moment.</em>
          </>
        }
      >
        Plan your preferred treatment and appointment below, then call the salon
        to confirm availability. Nothing is sent or booked through this page.
      </PageHeading>
      <section className="wrap booking-layout">
        <div>
          <form
            ref={form}
            onSubmit={submit}
            noValidate
            className="booking-form"
          >
            <h2>
              <span>01</span> Your treatment
            </h2>
            <div className="form-grid">
              {select(
                "category",
                "Service category",
                <>
                  <option value="">Choose a category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </>,
              )}
              {select(
                "service",
                "Specific service",
                <>
                  <option value="">Choose a treatment</option>
                  {services
                    .filter((s) => s.categoryId === data.category)
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} — {formatPrice(s)}
                      </option>
                    ))}
                </>,
              )}
            </div>
            <h2>
              <span>02</span> Your preferred appointment
            </h2>
            <div className="form-grid">
              {control("date", "Preferred date", "date", true, {
                min: localDate(),
              })}
              {control("time", "Preferred time", "time", true)}
            </div>
            <p className="small muted">
              Please choose a preferred time in London time. This is a request,
              not a live availability calendar. Opening hours are to be
              confirmed.
            </p>
            <h2>
              <span>03</span> A few details
            </h2>
            <div className="form-grid">
              {control("name", "Full name", "text", true, {
                autoComplete: "name",
                maxLength: 100,
              })}
              {control("phone", "Mobile number", "tel", true, {
                autoComplete: "tel",
                maxLength: 30,
              })}
              {control("email", "Email", "email", false, {
                autoComplete: "email",
                maxLength: 254,
              })}
            </div>
            <div className="field">
              <label htmlFor="notes">
                Additional notes <span className="optional">(optional)</span>
              </label>
              <textarea
                id="notes"
                name="notes"
                value={data.notes}
                onChange={change}
                rows="4"
                maxLength="1000"
                placeholder="Anything you’d like us to know about your appointment?"
              />
              <span className="small muted">
                Please avoid sharing sensitive personal or medical information
                here.
              </span>
            </div>
            <p className="privacy">
              <LockKeyhole size={18} />
              <span>
                Your details stay in this page for your reference and are not
                sent to the salon. This website does not save booking details or
                use analytics. Call the salon to arrange your appointment.
              </span>
            </p>
            <button className="button button-primary" type="submit">
              Review Appointment Details <ArrowRight size={18} />
            </button>
            <p className="small muted">* Required fields</p>
          </form>
          {review && (
            <section
              className="booking-summary"
              ref={summary}
              tabIndex="-1"
              aria-labelledby="review-heading"
            >
              <p className="eyebrow">ONE LAST LOOK</p>
              <h2 id="review-heading">Your appointment details</h2>
              <dl>
                {[
                  ["Name", data.name],
                  ["Phone", data.phone],
                  ["Email", data.email || "Not provided"],
                  ["Treatment", `${selected.categoryName} — ${selected.name}`],
                  ["Menu price", formatPrice(selected)],
                  ["Preferred date", data.date.split("-").reverse().join("/")],
                  ["Preferred time", `${data.time} (London time)`],
                  ["Notes", data.notes || "None"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <p>
                <strong>
                  Your appointment is not confirmed until you arrange it with
                  the salon.
                </strong>{" "}
                Call the salon and discuss the details above. No information is
                sent automatically.
              </p>
              <a className="button button-primary" href={business.phoneHref}>
                <Phone size={18} /> Call to Book
              </a>
              <button
                type="button"
                className="text-link edit-button"
                onClick={() => {
                  setReview(false);
                  form.current.querySelector("select").focus();
                }}
              >
                Edit details
              </button>
            </section>
          )}
        </div>
        <aside className="booking-aside">
          <div className="aside-icon">
            <Sparkle />
          </div>
          <h2>
            A simple start
            <br />
            to your next visit.
          </h2>
          <ol>
            <li>
              <span>1</span>
              <div>
                <strong>Choose your treatment</strong>
                <p>Browse the menu and pick your preferred date and time.</p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <strong>Call the salon</strong>
                <p>
                  Call us to discuss your treatment and preferred appointment.
                </p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <strong>Confirm your visit</strong>
                <p>
                  The salon will confirm availability and your appointment
                  directly.
                </p>
              </div>
            </li>
          </ol>
          <div className="aside-contact">
            <p>Prefer to talk it through?</p>
            <a href={business.phoneHref}>
              <Phone size={18} />
              {business.phone}
            </a>
          </div>
        </aside>
      </section>
    </>
  );
}
function Sparkle() {
  return <Check size={26} strokeWidth={1.3} />;
}
