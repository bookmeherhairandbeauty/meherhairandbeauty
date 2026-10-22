# Meher Hair & Beauty

A responsive React + Vite website for Meher Hair & Beauty, Canning Town. Includes Home, About, Services & Prices, Book Appointment and Contact; 53 treatments from the supplied menus; an appointment planning form with telephone booking; local logo/menu images and local fonts. No database, paid API, authentication or analytics.

## Run locally

Install Node.js 22.12 or newer (Node 22 LTS recommended), then open a terminal in this folder:

```sh
npm install
npm run dev
```

Open the Local URL printed by Vite. To check the production build:

```sh
npm test
npm run build
npm run preview
```

After the first installation, `npm ci` installs the exact versions in `package-lock.json`. Do not upload `node_modules` or `.prerender`. The ZIP includes source, the lockfile, deployment workflow and a built `dist` for inspection; GitHub Actions rebuilds it.

## Upload to GitHub and deploy free with GitHub Pages

1. Create a **public**, empty GitHub repository (for example, `meher-hair-beauty`) with a `main` branch. Do not initialise it with a separate README if using the commands below. GitHub Pages on public repositories can use the free plan.
2. Upload **the contents of this folder**, including `.github/workflows/deploy.yml`, `package-lock.json` and `.gitignore`. Using Git is the most reliable way to include hidden folders. Never upload `node_modules`.
3. In the repository, select **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Push to `main`, or open **Actions → Deploy to GitHub Pages → Run workflow**.
5. Wait for a successful workflow and use the URL shown in the deployment. It normally looks like `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

For a newly downloaded folder that is not already a Git repository:

```sh
git init -b main
git add .
git commit -m "Build Meher Hair and Beauty website"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace both placeholders. For an existing repository, skip `git init` and inspect its remote before adding one. The workflow deploys on `main`; adjust its branch setting if your default branch differs.

### Project repository paths and refreshes

`HashRouter` gives routes such as `/#/about` and `/#/book`. On a project repository these become `/YOUR-REPOSITORY/#/about`. Page refreshes request the root HTML and work without a server rewrite or custom 404 workaround.

`vite.config.js` reads `BASE_PATH`, defaulting to `/` for local development. The Actions workflow obtains `base_path` and `base_url` from `actions/configure-pages`, so repository names do not need to be hardcoded. For a manual project-repository build:

```sh
BASE_PATH=/YOUR-REPOSITORY/ SITE_URL=https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/ npm run build
```

On Windows PowerShell, set `$env:BASE_PATH` and `$env:SITE_URL` before running `npm run build`.

## Custom domain later

1. Configure the custom domain in **Settings → Pages → Custom domain**. Verify ownership and configure your DNS records according to GitHub's current documentation (linked below).
2. For a subdomain such as `www`, set the DNS CNAME to `YOUR-USERNAME.github.io` (no repository path). For an apex domain, follow GitHub's documented A/AAAA or ALIAS/ANAME records.
3. Enable **Enforce HTTPS** once GitHub has provisioned the certificate.
4. Run the workflow again. `configure-pages` supplies the new domain and root path. Check the build's canonical URL, sitemap and image URLs.
5. For a manual custom-domain build, use `BASE_PATH=/` and `SITE_URL=https://YOUR-DOMAIN/`.

This Actions deployment does not require a source `CNAME` file; manage the domain through repository settings. Do not retain an old repository base path on a custom-domain build.

## Updating the website

- **Prices and service names:** `src/data/services.js`. Each service has a numeric price, `from` flag, optional menu note, and category. Search, filters, prices and booking dropdowns share this file. Keep IDs stable when changing the catalogue; they are used in service booking links.
- **Contact details, opening hours, story and social profiles:** `src/data/business.js`. Some footer/SEO text also includes verified address details; update these consistently if the business moves.
- **Copy/layout:** `src/pages/` and `src/components/`.
- **Colours/responsiveness:** `src/index.css` (Tailwind v4 Vite integration; no v3 configuration).
- **Images:** `public/images/`. The supplied flyer photographs are identified as treatment menus, not photographs of salon work. Add approved salon photographs to the Gallery component when available.
- **Search metadata:** `index.html`, `src/components/Layout.jsx`, and `scripts/prerender.mjs`.

Run `npm test` and `npm run build`, review on desktop and mobile, then commit and push. Actions publishes the update. If changing dependencies, run `npm install` and commit the updated lockfile.

## Booking behaviour and privacy

Customers can select a treatment and preferred date/time and review their details, then use **Call to Book** to contact the salon. The form is a planning aid only: nothing is submitted, stored, reserved or confirmed online. Details remain in page memory and clear on reload. The salon confirms appointments by phone.

The embedded Google Map loads third-party content; social links open their respective services. No analytics or tracking scripts are installed.

## SEO and static hosting

The build prerenders the homepage to readable HTML, with a real title, description, Open Graph text, visible local business content and `BeautySalon` JSON-LD. Only supplied business facts appear in structured data; no invented opening hours, reviews or ratings.

Hash routes are **not independent crawlable pages**. Their document titles/descriptions update for visitors, but social crawlers normally use the root HTML. The homepage is the canonical search landing page. The sitemap intentionally includes only that URL, not fragment routes. This approach does not claim separate per-page SEO for hash routes. If independent indexed service pages become a priority, migrate to a fully prerendered multipage/static-site architecture.

When `SITE_URL` is set, the build writes an absolute canonical URL, `og:url`, `og:image`, `dist/sitemap.xml`, and a sitemap reference in `dist/robots.txt`. Without a confirmed URL these are intentionally omitted rather than publishing fabricated domain placeholders. GitHub Actions supplies the live URL automatically. Local fonts avoid external font requests.

## Google Business Profile

After the site is live, sign into the Google account managing the salon's verified Business Profile. Open the profile → **Edit profile** → website/contact details, enter the full HTTPS homepage URL, and save. Check that the address and phone match the site. If your profile supports an appointment link, use the live site's `/#/book` URL. Confirm it opens correctly from a phone. Submit the root sitemap in Google Search Console if desired; add only confirmed hours and authentic photographs to the Business Profile.

## Project layout

```text
.github/workflows/deploy.yml  GitHub Pages deployment
public/images/               Original supplied local assets
public/robots.txt            Baseline crawler instructions
scripts/prerender.mjs         Static HTML, schema and deployment SEO
src/components/              Navigation, footer and shared sections
src/data/                    Business information and service catalogue
src/lib/booking.js            Appointment planning validation
src/pages/                   Five complete pages
src/App.jsx                  Route definitions
src/main.jsx                 HashRouter and client entry
src/prerender.jsx             Server rendering entry (build-time only)
src/index.css                Responsive styles and Tailwind v4
index.html                   Static head metadata and HTML template
vite.config.js               Vite / React / Tailwind and base path
package.json                 Scripts and dependencies
package-lock.json            Reproducible dependency versions
LAUNCH-CHECKLIST.md           Items for the salon owner to confirm
QA.md                        Verification results and remaining live checks
```

## Reference documentation

- [Vite: GitHub Pages deployment and base paths](https://vite.dev/guide/static-deploy.html#github-pages)
- [Tailwind CSS: Vite integration](https://tailwindcss.com/docs/installation/using-vite)
- [GitHub: configuring a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Google: edit your Business Profile and website](https://support.google.com/business/answer/3039617)

See `LAUNCH-CHECKLIST.md` before publishing.
