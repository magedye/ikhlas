const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
const allSectionLinks = document.querySelectorAll('a[href^="#"]');
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const yearNode = document.getElementById("current-year");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });
}

allSectionLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId.length < 2) {
      return;
    }

    const target = document.querySelector(targetId);
    if (!target) {
      return;
    }

    event.preventDefault();

    const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight + 2;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });

    if (mobileNav?.classList.contains("open")) {
      mobileNav.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      if (menuToggle) {
        menuToggle.textContent = "☰";
      }
    }
  });
});

const sections = ["home", "products", "about", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

if (sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const id = entry.target.getAttribute("id");
        if (!id) {
          return;
        }

        document.querySelectorAll(".nav-link, .mobile-link").forEach((node) => {
          node.classList.toggle("active", node.getAttribute("href") === `#${id}`);
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0.01,
    }
  );

  sections.forEach((section) => observer.observe(section));
}

if (form && formStatus) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    formStatus.hidden = false;
    form.reset();

    window.setTimeout(() => {
      formStatus.hidden = true;
    }, 5000);
  });
}
