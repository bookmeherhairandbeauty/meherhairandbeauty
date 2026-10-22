# Verification report

## Passed

- `npm install` completed. Installation reported zero dependency vulnerabilities.
- `npm run build`: client bundle and build-time homepage prerender completed successfully.
- A separate project-path build with `/meher-hair-beauty/` checked prefixed local assets, visible prerendered homepage HTML, BeautySalon structured data, canonical URL, Open Graph URL/image and generated sitemap. Used a reserved test domain only for that check; the final delivered build was rebuilt without a domain, so no test canonical remains.
- Browser checks on the local site: all five pages; service search; Body Waxing category filter; booking links preselecting Keratin Treatment and Full Arms; hash-route refresh preserving the selected treatment.
- Desktop preview inspected at 1280 × 900; homepage inspected at 390 × 844 and 320 × 740; mobile Contact, treatment list, category menu and booking layout inspected at 390px.
- A decorative orbit causing 4px mobile overflow was corrected. Measured page width equals viewport width for homepage at 320/390px, and Services/Book at 390px.
- Mobile menu opens, navigates and closes. Visible keyboard focus styles, skip link, labelled fields, field errors and iframe title are present. Reduced-motion CSS is included. This is a basic accessibility check, not a full assistive-technology audit.
- Local image paths exist in the built output; logo rendered in the browser. Supplied flyer images are local and lazy-loaded.
- No application console errors reported in the final testing tab.
- Source formatted with Prettier; npm lockfile included. Locally bundled fonts include licence files under `public/licenses` (and the built output).

## Live checks still needed

- GitHub Actions execution and the live GitHub Pages deployment require the owner's repository. The workflow has been reviewed but has not run on GitHub.
- Social accounts could not be independently verified because automated platform access was blocked. Owner should open the supplied handle links.
- Address-based map rendering was checked; owner should confirm the physical pin/storefront location.
- Current prices, opening hours, story, photographs and any treatment policies need the confirmations in `LAUNCH-CHECKLIST.md`.

The final `dist` is a root-path local build. The supplied workflow rebuilds for the actual repository path and live domain. Hash routes use the homepage as their search landing page; they are not advertised as separate indexed SEO pages.

## Current appointment flow

The planning form keeps details on the page and directs visitors to call the salon. No online submission or messaging integration remains. The existing service selection and date/contact validation are retained.
