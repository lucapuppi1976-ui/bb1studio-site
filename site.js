
(function () {
  const cfg = window.BB1StudioConfig || {};
  const links = cfg.links || {};
  const pricing = cfg.pricing || {};
  const company = cfg.company || {};
  const lang = document.documentElement.getAttribute("lang") || "en";

  const monthlyCheckout = typeof links.monthlyCheckout === "string" ? links.monthlyCheckout.trim() : "";
  const annualCheckout = typeof links.annualCheckout === "string" ? links.annualCheckout.trim() : "";
  const hasMonthlyCheckout = monthlyCheckout.length > 0;
  const hasAnnualCheckout = annualCheckout.length > 0;

  const i18n = {
    en: {
      monthSuffix: "/month",
      yearSuffix: "/year",
      equivalentTo: "Equivalent to",
      saveYear: (amount) => `Save €${amount} per year`,
      checkoutNote: "Checkout can be activated here as soon as billing goes live. For now, the live app remains available."
    },
    it: {
      monthSuffix: "/mese",
      yearSuffix: "/anno",
      equivalentTo: "Equivale a",
      saveYear: (amount) => `Risparmi €${amount} all’anno`,
      checkoutNote: "Il checkout può essere attivato qui appena la fatturazione sarà live. Per ora l’app live resta disponibile."
    },
    es: {
      monthSuffix: "/mes",
      yearSuffix: "/año",
      equivalentTo: "Equivale a",
      saveYear: (amount) => `Ahorras €${amount} al año`,
      checkoutNote: "El checkout puede activarse aquí en cuanto la facturación esté en vivo. Por ahora la app en vivo sigue disponible."
    }
  };

  const t = i18n[lang] || i18n.en;
  const currency = pricing.currencySymbol || "€";
  const monthlyAmount = Number(pricing.monthlyAmount || 0);
  const annualAmount = Number(pricing.annualAmount || 0);

  function text(selector, value) {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = value;
    });
  }

  function attr(selector, name, value) {
    document.querySelectorAll(selector).forEach((el) => {
      el.setAttribute(name, value);
    });
  }

  function setAppLinks() {
    const bys = (links.bysApp && links.bysApp.trim()) || "https://bys.bb1studio.com";
    document.querySelectorAll("[data-app-link]").forEach((el) => {
      el.setAttribute("href", bys);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    });
  }

  function setPlanLinks() {
    document.querySelectorAll("[data-plan='monthly']").forEach((el) => {
      if (hasMonthlyCheckout) {
        el.setAttribute("href", monthlyCheckout);
      }
    });
    document.querySelectorAll("[data-plan='annual']").forEach((el) => {
      if (hasAnnualCheckout) {
        el.setAttribute("href", annualCheckout);
      }
    });
  }

  function setPrices() {
    if (monthlyAmount > 0) {
      text("[data-price-monthly]", `${currency}${monthlyAmount}${t.monthSuffix}`);
    }
    if (annualAmount > 0) {
      text("[data-price-annual]", `${currency}${annualAmount}${t.yearSuffix}`);
      const monthlyEquivalent = Math.round((annualAmount / 12) * 100) / 100;
      text("[data-effective-monthly]", `${t.equivalentTo} ${currency}${monthlyEquivalent}${t.monthSuffix}`);
      if (monthlyAmount > 0) {
        const save = (monthlyAmount * 12) - annualAmount;
        if (save > 0) {
          text("[data-annual-savings]", t.saveYear(save));
        }
      }
    }
  }

  function setCheckoutNote() {
    const showNote = !(hasMonthlyCheckout && hasAnnualCheckout);
    document.querySelectorAll("[data-checkout-note]").forEach((el) => {
      if (showNote) {
        el.textContent = t.checkoutNote;
      } else {
        el.style.display = "none";
      }
    });
  }

  function fillCompany() {
    text("[data-company-name]", company.legalName || "");
    text("[data-company-cif]", company.cif || "");
    text("[data-company-address-1]", company.addressLine1 || "");
    text("[data-company-address-2]", company.addressLine2 || "");
  }

  document.addEventListener("DOMContentLoaded", function () {
    setAppLinks();
    setPlanLinks();
    setPrices();
    setCheckoutNote();
    fillCompany();
  });
})();
