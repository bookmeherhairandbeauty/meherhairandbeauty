import { useSearchParams, Link } from "react-router-dom";
import { Search, ArrowUpRight } from "lucide-react";
import { categories, formatPrice } from "../data/services";
import { PageHeading, BookingCTA, icons } from "../components/Shared";
export default function Services() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "all";
  const query = params.get("q") || "";
  const update = (key, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next, { replace: true });
  };
  const filtered = categories
    .filter((c) => category === "all" || c.id === category)
    .map((c) => ({
      ...c,
      services: c.services.filter((s) =>
        `${s.name} ${c.name}`.toLowerCase().includes(query.toLowerCase()),
      ),
    }))
    .filter((c) => c.services.length);
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
              <option value="all">All treatments</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="filter-chips" aria-label="Treatment categories">
          {[{ id: "all", name: "All treatments" }, ...categories].map((c) => (
            <button
              key={c.id}
              aria-pressed={category === c.id}
              onClick={() => update("category", c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
        <p className="small muted" role="status">
          {filtered.reduce((n, c) => n + c.services.length, 0)} treatments · GBP
          · “From” prices vary; confirm your final price with the salon.
        </p>
        <div className="price-grid">
          {filtered.map((c) => {
            const Icon = icons[c.id];
            return (
              <article className="price-card" key={c.id}>
                <div className="price-card-heading">
                  <Icon size={25} strokeWidth={1.3} />
                  <h2>{c.name}</h2>
                </div>
                <p className="muted small">{c.description}</p>
                <ul>
                  {c.services.map((s) => (
                    <li key={s.id}>
                      <div>
                        <span>{s.name}</span>
                        {s.note && <small>{s.note}</small>}
                      </div>
                      <Link
                        to={`/book?service=${s.id}`}
                        aria-label={`Request ${c.name}: ${s.name}, ${formatPrice(s)}`}
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
