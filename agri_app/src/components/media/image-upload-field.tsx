"use client";

import { useState } from "react";

type Props = {
  label: string;
  inputName: string;
  defaultValue?: string | null;
};

export function ImageUploadField({ label, inputName, defaultValue = "" }: Props) {
  const [imageUrl, setImageUrl] = useState(defaultValue || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const basePath = process.env.NEXT_PUBLIC_APP_BASE_PATH || "/agri_app";

  async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const body = new FormData();
      body.append("file", file);

      const response = await fetch(`${basePath}/api/upload`, {
        method: "POST",
        body,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Upload fallito.");
      }

      const json = await response.json();
      setImageUrl(json.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore upload.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-2">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <input type="hidden" name={inputName} value={imageUrl} />
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="agri-input file:mr-3 file:rounded-xl file:border-0 file:bg-emerald-950 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
      />
      {uploading ? <p className="text-xs text-stone-500">Upload in corso...</p> : null}
      {error ? <p className="text-xs text-rose-700">{error}</p> : null}
      {imageUrl ? (
        <div className="grid gap-2">
          <input
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            className="agri-input"
          />
          <img src={imageUrl} alt={label} className="max-h-64 w-full rounded-2xl border border-stone-200 object-cover" />
        </div>
      ) : null}
    </div>
  );
}
