// ============================================================
//  nav.js — Navigation (Projects + Experience dropdowns)
// ============================================================

const NAV_CONFIG = {

  faviconSrc: "DSfavicon.png",

  logoSrc:  "signature.png",
  logoAlt:  "Devon Shunn",
  logoHref: "index.html",

  // ── Top-level links ──
  topLinks: [
    { label: "Contact Me", href: "contact.html" },
  ],

  // ── Projects dropdown ──
  projects: {
    label: "Projects",
    href: "projects.html",
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
  },

  // ── Experience dropdown ──
  experience: {
    label: "Experience",
    href: "experience.html",
    links: [
      { label: "ISS Physics Program", href: "experience-iss.html" }
    ]
  }

};

// ============================================================
//  Engine
// ============================================================

(function () {

  // ── Favicon ─────────────────────────────────────────────
  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.type = "image/png";
  favicon.href = NAV_CONFIG.faviconSrc;
  document.head.appendChild(favicon);

  // ── Styles ──────────────────────────────────────────────
  const style = document.createElement("style");
  style.textContent = `
    header {
      position: fixed;
      top: 0;
      width: 100%;
      backdrop-filter: blur(14px);
      background: rgba(7,10,18,0.75);
      border-bottom: 1px solid rgba(255,255,255,0.12);
      z-index: 200;
    }

    nav {
      max-width: 1100px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 24px;
    }

    nav ul {
      display: flex;
      gap: 26px;
      list-style: none;
      align-items: center;
    }

    .nav-link {
      color: rgba(255,255,255,0.7);
      text-decoration: none;
      transition: 0.2s;
    }

    .nav-link:hover {
      color: #38bdf8;
    }

    .logo img {
      height: 42px;
      cursor: pointer;
      transition: 0.25s;
    }

    .logo img:hover {
      transform: scale(1.05);
      filter: drop-shadow(0 0 12px rgba(56,189,248,0.6));
    }

    .nav-item {
      position: relative;
    }

    /* ── Dropdown ── */
    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      padding-top: 12px;
      min-width: 220px;
      opacity: 0;
      transform: translateY(6px);
      pointer-events: none;
      transition: 0.25s;
    }

    .dropdown-inner {
      background: rgba(7,10,18,0.9);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 12px;
      backdrop-filter: blur(14px);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .dropdown a {
      display: block;
      padding: 10px 14px;
      text-decoration: none;
      color: rgba(255,255,255,0.7);
      font-size: 14px;
      transition: 0.2s;
    }

    .dropdown a:hover {
      background: rgba(56,189,248,0.12);
      color: #38bdf8;
    }

    .nav-item:hover .dropdown {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
  `;
  document.head.appendChild(style);

  // ── Dropdown builder ────────────────────────────────────
  function buildDropdown(section) {
    return `
      <div class="nav-item">
        <a href="${section.href}" class="nav-link">${section.label}</a>
        <div class="dropdown">
          <div class="dropdown-inner">
            ${section.links
              .map(l => `<a href="${l.href}">${l.label}</a>`)
              .join("\n")}
          </div>
        </div>
      </div>
    `;
  }

  // ── Top links ───────────────────────────────────────────
  const topLinks = NAV_CONFIG.topLinks
    .map(l => `<li><a href="${l.href}" class="nav-link">${l.label}</a></li>`)
    .join("\n");

  // ── HTML ────────────────────────────────────────────────
  const navHTML = `
<header>
  <nav>
    <a href="${NAV_CONFIG.logoHref}" class="logo">
      <img src="${NAV_CONFIG.logoSrc}" alt="${NAV_CONFIG.logoAlt}">
    </a>

    <ul>
      ${buildDropdown(NAV_CONFIG.projects)}
      ${buildDropdown(NAV_CONFIG.experience)}
      ${topLinks}
    </ul>
  </nav>
</header>
`;

  // ── Inject ──────────────────────────────────────────────
  function inject() {
    document.body.insertAdjacentHTML("afterbegin", navHTML);
  }

  if (document.body) inject();
  else document.addEventListener("DOMContentLoaded", inject);

})();
