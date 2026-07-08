import React from "react";
import { Link } from "react-router";
import {
  Compass,
  Home,
  MapPinOff,
  HelpCircle,
  Sparkles,
} from "lucide-react";

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[var(--bg-main)] px-6 py-10 selection:bg-indigo-500/30">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
        }}
      />

      {/* Background Glows */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.04] blur-[100px]" />

      {/* Floating Decorations */}
      <div className="absolute left-[12%] top-[20%] hidden rotate-[-12deg] rounded-2xl border border-blue-500/20 bg-blue-500/[0.04] p-4 backdrop-blur-xl md:block">
        <Compass className="h-5 w-5 text-blue-400/50" />
      </div>
      <div className="absolute bottom-[18%] right-[15%] hidden rotate-12 rounded-2xl border border-purple-500/20 bg-purple-500/[0.04] p-4 backdrop-blur-xl md:block">
        <MapPinOff className="h-5 w-5 text-purple-400/50" />
      </div>

      {/* Main Card */}
      <section className="relative w-full max-w-[520px]">
        {/* Card Glow */}
        <div className="absolute -inset-[1px] rounded-[30px] bg-gradient-to-br from-blue-500/40 via-indigo-500/10 to-purple-500/40 blur-[1px]" />

        <div className="relative overflow-hidden rounded-[30px] border border-white/[0.06] bg-[var(--bg-surface)]/90 px-7 py-10 shadow-2xl backdrop-blur-2xl sm:px-12 sm:py-12">
          {/* Top Shine */}
          <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-400/80 to-transparent" />

          {/* Decorative Glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-blue-500/[0.08] blur-[70px]" />

          {/* Status */}
          <div className="relative mb-8 flex justify-center">
            <div className="flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/[0.07] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>
              Route Missing
            </div>
          </div>

          {/* 404 */}
          <div className="relative flex justify-center">
            {/* Background 404 */}
            <span className="absolute -top-3 select-none text-[130px] font-black leading-none tracking-[-0.09em] text-blue-500/[0.03] sm:text-[160px]">
              404
            </span>
            <div className="relative flex items-center">
              <span className="bg-gradient-to-b from-blue-400 via-blue-500 to-indigo-900 bg-clip-text text-[100px] font-black leading-none tracking-[-0.08em] text-transparent drop-shadow-[0_0_35px_rgba(59,130,246,0.2)] sm:text-[130px]">
                404
              </span>
              {/* Floating Icon */}
              <div className="absolute -right-5 top-0 flex h-11 w-11 rotate-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 shadow-lg backdrop-blur-xl">
                <MapPinOff className="h-5 w-5 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-auto my-7 flex max-w-[280px] items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--border-color)]" />
            <Sparkles className="h-3.5 w-3.5 text-[var(--text-muted)]" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--border-color)]" />
          </div>

          {/* Content */}
          <div className="relative text-center">
            <h1 className="mb-3 text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
              Page Not Found
            </h1>
            <p className="mx-auto max-w-sm text-sm font-light leading-6 text-[var(--text-secondary)]">
              The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
            </p>
          </div>

          {/* Help Info */}
          <div className="relative my-7 flex items-start gap-3 rounded-2xl border border-[var(--border-color)]/60 bg-[var(--bg-main)]/40 p-4 text-left">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
              <HelpCircle className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--text-primary)]">
                Looking for something else?
              </p>
              <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                Double check the website address (URL) or navigate back using the primary dashboard layout options.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="relative mt-2">
            <Link
              to="/home"
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_5px_25px_rgba(99,102,241,0.2)] transition-all duration-300 hover:shadow-[0_8px_35px_rgba(99,102,241,0.35)] active:scale-[0.98]"
            >
              {/* Button Shine */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Home className="relative h-4 w-4" />
              <span className="relative">Dashboard</span>
            </Link>
          </div>

          {/* Footer */}
          <div className="relative mt-8 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
            <Compass className="h-3 w-3 animate-spin" style={{ animationDuration: "12s" }} />
            Team Sync Directory
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
