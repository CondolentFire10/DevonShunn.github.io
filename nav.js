// ============================================================
//  nav.js — Single source of truth for navigation & favicon
//
//  HOW TO ADD THIS TO ANY PAGE:
//  1. Add this ONE line anywhere inside <head>:
//       <script src="nav.js"></script>
//     (if the page is in a subfolder, use the path back to root e.g. "../nav.js")
//  2. Delete the entire <header>...</header> block from that page.
//  3. Delete the nav CSS block (everything between "── NAV ──" comments).
//  That's it. The script handles everything else automatically.
//
//  HOW TO ADD A PROJECT TO THE DROPDOWN:
//  Just add a new line to the `links` array below, e.g.:
//    { label: "Rocket Build", href: "project-rocket.html" },
//
//  HOW TO ADD A TOP-LEVEL NAV LINK (next to "Contact Me"):
//  Add a new line to the `topLinks` array below.
//
//  FAVICON: automatically injected on every page that loads this file.
//  Change `faviconSrc` below to update it everywhere at once.
// ============================================================

const NAV_CONFIG = {

  faviconSrc: "DSfavicon.png",

  logoSrc:  "signature.png",
  logoAlt:  "Devon Shunn",
  logoHref: "index.html",

  // ── Top-level links (right side of nav, NOT in dropdown) ──
  topLinks: [
    { label: "Contact Me", href: "contact.html" },
  ],

  // ── Projects dropdown ──
  dropdown: {
    label: "Projects",
    href:  "projects.html",
    links: [
      { label: "Lightsaber",         href: "project-lightsaber.html"  },
      { label: "DeLorean Animation", href: "project-delorean.html"    },
      { label: "3D Printing",        href: "project-3dprinting.html"  },
      { label: "BD-1 Droid",         href: "project-bd1.html"         },
      { label: "iOS Widgets",        href: "project-ios-widgets.html" },
      { label: "Game",               href: "project-game.html"        },
      { label: "LED Systems",        href: "project-led.html"         },
      { label: "Horizon Worlds",     href: "project-horizon.html"     },
    ]
  }

};

// ============================================================
//  Engine — builds and injects everything automatically.
//  No need to edit anything below this line.
// ============================================================

(function () {

  // ── Inject favicon ──────────────────────────────────────
  const favicon = document.createElement("link");
  favicon.rel  = "icon";
  favicon.type = "image/png";
  favicon.href = NAV_CONFIG.faviconSrc;
  document.head.appendChild(favicon);

  // ── Inject nav CSS ──────────────────────────────────────
  // Injected once here so you never need it in any page's <style> block.
  const style = document.createElement("style");
  style.textContent = `
    header {
      position: fixed; top: 0; width: 100%;
      backdrop-filter: blur(14px);
      background: rgba(7,10,18,0.75);
      border-bottom: 1px solid rgba(255,255,255,0.12);
      z-index: 200;
    }
    nav {
      max-width: 1100px; margin: auto;
      display: flex; justify-content: space-between; align-items: center;
      padding: 14px 24px;
    }
    nav ul { display: flex; gap: 26px; list-style: none; align-items: center; }
    .nav-link { color: rgba(255,255,255,0.7); text-decoration: none; transition: 0.2s; }
    .nav-link:hover { color: #38bdf8; }
    .logo img { height: 42px; cursor: pointer; transition: 0.25s; }
    .logo img:hover {
      transform: scale(1.05);
      filter: drop-shadow(0 0 12px rgba(56,189,248,0.6));
    }
    .nav-item { position: relative; }
    .dropdown {
      position: absolute; top: 100%; left: 0; padding-top: 12px;
      min-width: 200px; background: transparent;
      display: flex; flex-direction: column;
      opacity: 0; transform: translateY(6px);
      pointer-events: none; transition: 0.25s;
    }
    .dropdown-inner {
      background: rgba(7,10,18,0.9);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 12px;
      display: flex; flex-direction: column;
      overflow: hidden; backdrop-filter: blur(14px);
    }
    .dropdown a {
      padding: 10px 14px; text-decoration: none;
      color: rgba(255,255,255,0.7); font-size: 14px; transition: 0.2s;
    }
    .dropdown a:hover { background: rgba(56,189,248,0.12); color: #38bdf8; }
    .nav-item:hover .dropdown { opacity: 1; transform: translateY(0); pointer-events: auto; }
  `;
  document.head.appendChild(style);

  // ── Build nav HTML ──────────────────────────────────────
  const dropdownLinks = NAV_CONFIG.dropdown.links
    .map(l => `<a href="${l.href}">${l.label}</a>`)
    .join("\n            ");

  const topLinks = NAV_CONFIG.topLinks
    .map(l => `<li><a href="${l.href}" class="nav-link">${l.label}</a></li>`)
    .join("\n      ");

  const navHTML = `
<header>
  <nav>
    <a href="${NAV_CONFIG.logoHref}" class="logo">
      <img src="${NAV_CONFIG.logoSrc}" alt="${NAV_CONFIG.logoAlt}">
    </a>
    <ul>
      <li class="nav-item">
        <a href="${NAV_CONFIG.dropdown.href}" class="nav-link">${NAV_CONFIG.dropdown.label}</a>
        <div class="dropdown">
          <div class="dropdown-inner">
            ${dropdownLinks}
          </div>
        </div>
      </li>
      ${topLinks}
    </ul>
  </nav>
</header>`;

  // ── Inject header into page ─────────────────────────────
  document.body.insertAdjacentHTML("afterbegin", navHTML);

})();
