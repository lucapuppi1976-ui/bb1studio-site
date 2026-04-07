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
  const defaultPlan = pricing.defaultPlan === "monthly" ? "monthly" : "annual";

  const i18n = {
    en: {
      monthSuffix: "/month",
      yearSuffix: "/year",
      equivalentTo: "Equivalent to",
      saveYear: (amount) => `Save €${amount} per year`,
      checkoutNote: "Checkout can be activated here as soon as billing goes live. Until then, the live app remains available.",
      accessNoCheckout: "Billing is not connected on this page yet. The live app remains available while checkout is being activated.",
      accessHasCheckout: "This plan is ready to continue to checkout.",
      selectedMonthly: "Monthly plan",
      selectedAnnual: "Annual plan",
      accessCheckoutMonthly: "Start monthly checkout",
      accessCheckoutAnnual: "Start annual checkout",
      annualRecommended: "Recommended"
    },
    it: {
      monthSuffix: "/mese",
      yearSuffix: "/anno",
      equivalentTo: "Equivale a",
      saveYear: (amount) => `Risparmi €${amount} all’anno`,
      checkoutNote: "Il checkout può essere attivato qui appena la fatturazione sarà live. Nel frattempo l’app live resta disponibile.",
      accessNoCheckout: "La fatturazione non è ancora collegata in questa pagina. L’app live resta disponibile mentre il checkout viene attivato.",
      accessHasCheckout: "Questo piano è pronto per proseguire al checkout.",
      selectedMonthly: "Piano mensile",
      selectedAnnual: "Piano annuale",
      accessCheckoutMonthly: "Avvia checkout mensile",
      accessCheckoutAnnual: "Avvia checkout annuale",
      annualRecommended: "Consigliato"
    },
    es: {
      monthSuffix: "/mes",
      yearSuffix: "/año",
      equivalentTo: "Equivale a",
      saveYear: (amount) => `Ahorras €${amount} al año`,
      checkoutNote: "El checkout puede activarse aquí en cuanto la facturación esté en vivo. Mientras tanto la app en vivo sigue disponible.",
      accessNoCheckout: "La facturación aún no está conectada en esta página. La app en vivo sigue disponible mientras el checkout se activa.",
      accessHasCheckout: "Este plan está listo para continuar al checkout.",
      selectedMonthly: "Plan mensual",
      selectedAnnual: "Plan anual",
      accessCheckoutMonthly: "Iniciar checkout mensual",
      accessCheckoutAnnual: "Iniciar checkout anual",
      annualRecommended: "Recomendado"
    }
  };

  const t = i18n[lang] || i18n.en;
  const currency = pricing.currencySymbol || "€";
  const monthlyAmount = Number(pricing.monthlyAmount || 0);
  const annualAmount = Number(pricing.annualAmount || 0);

  function planPaths() {
    return {
      pricing: lang === "it" ? "/it/before-you-send/pricing/" : lang === "es" ? "/es/before-you-send/pricing/" : "/before-you-send/pricing/",
      access: lang === "it" ? "/it/before-you-send/access/" : lang === "es" ? "/es/before-you-send/access/" : "/before-you-send/access/"
    };
  }

  function plainPrice(amount) {
    return `${currency}${amount}`;
  }

  function fullPrice(amount, suffix) {
    return `${currency}${amount}${suffix}`;
  }

  function text(selector, value) {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = value;
    });
  }

  function htmlText(selector, value) {
    document.querySelectorAll(selector).forEach((el) => {
      el.innerHTML = value;
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
    const paths = planPaths();

    document.querySelectorAll("[data-plan-role='choose']").forEach((el) => {
      const plan = el.getAttribute("data-plan") === "monthly" ? "monthly" : "annual";
      const checkoutHref = plan === "monthly" ? monthlyCheckout : annualCheckout;
      if (checkoutHref) {
        el.setAttribute("href", checkoutHref);
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      } else {
        el.setAttribute("href", `${paths.access}?plan=${plan}`);
        el.removeAttribute("target");
        el.removeAttribute("rel");
      }
    });
  }

  function setPrices() {
    if (monthlyAmount > 0) {
      text("[data-price-monthly]", fullPrice(monthlyAmount, t.monthSuffix));
      text("[data-price-monthly-plain]", plainPrice(monthlyAmount));
    }
    if (annualAmount > 0) {
      text("[data-price-annual]", fullPrice(annualAmount, t.yearSuffix));
      text("[data-price-annual-plain]", plainPrice(annualAmount));
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

  function selectedPlan() {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan");
    return plan === "monthly" || plan === "annual" ? plan : defaultPlan;
  }

  function setAccessRoute() {
    const selected = selectedPlan();
    const hasCheckout = selected === "monthly" ? hasMonthlyCheckout : hasAnnualCheckout;
    const checkoutHref = selected === "monthly" ? monthlyCheckout : annualCheckout;

    text("[data-selected-plan-label]", selected === "monthly" ? t.selectedMonthly : t.selectedAnnual);
    text("[data-selected-plan-price]", selected === "monthly" ? fullPrice(monthlyAmount, t.monthSuffix) : fullPrice(annualAmount, t.yearSuffix));
    text("[data-selected-plan-note]", hasCheckout ? t.accessHasCheckout : t.accessNoCheckout);

    document.querySelectorAll("[data-plan-card]").forEach((el) => {
      const cardPlan = el.getAttribute("data-plan-card") === "monthly" ? "monthly" : "annual";
      el.classList.toggle("selected", cardPlan === selected);
      const rec = el.querySelector("[data-recommended-tag]");
      if (rec) {
        rec.textContent = t.annualRecommended;
      }
    });

    const accessBtn = document.querySelector("[data-access-checkout-btn]");
    if (!accessBtn) return;

    if (hasCheckout && checkoutHref) {
      accessBtn.style.display = "inline-flex";
      accessBtn.textContent = selected === "monthly" ? t.accessCheckoutMonthly : t.accessCheckoutAnnual;
      accessBtn.setAttribute("href", checkoutHref);
      accessBtn.setAttribute("target", "_blank");
      accessBtn.setAttribute("rel", "noopener noreferrer");
    } else {
      accessBtn.style.display = "none";
    }
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
    setAccessRoute();
    fillCompany();
  });
})();
