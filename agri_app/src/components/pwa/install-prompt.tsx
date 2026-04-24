"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function onInstall() {
    if (!deferredPrompt) {
      setMessage("Prompt non disponibile. Su iPhone usa Condividi → Aggiungi a schermata Home.");
      return;
    }

    await deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    setMessage(result.outcome === "accepted" ? "App installata o accettata." : "Installazione annullata.");
    setDeferredPrompt(null);
  }

  return (
    <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
      <p className="text-white/70">
        Installa Agri App sul telefono per usarla come una vera app web.
      </p>
      <button onClick={onInstall} className="w-fit rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950">
        Installa
      </button>
      {message ? <p className="text-sm text-white/60">{message}</p> : null}
    </div>
  );
}
