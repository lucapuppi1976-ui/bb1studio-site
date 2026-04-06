
(function () {
  const cfg = window.BB1StudioConfig || {};
  const links = cfg.links || {};
  const pricing = cfg.pricing || {};
  const company = cfg.company || {};
  const hasMonthlyCheckout = typeof links.monthlyCheckout === "string" && links.monthlyCheckout.trim().length > 0;
  const hasAnnualCheckout = typeof links.annualCheckout === "string" && links.annualCheckout.trim().length > 0;
  const hasContactMail = typeof links.contactMail === "string" && links.contactMail.trim().length > 0;
  const currency = pricing.currencySymbol || "€";

  function textForPrice(value, fallbackText) {
    if (typeof value === "string" && value.trim().length > 0) return value.trim();
    return fallbackText;
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.textContent = value;
    });
  }

  function setHref(selector, value) {
    if (!value) return;
    document.querySelectorAll(selector).forEach(function (el) {
      el.setAttribute("href", value);
    });
  }

  function setMail(selector, email, fallbackText) {
    document.querySelectorAll(selector).forEach(function (el) {
      if (email) {
        el.setAttribute("href", "mailto:" + email);
        el.textContent = email;
      } else if (fallbackText) {
        el.textContent = fallbackText;
      }
    });
  }

  function reveal(selector, shouldShow) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.style.display = shouldShow ? "" : "none";
    });
  }

  function activatePlanButtons() {
    document.querySelectorAll("[data-plan='monthly']").forEach(function (el) {
      if (hasMonthlyCheckout) {
        el.setAttribute("href", links.monthlyCheckout);
      }
    });
    document.querySelectorAll("[data-plan='annual']").forEach(function (el) {
      if (hasAnnualCheckout) {
        el.setAttribute("href", links.annualCheckout);
      }
    });
  }

  function applyLanguageFallbacks() {
    const lang = document.documentElement.getAttribute("lang") || "en";
    const fallback = {
      en: { price: "Pricing on request", contact: "Set contact email in site-config.js" },
      it: { price: "Prezzo su richiesta", contact: "Imposta l'email di contatto in site-config.js" },
      es: { price: "Precio a consultar", contact: "Configura el email de contacto en site-config.js" }
    }[lang] || { price: "Pricing on request", contact: "Set contact email in site-config.js" };

    setText("[data-price-monthly]", textForPrice(pricing.monthlyPrice, fallback.price));
    setText("[data-price-annual]", textForPrice(pricing.annualPrice, fallback.price));
    setMail("[data-contact-mail]", links.contactMail, fallback.contact);
    setMail("[data-support-mail]", links.supportMail, fallback.contact);

    if (links.bysApp) setHref("[data-bys-link]", links.bysApp);

    reveal("[data-checkout-monthly-live]", hasMonthlyCheckout);
    reveal("[data-checkout-annual-live]", hasAnnualCheckout);
    reveal("[data-contact-required]", !hasMonthlyCheckout && !hasAnnualCheckout);
  }

  function fillCompany() {
    setText("[data-company-name]", company.legalName || "");
    setText("[data-company-cif]", company.cif || "");
    setText("[data-company-address-1]", company.addressLine1 || "");
    setText("[data-company-address-2]", company.addressLine2 || "");
  }

  document.addEventListener("DOMContentLoaded", function () {
    activatePlanButtons();
    applyLanguageFallbacks();
    fillCompany();
  });
})();
