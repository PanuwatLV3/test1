import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

import {
  contactDetails,
  getContactKeyFromRouteParam,
  type ContactKey,
} from "@/lib/contact-data";

export const Route = createFileRoute("/contact/$contact")({
  component: ContactDetailPage,
});

function ContactDetailPage() {
  const { contact } = Route.useParams();
  const [copied, setCopied] = useState(false);
  const contactKey = getContactKeyFromRouteParam(contact);

  if (!contactKey) {
    return (
      <section className="grid-bg flex flex-1 items-center justify-center px-5 py-12">
        <div className="w-full max-w-md rounded-3xl border border-ink/15 bg-parchment p-8 text-center shadow-panel">
          <p className="font-display text-3xl text-ink">Contact not found</p>
          <p className="mt-3 text-sm text-ink/60">
            This contact page could not be loaded.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-copper"
          >
            Go home
          </Link>
        </div>
      </section>
    );
  }

  const selectedContact = contactKey;
  const details = contactDetails[selectedContact];
  const qrImage =
    selectedContact === "WeChat" ||
    selectedContact === "LINE" ||
    selectedContact === "Facebook"
      ? contactDetails[selectedContact].qr
      : undefined;

  const handleCopyContact = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(details.id);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = details.id;
        textarea.setAttribute("readonly", "true");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  const openContactAction = () => {
    const url = details.actionUrl;
    if (url.startsWith("http") || url.startsWith("mailto:")) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    window.location.href = url;
  };

  return (
    <section className="grid-bg flex flex-1 items-center justify-center px-5 py-12">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border-2 border-ink/15 bg-parchment shadow-panel">
        <div className="border-b-2 border-ink/15 bg-ink px-5 py-4 text-cream">
          <div className="flex items-center justify-between gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-3 py-1.5 text-xs font-medium text-cream/90 transition hover:bg-cream/10"
            >
              <ArrowLeft className="size-3.5" />
              Back
            </Link>
            <span className="font-display text-sm tracking-widest">
              {selectedContact}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {qrImage && (
            <div className="flex justify-center">
              <img
                src={qrImage}
                alt={`${selectedContact} QR code`}
                className="h-56 w-56 rounded-2xl border border-ink/15 bg-cream object-cover"
              />
            </div>
          )}

          <div className="mt-5 rounded-2xl border border-ink/15 bg-cream/60 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50">
                {selectedContact === "WeChat"
                  ? "WeChat ID"
                  : selectedContact === "LINE"
                    ? "LINE ID"
                    : selectedContact === "Facebook"
                      ? "Facebook ID"
                      : "Contact ID"}
              </p>
              <button
                type="button"
                onClick={handleCopyContact}
                className="inline-flex items-center gap-1 rounded-full border border-ink/20 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-cream"
              >
                <Copy className="size-3" />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="mt-3 text-sm font-medium break-all">{details.id}</p>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={openContactAction}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-cream transition hover:bg-copper"
            >
              {details.actionLabel}
              <ExternalLink className="size-4" />
            </button>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-ink/20 px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-parchment"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
