const required = [
  "DATABASE_URL",
  "NEXTAUTH_URL",
  "NEXT_PUBLIC_APP_ORIGIN",
  "NEXT_PUBLIC_APP_BASE_PATH",
  "AUTH_SECRET",
  "CRON_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

const missing = required.filter((key) => !process.env[key] || !String(process.env[key]).trim());

if (missing.length > 0) {
  console.error("Variabili mancanti:", missing.join(", "));
  process.exit(1);
}

if (process.env.ENABLE_EMAIL_NOTIFICATIONS === "true") {
  const emailRequired = ["RESEND_API_KEY", "EMAIL_FROM"];
  const missingEmail = emailRequired.filter((key) => !process.env[key] || !String(process.env[key]).trim());

  if (missingEmail.length > 0) {
    console.error("Variabili email mancanti:", missingEmail.join(", "));
    process.exit(1);
  }
}

const safe = {
  DATABASE_URL: process.env.DATABASE_URL?.slice(0, 24) + "...",
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXT_PUBLIC_APP_ORIGIN: process.env.NEXT_PUBLIC_APP_ORIGIN,
  NEXT_PUBLIC_APP_BASE_PATH: process.env.NEXT_PUBLIC_APP_BASE_PATH,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  ENABLE_EMAIL_NOTIFICATIONS: process.env.ENABLE_EMAIL_NOTIFICATIONS,
  SHOW_DEV_SEED_HINTS: process.env.SHOW_DEV_SEED_HINTS,
};

console.log("Ambiente DEV ok:");
console.log(safe);
