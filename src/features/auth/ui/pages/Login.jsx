import React from "react";
import { Mail, Lock, ShieldCheck, AlertCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  let { register, handleSubmit, onLoginSubmit, errors, navigate, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-(--bg-main) text-(--text-primary) flex flex-col transition-colors duration-300">
      {/* Main Section */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left Side */}
        <div className="relative hidden lg:flex lg:w-1/2 border-r border-(--border-color) overflow-hidden bg-(--bg-surface)">
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
            alt="office-bg"
            className="absolute inset-0 h-full w-full object-cover opacity-20 dark:opacity-60 transition-opacity duration-300"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-slate-500/5 to-(--bg-main) opacity-90" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between p-12 w-full">
            {/* Logo */}
            <h1 className="text-3xl font-bold tracking-wide text-(--text-primary)">team-sync</h1>

            {/* Bottom Content */}
            <div className="space-y-8">
              <div className="flex items-center gap-2 text-sm tracking-[0.3em] uppercase text-purple-600 dark:text-purple-300">
                <ShieldCheck size={16} />
                <span>Secure Authorization</span>
              </div>

              <div>
                <h2 className="text-5xl font-bold leading-tight max-w-xl text-(--text-primary)">
                  Securely access your workspace.
                </h2>

                <p className="mt-6 text-lg text-(--text-secondary) leading-relaxed max-w-lg">
                  Authenticate with your corporate credentials to access your organization's synchronized dashboard, projects, and integrations.
                </p>
              </div>

              <div className="flex items-center gap-16 pt-8">
                <div>
                  <h3 className="text-4xl font-bold text-(--text-primary)">256-bit</h3>
                  <p className="text-(--text-muted) mt-1">AES Encryption</p>
                </div>

                <div>
                  <h3 className="text-4xl font-bold text-(--text-primary)">SOC2</h3>
                  <p className="text-(--text-muted) mt-1">Type II Certified</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-1 items-center justify-center px-6 py-14">
          <div className="w-full max-w-xl">
            <div className="mb-10">
              <h1 className="text-5xl font-bold text-(--text-primary)">Welcome back</h1>

              <p className="text-(--text-muted) mt-4 text-lg">
                Experience the future of collaborative data intelligence.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onLoginSubmit)}
              className="space-y-7"
            >
              {/* Email */}
              <div>
                <label className="block mb-3 text-sm font-medium text-(--text-secondary)">
                  Email Address
                </label>

                <div className="flex items-center border border-(--border-color) bg-(--bg-surface) rounded-xl px-4 h-16 focus-within:border-purple-500 dark:focus-within:border-purple-400 transition">
                  <Mail className="text-(--text-muted)" size={20} />

                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="bg-transparent w-full h-full outline-none px-4 text-(--text-primary) placeholder:text-(--text-muted)"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                </div>

                {errors.email && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1.5 animate-pulse-once">
                    <AlertCircle size={14} />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-(--text-secondary)">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-sm text-purple-600 dark:text-purple-300 font-medium hover:text-purple-500 cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="flex items-center border border-(--border-color) bg-(--bg-surface) rounded-xl px-4 h-16 focus-within:border-purple-500 dark:focus-within:border-purple-400 transition">
                  <Lock className="text-(--text-muted)" size={20} />

                  <input
                    type="password"
                    placeholder="••••••••"
                    className="bg-transparent w-full h-full outline-none px-4 text-(--text-primary) placeholder:text-(--text-muted)"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                </div>

                {errors.password && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1.5 animate-pulse-once">
                    <AlertCircle size={14} />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border border-(--border-color) bg-transparent accent-purple-500"
                  {...register("remember")}
                />

                <p className="text-(--text-secondary) text-sm select-none cursor-pointer">Stay signed in</p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-16 rounded-xl bg-purple-600 text-white font-semibold text-lg hover:bg-purple-500 dark:bg-linear-to-r dark:from-purple-600 dark:to-purple-300 dark:text-black dark:hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              {/* Register link */}
              <p className="text-center text-(--text-muted) pt-8 text-lg">
                Don&apos;t have an account?{" "}
                <span
                  onClick={() => navigate("/auth/register")}
                  className="text-purple-600 dark:text-purple-300 font-semibold hover:text-purple-500 cursor-pointer"
                >
                  Sign Up
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-(--border-color) px-8 py-6 flex flex-col lg:flex-row items-center justify-between gap-5 text-sm text-(--text-muted)">
        <h2 className="text-2xl font-bold text-(--text-primary)">team-sync</h2>

        <div className="flex items-center gap-8">
          <p className="hover:text-(--text-primary) cursor-pointer">Privacy Policy</p>
          <p className="hover:text-(--text-primary) cursor-pointer">Terms of Service</p>
          <p className="hover:text-(--text-primary) cursor-pointer">Security</p>
          <p className="hover:text-(--text-primary) cursor-pointer">System Status</p>
        </div>

        <p>© 2026 team-sync. Enterprise Intelligence Platforms.</p>
      </footer>
    </div>
  );
};

export default Login;