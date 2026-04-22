const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
const allSectionLinks = document.querySelectorAll('a[href^="#"]');
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const languageSelect = document.getElementById("language-select");
const metaDescription = document.querySelector('meta[name="description"]');
const footerCopyright = document.querySelector(".footer-bottom p");
const siteHeader = document.querySelector(".site-header");
let cachedHeaderHeight = 0;

const languageMeta = {
  en: {
    lang: "en",
    dir: "ltr",
    title: "Ard Al Ekhlas Foodstuff",
    description:
      "A Yemeni company specialized in importing, supplying, and distributing food products wholesale.",
  },
  ar: {
    lang: "ar",
    dir: "rtl",
    title: "أرض الإخلاص للمواد الغذائية",
    description:
      "شركة يمنية متخصصة في استيراد وتوريد وتوزيع المواد الغذائية بالجملة",
  },
};

const menuToggleLabels = {
  en: {
    open: "Open menu",
    close: "Close menu",
  },
  ar: {
    open: "فتح القائمة",
    close: "إغلاق القائمة",
  },
};

const textTranslations = [
  {
    selector: ".language-switcher .sr-only",
    en: "Select language",
    ar: "اختر اللغة",
  },
  { selector: ".brand-copy strong", en: "Ard Al Ekhlas", ar: "أرض الإخلاص" },
  { selector: ".brand-copy small", en: "Foodstuff", ar: "للمواد الغذائية" },
  { selector: '.main-nav .nav-link[href="#home"]', en: "Home", ar: "الرئيسية" },
  { selector: '.main-nav .nav-link[href="#products"]', en: "Products", ar: "المنتجات" },
  { selector: '.main-nav .nav-link[href="#about"]', en: "About", ar: "من نحن" },
  { selector: '.main-nav .nav-link[href="#contact"]', en: "Contact", ar: "اتصل بنا" },
  { selector: ".desktop-cta", en: "Contact Us", ar: "تواصل معنا" },
  { selector: "#mobile-nav .mobile-link:nth-of-type(1)", en: "Home", ar: "الرئيسية" },
  {
    selector: "#mobile-nav .mobile-link:nth-of-type(2)",
    en: "Products",
    ar: "المنتجات",
  },
  { selector: "#mobile-nav .mobile-link:nth-of-type(3)", en: "About", ar: "من نحن" },
  { selector: "#mobile-nav .mobile-link:nth-of-type(4)", en: "Contact", ar: "اتصل بنا" },
  {
    selector: "#mobile-nav .mobile-link:nth-of-type(5)",
    en: "Contact Us",
    ar: "تواصل معنا",
  },
  { selector: ".hero h1", en: "Ard Al Ekhlas Foodstuff", ar: "أرض الإخلاص للمواد الغذائية" },
  {
    selector: ".hero p",
    en: "A leading Yemeni company in importing and supplying food products with high quality and competitive prices.",
    ar: "شركة يمنية رائدة في استيراد وتوريد المواد الغذائية بجودة عالية وأسعار تنافسية.",
  },
  { selector: ".hero-actions .btn-primary", en: "Learn More", ar: "تعرف على المزيد" },
  { selector: ".hero-actions .btn-light", en: "View Products", ar: "عرض المنتجات" },
  { selector: "#products .section-head h2", en: "Our Core Products", ar: "منتجاتنا الأساسية" },
  {
    selector: "#products .section-head p",
    en: "We provide a wide variety of essential food products with high quality and competitive prices.",
    ar: "نوفر مجموعة متنوعة من المواد الغذائية الأساسية بجودة عالية وأسعار تنافسية.",
  },
  { selector: "#products .product-card:nth-of-type(1) h3", en: "Sugar", ar: "السكر" },
  {
    selector: "#products .product-card:nth-of-type(1) p",
    en: "Pure sugar with premium quality from top global sources.",
    ar: "سكر نقي بجودة عالية من أفضل المصادر العالمية.",
  },
  {
    selector: "#products .product-card:nth-of-type(1) li:nth-of-type(1)",
    en: "Premium quality",
    ar: "جودة عالية",
  },
  {
    selector: "#products .product-card:nth-of-type(1) li:nth-of-type(2)",
    en: "Carefully packed",
    ar: "معبأ بعناية",
  },
  {
    selector: "#products .product-card:nth-of-type(1) li:nth-of-type(3)",
    en: "Competitive prices",
    ar: "أسعار تنافسية",
  },
  { selector: "#products .product-card:nth-of-type(2) h3", en: "Flour", ar: "الدقيق" },
  {
    selector: "#products .product-card:nth-of-type(2) p",
    en: "High-quality flour for home and commercial use.",
    ar: "دقيق ممتاز للاستخدام المنزلي والتجاري.",
  },
  {
    selector: "#products .product-card:nth-of-type(2) li:nth-of-type(1)",
    en: "White flour",
    ar: "دقيق أبيض",
  },
  {
    selector: "#products .product-card:nth-of-type(2) li:nth-of-type(2)",
    en: "Brown flour",
    ar: "دقيق بني",
  },
  {
    selector: "#products .product-card:nth-of-type(2) li:nth-of-type(3)",
    en: "All-purpose flour",
    ar: "دقيق متعدد الاستخدامات",
  },
  { selector: "#products .product-card:nth-of-type(3) h3", en: "Oils", ar: "الزيوت" },
  {
    selector: "#products .product-card:nth-of-type(3) p",
    en: "Pure and healthy oils for cooking and general use.",
    ar: "زيوت نقية وصحية للطهي والاستخدام العام.",
  },
  {
    selector: "#products .product-card:nth-of-type(3) li:nth-of-type(1)",
    en: "Corn oil",
    ar: "زيت الذرة",
  },
  {
    selector: "#products .product-card:nth-of-type(3) li:nth-of-type(2)",
    en: "Sunflower oil",
    ar: "زيت عباد الشمس",
  },
  {
    selector: "#products .product-card:nth-of-type(3) li:nth-of-type(3)",
    en: "Canola oil",
    ar: "زيت الكانولا",
  },
  { selector: "#products .product-card:nth-of-type(4) h3", en: "Rice", ar: "الأرز" },
  {
    selector: "#products .product-card:nth-of-type(4) p",
    en: "Different rice varieties with excellent quality.",
    ar: "أرز بأنواع مختلفة وجودة عالية جداً.",
  },
  {
    selector: "#products .product-card:nth-of-type(4) li:nth-of-type(1)",
    en: "Basmati rice",
    ar: "أرز بسمتي",
  },
  {
    selector: "#products .product-card:nth-of-type(4) li:nth-of-type(2)",
    en: "Regular rice",
    ar: "أرز عادي",
  },
  {
    selector: "#products .product-card:nth-of-type(4) li:nth-of-type(3)",
    en: "Egyptian rice",
    ar: "أرز مصري",
  },
  { selector: "#products .product-card:nth-of-type(5) h3", en: "Legumes", ar: "البقوليات" },
  {
    selector: "#products .product-card:nth-of-type(5) p",
    en: "Fresh legumes rich in protein and fiber.",
    ar: "بقوليات طازجة غنية بالبروتين والألياف.",
  },
  {
    selector: "#products .product-card:nth-of-type(5) li:nth-of-type(1)",
    en: "Lentils",
    ar: "عدس",
  },
  {
    selector: "#products .product-card:nth-of-type(5) li:nth-of-type(2)",
    en: "Fava beans",
    ar: "فول",
  },
  {
    selector: "#products .product-card:nth-of-type(5) li:nth-of-type(3)",
    en: "Chickpeas",
    ar: "حمص",
  },
  {
    selector: "#products .product-card:nth-of-type(5) li:nth-of-type(4)",
    en: "Beans",
    ar: "فاصوليا",
  },
  {
    selector: ".special-order h3",
    en: "Special Import Orders",
    ar: "طلبات استيراد خاصة",
  },
  {
    selector: ".special-order p",
    en: "In addition to our core products, we handle special import requests based on customer and local market needs.",
    ar: "بالإضافة إلى منتجاتنا الأساسية، نقوم بتنفيذ طلبات استيراد خاصة حسب احتياجات عملائنا والسوق المحلي.",
  },
  { selector: ".special-order .btn", en: "Order Now", ar: "اطلب الآن" },
  { selector: "#about .section-head h2", en: "About Us", ar: "من نحن" },
  {
    selector: "#about .section-head p",
    en: "Learn about the story of Ard Al Ekhlas and how we became a trusted company in food imports.",
    ar: "تعرف على قصة أرض الإخلاص وكيف أصبحنا من الشركات الموثوقة في قطاع استيراد المواد الغذائية.",
  },
  { selector: ".story h3", en: "Our Story", ar: "قصتنا" },
  {
    selector: ".story p:nth-of-type(1)",
    en: "Ard Al Ekhlas Foodstuff is a Yemeni company specialized in importing, supplying, and wholesale distribution of food products. We operate with modern business practices and high quality standards, serving a wide segment of wholesalers and distributors in the local market.",
    ar: "أرض الإخلاص للمواد الغذائية شركة يمنية متخصصة في استيراد وتوريد وتوزيع المواد الغذائية بالجملة، تعمل وفق أسس تجارية حديثة ومعايير جودة عالية، وتخدم شريحة واسعة من تجار الجملة والموزعين في السوق المحلي.",
  },
  {
    selector: ".story p:nth-of-type(2)",
    en: "We are committed to building long-term strategic partnerships with trusted international suppliers to ensure high-quality products at competitive prices.",
    ar: "نحرص على بناء شراكات استراتيجية طويلة الأمد مع موردين دوليين موثوقين، لضمان توفير منتجات غذائية ذات جودة عالية وأسعار تنافسية.",
  },
  { selector: ".identity-card h4", en: "Ard Al Ekhlas", ar: "أرض الإخلاص" },
  { selector: ".identity-card p", en: "Foodstuff", ar: "للمواد الغذائية" },
  { selector: ".vision-card:nth-of-type(1) h3", en: "Our Vision", ar: "رؤيتنا" },
  {
    selector: ".vision-card:nth-of-type(1) p",
    en: "To be one of the leading companies in food import and trade in Yemen and become a trusted strategic partner.",
    ar: "أن نكون من الشركات الرائدة في قطاع استيراد وتجارة المواد الغذائية في اليمن، وأن نصبح شريكًا استراتيجيًا موثوقًا.",
  },
  { selector: ".vision-card:nth-of-type(2) h3", en: "Our Mission", ar: "رسالتنا" },
  {
    selector: ".vision-card:nth-of-type(2) p",
    en: "Providing essential food products with high quality and competitive prices through an efficient supply system and strong international partnerships.",
    ar: "توفير مواد غذائية أساسية بجودة عالية وأسعار تنافسية عبر منظومة توريد فعالة وشراكات دولية قوية.",
  },
  { selector: "#contact .section-head h2", en: "Contact Us", ar: "اتصل بنا" },
  {
    selector: "#contact .section-head p",
    en: "We are here to answer your questions and support your business needs.",
    ar: "نحن هنا للإجابة على استفساراتك ومساعدتك في أي احتياجات تجارية.",
  },
  {
    selector: ".contact-info > h3",
    en: "Contact Information",
    ar: "معلومات التواصل",
  },
  { selector: ".contact-info .info-item:nth-of-type(1) h4", en: "Address", ar: "العنوان" },
  {
    selector: ".contact-info .info-item:nth-of-type(1) p:nth-of-type(1)",
    en: "Taiz - Al Hawban - Dares Market",
    ar: "تعز - الحوبان - سوق دارس",
  },
  {
    selector: ".contact-info .info-item:nth-of-type(1) p:nth-of-type(2)",
    en: "Opposite Grand Taiz Hotel - Yemen",
    ar: "مقابل فندق جراند تعز - اليمن",
  },
  { selector: ".contact-info .info-item:nth-of-type(2) h4", en: "Phone", ar: "الهاتف" },
  {
    selector: ".contact-info .info-item:nth-of-type(3) h4",
    en: "Email",
    ar: "البريد الإلكتروني",
  },
  {
    selector: ".contact-extension h4",
    en: "Additional Contact Channels",
    ar: "قنوات تواصل إضافية",
  },
  {
    selector: ".contact-extension > p",
    en: "For urgent orders and quick inquiries, you can contact us directly through the following channels:",
    ar: "للطلبات العاجلة والاستفسارات السريعة، يمكنك التواصل مباشرة عبر القنوات التالية:",
  },
  {
    selector: ".contact-quick-links li:nth-of-type(1) a",
    en: "Direct Call: +967 784773775",
    ar: "اتصال مباشر: +967 784773775",
  },
  {
    selector: ".contact-quick-links li:nth-of-type(2) a",
    en: "Sales WhatsApp",
    ar: "واتساب المبيعات",
  },
  {
    selector: ".contact-quick-links li:nth-of-type(3) a",
    en: "Official Email: info@ardikhlas.com",
    ar: "البريد الرسمي: info@ardikhlas.com",
  },
  {
    selector: ".contact-form-area > h3",
    en: "Send Us a Message",
    ar: "أرسل لنا رسالة",
  },
  {
    selector: "#form-status",
    en: "Thank you! Your message has been received successfully. We will contact you soon.",
    ar: "شكراً لك! تم استقبال رسالتك بنجاح. سنتواصل معك قريباً.",
  },
  { selector: ".contact-form label:nth-of-type(1) span", en: "Full Name", ar: "الاسم الكامل" },
  {
    selector: ".contact-form label:nth-of-type(2) span",
    en: "Email Address",
    ar: "البريد الإلكتروني",
  },
  {
    selector: ".contact-form label:nth-of-type(3) span",
    en: "Phone Number",
    ar: "رقم الهاتف",
  },
  { selector: ".contact-form label:nth-of-type(4) span", en: "Subject", ar: "الموضوع" },
  { selector: ".contact-form label:nth-of-type(5) span", en: "Message", ar: "الرسالة" },
  { selector: ".contact-form .btn-block", en: "Send Message", ar: "إرسال الرسالة" },
  { selector: ".hours-card h3", en: "Business Hours", ar: "ساعات العمل" },
  { selector: ".hours-grid > div:nth-of-type(1) h4", en: "Working Days", ar: "أيام العمل" },
  {
    selector: ".hours-grid > div:nth-of-type(1) p",
    en: "Saturday - Thursday",
    ar: "السبت - الخميس",
  },
  { selector: ".hours-grid > div:nth-of-type(2) h4", en: "Hours", ar: "ساعات العمل" },
  {
    selector: ".hours-grid > div:nth-of-type(2) p",
    en: "8:00 AM - 6:00 PM",
    ar: "8:00 صباحاً - 6:00 مساءً",
  },
  { selector: ".hours-grid > div:nth-of-type(3) h4", en: "Emergency", ar: "الطوارئ" },
  {
    selector: ".hours-grid > div:nth-of-type(3) p",
    en: "Available 24/7",
    ar: "متاح على مدار الساعة",
  },
  { selector: ".footer-brand strong", en: "Ard Al Ekhlas", ar: "أرض الإخلاص" },
  {
    selector: ".footer-grid > div:nth-of-type(1) > p",
    en: "A Yemeni company specialized in importing, supplying, and wholesale distribution of food products with high quality and competitive prices.",
    ar: "شركة يمنية متخصصة في استيراد وتوريد وتوزيع المواد الغذائية بالجملة بجودة عالية وأسعار تنافسية.",
  },
  { selector: ".footer-grid > div:nth-of-type(2) h4", en: "Quick Links", ar: "روابط سريعة" },
  {
    selector: ".footer-grid > div:nth-of-type(2) li:nth-of-type(1) a",
    en: "Home",
    ar: "الرئيسية",
  },
  {
    selector: ".footer-grid > div:nth-of-type(2) li:nth-of-type(2) a",
    en: "Products",
    ar: "المنتجات",
  },
  {
    selector: ".footer-grid > div:nth-of-type(2) li:nth-of-type(3) a",
    en: "About",
    ar: "من نحن",
  },
  {
    selector: ".footer-grid > div:nth-of-type(2) li:nth-of-type(4) a",
    en: "Contact",
    ar: "اتصل بنا",
  },
  { selector: ".footer-grid > div:nth-of-type(3) h4", en: "Contact Us", ar: "تواصل معنا" },
  {
    selector: ".footer-grid > div:nth-of-type(3) p:nth-of-type(1)",
    en: "Taiz - Al Hawban - Dares Market",
    ar: "تعز - الحوبان - سوق دارس",
  },
];

const attributeTranslations = [
  {
    selector: ".brand",
    attribute: "aria-label",
    en: "Back to home",
    ar: "الرجوع إلى الرئيسية",
  },
  {
    selector: ".brand-mark",
    attribute: "alt",
    en: "Ard Al Ekhlas logo",
    ar: "شعار أرض الإخلاص",
  },
  {
    selector: ".main-nav",
    attribute: "aria-label",
    en: "Main navigation",
    ar: "التنقل الرئيسي",
  },
  {
    selector: "#mobile-nav",
    attribute: "aria-label",
    en: "Mobile navigation",
    ar: "قائمة الجوال",
  },
  {
    selector: "#language-select",
    attribute: "aria-label",
    en: "Select language",
    ar: "اختر اللغة",
  },
  {
    selector: ".identity-card",
    attribute: "aria-label",
    en: "Temporary visual identity",
    ar: "هوية بصرية مؤقتة",
  },
  {
    selector: ".identity-mark",
    attribute: "alt",
    en: "Ard Al Ekhlas logo",
    ar: "شعار أرض الإخلاص",
  },
  {
    selector: ".contact-extension",
    attribute: "aria-label",
    en: "Additional contact channels",
    ar: "وسائل تواصل إضافية",
  },
  {
    selector: ".footer-mark",
    attribute: "alt",
    en: "Ard Al Ekhlas logo",
    ar: "شعار أرض الإخلاص",
  },
];

const placeholderTranslations = [
  {
    selector: '.contact-form input[name="name"]',
    en: "Enter your full name",
    ar: "أدخل اسمك الكامل",
  },
  {
    selector: '.contact-form input[name="email"]',
    en: "Your email address",
    ar: "بريدك الإلكتروني",
  },
  {
    selector: '.contact-form input[name="phone"]',
    en: "Your phone number",
    ar: "رقم هاتفك",
  },
  {
    selector: '.contact-form input[name="subject"]',
    en: "Message subject",
    ar: "موضوع الرسالة",
  },
  {
    selector: '.contact-form textarea[name="message"]',
    en: "Write your message here...",
    ar: "اكتب رسالتك هنا...",
  },
];

let currentLanguage = "en";

function setCurrentYear() {
  const currentYear = String(new Date().getFullYear());
  const yearNode = document.getElementById("current-year");
  if (yearNode) {
    yearNode.textContent = currentYear;
    return;
  }

  if (footerCopyright) {
    footerCopyright.textContent = footerCopyright.textContent.replace(/\b\d{4}\b/, currentYear);
  }
}

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node) {
    node.textContent = value;
  }
}

function setAttributeValue(selector, attribute, value) {
  const node = document.querySelector(selector);
  if (node) {
    node.setAttribute(attribute, value);
  }
}

function updateMenuToggleLabel() {
  if (!menuToggle) {
    return;
  }
  const labels = menuToggleLabels[currentLanguage];
  const isOpen = mobileNav?.classList.contains("open");
  menuToggle.setAttribute("aria-label", isOpen ? labels.close : labels.open);
}

function updateHeaderHeight() {
  cachedHeaderHeight = siteHeader?.offsetHeight || 0;
}

function setupImageErrorHandling() {
  const imageSelectors = [".brand-mark", ".identity-mark", ".footer-mark"];

  imageSelectors.forEach((selector) => {
    const imageNode = document.querySelector(selector);
    if (!imageNode) {
      return;
    }

    imageNode.addEventListener(
      "error",
      () => {
        imageNode.style.display = "none";
        imageNode.setAttribute("aria-hidden", "true");
        updateHeaderHeight();
      },
      { once: true }
    );
  });
}

function applyLanguage(language) {
  const selectedLanguage = language === "ar" ? "ar" : "en";
  const meta = languageMeta[selectedLanguage];
  currentLanguage = selectedLanguage;

  document.documentElement.lang = meta.lang;
  document.documentElement.dir = meta.dir;
  document.title = meta.title;

  if (metaDescription) {
    metaDescription.setAttribute("content", meta.description);
  }

  textTranslations.forEach((entry) => {
    setText(entry.selector, entry[selectedLanguage]);
  });

  attributeTranslations.forEach((entry) => {
    setAttributeValue(entry.selector, entry.attribute, entry[selectedLanguage]);
  });

  placeholderTranslations.forEach((entry) => {
    setAttributeValue(entry.selector, "placeholder", entry[selectedLanguage]);
  });

  if (footerCopyright) {
    footerCopyright.innerHTML =
      selectedLanguage === "ar"
        ? '© <span id="current-year"></span> أرض الإخلاص للمواد الغذائية. جميع الحقوق محفوظة.'
        : '© <span id="current-year"></span> Ard Al Ekhlas Foodstuff. All rights reserved.';
  }

  setCurrentYear();
  updateMenuToggleLabel();
  updateHeaderHeight();

  if (languageSelect) {
    languageSelect.value = selectedLanguage;
  }
}

applyLanguage("en");
setupImageErrorHandling();
window.addEventListener("resize", updateHeaderHeight);

if (languageSelect) {
  languageSelect.addEventListener("change", (event) => {
    applyLanguage(event.target.value);
  });
}

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "\u2715" : "\u2630";
    updateMenuToggleLabel();
    updateHeaderHeight();
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

    const targetTop = target.getBoundingClientRect().top + window.scrollY - cachedHeaderHeight + 2;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });

    if (mobileNav?.classList.contains("open")) {
      mobileNav.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      if (menuToggle) {
        menuToggle.textContent = "\u2630";
      }
      updateMenuToggleLabel();
      updateHeaderHeight();
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

const defaultContactEmail = "info@ardikhlas.com";
const contactEmailAnchor = document.querySelector('.contact-info a[href^="mailto:"]');
let formStatusTimeoutId;

function resolveContactEmail() {
  const href = contactEmailAnchor?.getAttribute("href") || "";
  if (!href.startsWith("mailto:")) {
    return defaultContactEmail;
  }
  return href.slice("mailto:".length).split("?")[0] || defaultContactEmail;
}

function getFormStatusText(type, contactEmail) {
  const messages = {
    en: {
      sending: "Sending your message...",
      success: "Thank you! Your message has been received successfully. We will contact you soon.",
      error: `Message could not be sent. Please email us directly at ${contactEmail}.`,
    },
    ar: {
      sending: "\u062c\u0627\u0631\u064a \u0625\u0631\u0633\u0627\u0644 \u0631\u0633\u0627\u0644\u062a\u0643...",
      success:
        "\u0634\u0643\u0631\u0627\u064b \u0644\u0643! \u062a\u0645 \u0627\u0633\u062a\u0642\u0628\u0627\u0644 \u0631\u0633\u0627\u0644\u062a\u0643 \u0628\u0646\u062c\u0627\u062d. \u0633\u0646\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u0642\u0631\u064a\u0628\u0627\u064b.",
      error:
        "\u062a\u0639\u0630\u0631 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u0633\u0627\u0644\u0629. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u0631\u0627\u0633\u0644\u0629 \u0645\u0628\u0627\u0634\u0631\u0629 \u0639\u0644\u0649 " +
        contactEmail +
        ".",
    },
  };

  const language = currentLanguage === "ar" ? "ar" : "en";
  return messages[language][type];
}

if (form && formStatus) {
  const submitButton = form.querySelector('button[type="submit"]');
  const contactEmail = resolveContactEmail();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (formStatusTimeoutId) {
      window.clearTimeout(formStatusTimeoutId);
    }

    formStatus.textContent = getFormStatusText("sending", contactEmail);
    formStatus.hidden = false;

    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      payload._captcha = "false";
      payload._template = "table";
      payload._subject = payload.subject
        ? `Contact Form: ${payload.subject}`
        : "New contact form message";

      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(contactEmail)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      let result;
      try {
        result = await response.json();
      } catch {
        result = null;
      }

      const isSuccess =
        response.ok && (!result || result.success === true || result.success === "true");

      if (!isSuccess) {
        throw new Error("Failed to submit contact form.");
      }

      formStatus.textContent = getFormStatusText("success", contactEmail);
      form.reset();
    } catch (error) {
      console.error(error);
      formStatus.textContent = getFormStatusText("error", contactEmail);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }

      formStatusTimeoutId = window.setTimeout(() => {
        formStatus.hidden = true;
      }, 7000);
    }
  });
}
