"use client";

import { useEffect, useRef, useState } from "react";

export function QRScanner() {
  const regionId = "qr-reader-region";
  const instanceRef = useRef<any>(null);
  const [message, setMessage] = useState("Inquadra un QR o carica un'immagine.");

  useEffect(() => {
    let mounted = true;

    async function startScanner() {
      try {
        const { Html5QrcodeScanner } = await import("html5-qrcode");
        if (!mounted) return;

        const scanner = new Html5QrcodeScanner(
          regionId,
          {
            fps: 10,
            qrbox: 250,
          },
          false
        );

        instanceRef.current = scanner;

        scanner.render(
          (decodedText: string) => {
            setMessage(`QR letto: ${decodedText}`);
            if (/^https?:\/\//.test(decodedText)) {
              window.location.href = decodedText;
            }
          },
          () => undefined
        );
      } catch (error) {
        setMessage("Scanner non disponibile su questo browser.");
      }
    }

    startScanner();

    return () => {
      mounted = false;
      const scanner = instanceRef.current;
      if (scanner?.clear) {
        scanner.clear().catch(() => undefined);
      }
    };
  }, []);

  return (
    <div className="grid gap-4">
      <div id={regionId} className="overflow-hidden rounded-2xl border border-white/10 bg-white p-2" />
      <p className="text-sm text-white/60">{message}</p>
    </div>
  );
}
