"use client";

import { useState, useRef } from "react";
import { updateBranding } from "@/lib/actions/branding";

const DEFAULT_ACCENT = "#2563eb";
const MAX_LOGO_SIZE = 512 * 1024; // 512KB

export function BrandingForm({
  currentLogoUrl,
  currentAccentColor,
}: {
  currentLogoUrl: string | null;
  currentAccentColor: string | null;
}) {
  const [logoUrl, setLogoUrl] = useState<string | null>(currentLogoUrl);
  const [accentColor, setAccentColor] = useState(
    currentAccentColor ?? DEFAULT_ACCENT,
  );
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    setSaved(false);
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_LOGO_SIZE) {
      setError("Logo must be under 512KB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLogoUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleRemoveLogo() {
    setLogoUrl(null);
    setSaved(false);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  }

  function handleColorChange(hex: string) {
    setSaved(false);
    setAccentColor(hex);
  }

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSaved(false);
    await updateBranding(formData);
    setSaved(true);
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
    >
      <input type="hidden" name="logoUrl" value={logoUrl ?? ""} />
      <input type="hidden" name="accentColor" value={accentColor} />

      {/* Logo */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Logo</label>
        <p className="mt-0.5 text-xs text-gray-400">
          PNG, JPG, or SVG. Max 512KB.
        </p>

        {logoUrl && (
          <div className="mt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl}
              alt="Logo preview"
              className="h-auto w-[120px] rounded border border-gray-200 object-contain"
            />
            <button
              type="button"
              onClick={handleRemoveLogo}
              className="mt-1 text-xs font-medium text-red-600 hover:text-red-700"
            >
              Remove Logo
            </button>
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-2 block text-sm text-gray-500 file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
        />

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>

      {/* Accent color */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Accent Color
        </label>
        <div className="mt-1 flex items-center gap-3">
          <input
            type="color"
            value={accentColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="h-9 w-9 cursor-pointer rounded border border-gray-300"
          />
          <input
            type="text"
            value={accentColor}
            onChange={(e) => handleColorChange(e.target.value)}
            maxLength={7}
            className="w-28 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          {accentColor !== DEFAULT_ACCENT && (
            <button
              type="button"
              onClick={() => handleColorChange(DEFAULT_ACCENT)}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Reset to default
            </button>
          )}
        </div>
      </div>

      {/* Preview */}
      <div>
        <p className="text-sm font-medium text-gray-700">Report Preview</p>
        <div
          className="mt-2 overflow-hidden rounded-md border border-gray-200"
          style={{ borderTopColor: accentColor, borderTopWidth: 4 }}
        >
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-3">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt="Preview logo"
                className="h-8 w-auto object-contain"
              />
            ) : (
              <div className="flex h-8 w-16 items-center justify-center rounded bg-gray-200 text-[9px] text-gray-400">Logo</div>
            )}
            <span className="text-sm font-semibold text-gray-700">
              Scope Change Report
            </span>
          </div>
          <div className="space-y-2 px-4 py-3 text-[10px] text-gray-400">
            <p>Prepared for: <span className="font-medium text-gray-500">Client Name</span></p>
            <p>Total Value: <span className="font-medium" style={{ color: accentColor }}>$2,400.00</span></p>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Save Branding
        </button>
        {saved && (
          <span className="text-sm text-green-600">Settings saved.</span>
        )}
      </div>
    </form>
  );
}
