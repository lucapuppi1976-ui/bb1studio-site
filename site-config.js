window.BB1StudioConfig = {
  company: {
    legalName: "Guanabomalu SL",
    cif: "B38413647",
    addressLine1: "Camino las Higueras, 7 - Arona",
    addressLine2: "Tenerife - Canarias - Spain"
  },
  links: {
    studioHome: "https://bb1studio.com",
    bysApp: "https://bys.bb1studio.com",
    monthlyCheckout: "https://buy.stripe.com/test_8x26oG9hXc5I3XE8Zt2wU00",
    annualCheckout: "https://buy.stripe.com/test_8x228q3XD4Dg79Q0sX2wU01",
    customerPortal: ""
  },
  pricing: {
    currencySymbol: "€",
    monthlyAmount: 12,
    annualAmount: 96,
    status: "launch_priced",
    defaultPlan: "annual"
  },
  products: {
    amonestacionAuditada: {
      // Pega aquí SOLO el enlace público/responder de Google Forms.
      // Ejemplo correcto: https://docs.google.com/forms/d/e/.../viewform
      // Si lo dejas vacío, los botones "Solicitar demo" seguirán apuntando
      // al bloque #demo-form de la página, sin romper la navegación.
      demoFormUrl: "",
      demoFormTarget: "_blank"
    }
  },
  billing: {
    mode: "test"
  }
};