import React, { useState, useEffect } from "react";

interface BookingWidgetCardProps {
  isMobile?: boolean;
  className?: string;
  style?: React.CSSProperties;
  showTrustRow?: boolean;
  iframeHeight?: number;
  onClose?: () => void;
}

export default function BookingWidgetCard({
  isMobile = false,
  className = "",
  style = {},
  showTrustRow = true,
  iframeHeight,
  onClose
}: BookingWidgetCardProps) {
  const computedIframeHeight = iframeHeight ?? (isMobile ? 315 : 340);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 12000); // safety timeout in case load event never fires
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`w-full ${className}`} style={style}>
      <div className="bg-white/95 backdrop-blur rounded-lg shadow-[5px_5px_0_0_#000] border-2 border-black overflow-hidden neo-brutalist-card">
        <div className="py-1 px-3 bg-gradient-to-r from-[#EE432C] to-[#FFB375] text-white border-b-2 border-black flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/90 leading-tight">We&apos;ll call to confirm once booked</p>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close booking"
              className="shrink-0 text-white/85 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/70 rounded-full px-2 py-0.5 leading-none"
            >
              ×
            </button>
          )}
        </div>

        <iframe
          src="https://hardyswashnwax.fieldd.co"
          style={{
            width: "100%",
            height: computedIframeHeight,
            border: "none",
            overflow: "hidden"
          }}
          title="Hardys Wash N' Wax Quick Booking"
          loading="lazy"
          onLoad={() => setIsLoading(false)}
        ></iframe>

        {isLoading && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white text-sm font-medium">
            Loading booking form…
          </div>
        )}

        <div className="py-1 px-3 bg-[#FFD7B5] flex justify-between items-center border-t-2 border-black">
          <div className="text-black text-xs leading-tight">
            <span className="font-semibold">Have questions?</span>{" "}
            <a href="tel:+19497340201" className="underline font-semibold text-black">
              (949) 734-0201
            </a>
          </div>
        </div>
      </div>

      {showTrustRow && (
        <div className="mt-3 flex justify-center items-center gap-3 text-white text-xs">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-[#FFB375]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" />
            </svg>
            <span>60-second booking</span>
          </div>
          <div className="h-4 w-px bg-white/30"></div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-[#FFB375]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.177-7.86l-2.765-2.767L7 12.431l3.823 3.832 7.177-7.177-1.06-1.06-7.117 7.114z" />
            </svg>
            <span>Instant confirmation</span>
          </div>
        </div>
      )}
    </div>
  );
}
