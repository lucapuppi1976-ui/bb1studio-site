import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_ORIGIN: z.string().url(),
  NEXT_PUBLIC_APP_BASE_PATH: z.string().default("/agri_app"),
  AUTH_SECRET: z.string().min(16, "AUTH_SECRET troppo corto"),
  CRON_SECRET: z.string().min(16, "CRON_SECRET troppo corto"),
  SHOW_DEV_SEED_HINTS: z.enum(["true", "false"]).default("false"),
  ENABLE_EMAIL_NOTIFICATIONS: z.enum(["true", "false"]).default("false"),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  EMAIL_REPLY_TO: z.string().optional(),
});

export const serverEnv = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_ORIGIN: process.env.NEXT_PUBLIC_APP_ORIGIN,
  NEXT_PUBLIC_APP_BASE_PATH: process.env.NEXT_PUBLIC_APP_BASE_PATH ?? "/agri_app",
  AUTH_SECRET: process.env.AUTH_SECRET,
  CRON_SECRET: process.env.CRON_SECRET,
  SHOW_DEV_SEED_HINTS: process.env.SHOW_DEV_SEED_HINTS ?? "false",
  ENABLE_EMAIL_NOTIFICATIONS: process.env.ENABLE_EMAIL_NOTIFICATIONS ?? "false",
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_REPLY_TO: process.env.EMAIL_REPLY_TO,
});

export const isProduction = serverEnv.NODE_ENV === "production";
export const showDevSeedHints =
  serverEnv.SHOW_DEV_SEED_HINTS === "true" && !isProduction;

export const emailNotificationsEnabled =
  serverEnv.ENABLE_EMAIL_NOTIFICATIONS === "true";

export const emailProviderReady =
  emailNotificationsEnabled &&
  Boolean(serverEnv.RESEND_API_KEY) &&
  Boolean(serverEnv.EMAIL_FROM);
