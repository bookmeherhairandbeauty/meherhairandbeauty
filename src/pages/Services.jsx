import { useSearchParams, Link } from "react-router-dom";
import { Search, ArrowUpRight } from "lucide-react";
import { categories, formatPrice } from "../data/services";
import { PageHeading, BookingCTA, icons } from "../components/Shared";

const filterOptions = [
  { id: "all", name: "All Treatments" },
  { id: "threading", name: "Threading" },
  { id: "tinting", name: "Tinting & Lamination" },
  { id: "halal-eyebrows", name: "Halal Eyebrows" },
  { id: "lashes", name: "Eyelash Extensions" },
  { id: "waxing", name: "Body Waxing" },
  { id: "haircuts", name: "Haircuts" },
  { id: "colour", name: "Hair Colour" },
  { id: "makeup", name: "Makeup" },
];

export default function Services() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "all";
  const query = params.get("q") || "";

  // Keep existing direct links to categories such as Facials working.
  const linkedCategory = categories.find(
    (c) =>
      c.id === category &&
      !filterOptions.some((option) => option.id === c.id),
  );

  const update = (key, value) => {
    const next = new URLSearchParams(params);

    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }

    // Clear an old search when switching categories.
    if (key === "category") {
      next.delete("q");
    }

    setParams(next, { replace: true });
  };

  const filtered = categories
    .filter(
      (c) =>
        category === "all" ||
        category === "halal-eyebrows" ||
        c.id === category,
    )
    .map((c) => ({
      ...c,
      services: c.services.filter((s) => {
        const matchesCategory =
          category !== "halal-eyebrows" ||
          s.name.trim().toLowerCase() === "halal eyebrows";

        const matchesSearch = `${s.name} ${c.name}`
          .toLowerCase()
          .includes(query.trim().toLowerCase());

        return matchesCategory && matchesSearch;
      }),
    }))
    .filter((c) => c.services.length);

  const treatmentCount = filtered.reduce(
    (total, c) => total + c.services.length,
    0,
  );

  return (
    <>
      <PageHeading
        eyebrow="THE TREATMENT MENU"
        title={
          <>
            Find your kind
            <br />
            of <em>beautiful.</em>
          </>
        }
      >
        Hair, beauty and skincare, with prices from our salon menu. Choose a
        treatment to start your appointment request.
      </PageHeading>

      <section className="wrap services-section">
        <div className="filter-bar">
          <label className="search-field">
            <Search size={18} />
            <span className="sr-only">Search treatments</span>
            <input
              type="search"
              value={query}
              onChange={(e) => update("q", e.target.value)}
              placeholder="Find a treatment…"
            />
          </label>

          <label className="category-select">
            <span className="sr-only">Filter by category</span>
            <select
              value={category}
              onChange={(e) => update("category", e.target.value)}
            >
              {filterOptions.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}

              {linkedCategory && (
                <option value={linkedCategory.id}>
                  {linkedCategory.name}
                </option>
              )}
            </select>
          </label>
        </div>

        <div className="filter-chips" aria-label="Treatment categories">
          {filterOptions.map((c) => (
            <button
              type="button"
              key={c.id}
              aria-pressed={category === c.id}
              onClick={() => update("category", c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>

        <p className="small muted" role="status">
          {treatmentCount}{" "}
          {treatmentCount === 1 ? "treatment" : "treatments"} · GBP · “From”
          prices vary; confirm your final price with the salon.
        </p>

        <div className="price-grid">
          {filtered.map((c) => {
            const Icon = icons[c.id];
            const heading =
              category === "halal-eyebrows" ? "Halal Eyebrows" : c.name;

            return (
              <article className="price-card" key={c.id}>
                <div className="price-card-heading">
                  {Icon && <Icon size={25} strokeWidth={1.3} />}
                  <h2>{heading}</h2>
                </div>

                {category !== "halal-eyebrows" && (
                  <p className="muted small">{c.description}</p>
                )}

                <ul>
                  {c.services.map((s) => (
                    <li key={s.id}>
                      <div>
                        <span>{s.name}</span>
                        {s.note && <small>{s.note}</small>}
                      </div>

                      <Link
                        to={`/book?service=${s.id}`}
                        aria-label={`Request ${heading}: ${s.name}, ${formatPrice(s)}`}
                      >
                        <strong>{formatPrice(s)}</strong>
                        <ArrowUpRight size={15} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {!filtered.length && (
          <div className="empty-state">
            <h2>No matching treatments</h2>
            <p>Try a different search or category.</p>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => setParams({})}
            >
              Reset filters
            </button>
          </div>
        )}

        <p className="price-note">
          Prices transcribed from the supplied salon menus. Please confirm
          current prices and any treatment requirements when booking.
        </p>
      </section>

      <BookingCTA />
    </>
  );
}
