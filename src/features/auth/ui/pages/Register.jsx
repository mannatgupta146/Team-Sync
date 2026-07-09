import React from "react";
import { User, Mail, Lock, Sparkles, ShieldCheck, AlertCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  let { register, handleSubmit, onRegisterSubmit, errors, navigate, watch, isLoading } =
    useAuth();

  const passwordVal = watch("password", "");

  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: "", colorClass: "text-gray-500", barColor: "bg-white/10" };
    
    let score = 0;
    if (pass.length >= 6) score++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    
    if (score <= 1) {
      return { score, label: "Weak password", colorClass: "text-red-400", barColor: "bg-red-500" };
    } else if (score <= 3) {
      return { score, label: "Medium password", colorClass: "text-amber-500", barColor: "bg-amber-500" };
    } else {
      return { score, label: "Strong password", colorClass: "text-emerald-500", barColor: "bg-emerald-500" };
    }
  };

  const strength = getPasswordStrength(passwordVal);

  return (
    <div className="min-h-screen bg-(--bg-main) text-(--text-primary) flex flex-col transition-colors duration-300">
      {/* Main Section */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left Side */}
        <div className="relative hidden lg:flex lg:w-1/2 border-r border-(--border-color) overflow-hidden bg-(--bg-surface)">
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
            alt="collaboration-bg"
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
                <Sparkles size={16} />
                <span>Next-Gen Intelligence</span>
              </div>

              <div>
                <h2 className="text-5xl font-bold leading-tight max-w-xl text-(--text-primary)">
                  Accelerate your team's intelligence.
                </h2>

                <p className="mt-6 text-lg text-(--text-secondary) leading-relaxed max-w-lg">
                  Connect your enterprise data to our specialized AI models and
                  unlock unparalleled strategic insights in seconds.
                </p>
              </div>

              <div className="flex items-center gap-16 pt-8">
                <div>
                  <h3 className="text-4xl font-bold text-(--text-primary)">99.9%</h3>
                  <p className="text-(--text-muted) mt-1">Uptime SLA</p>
                </div>

                <div>
                  <h3 className="text-4xl font-bold text-(--text-primary)">ISO</h3>
                  <p className="text-(--text-muted) mt-1">27001 Certified</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-1 items-center justify-center px-6 py-14">
          <div className="w-full max-w-xl">
            <div className="mb-10">
              <h1 className="text-5xl font-bold text-(--text-primary)">Create your account</h1>

              <p className="text-(--text-muted) mt-4 text-lg">
                Experience the future of collaborative data intelligence.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onRegisterSubmit)}
              className="space-y-7"
            >
              {/* Select Role */}
              <div>
                <label className="block mb-3 text-sm font-medium text-(--text-secondary)">
                  Select Role
                </label>

                <div className="grid grid-cols-2 gap-4">
                  {/* Employee Card */}
                  <label className="relative flex flex-col items-center justify-center p-5 rounded-xl border border-(--border-color) bg-(--bg-surface) hover:bg-(--bg-hover) transition cursor-pointer select-none">
                    <input
                      type="radio"
                      value="employee"
                      className="peer sr-only"
                      defaultChecked
                      {...register("role", { required: "Role is required" })}
                    />
                    <div className="absolute inset-0 rounded-xl border-2 border-transparent peer-checked:border-purple-500 peer-checked:bg-purple-500/4 transition-all pointer-events-none" />
                    <User className="text-(--text-muted) peer-checked:text-purple-600 dark:peer-checked:text-purple-300 mb-2 transition-colors relative z-10" size={24} />
                    <span className="text-sm font-semibold text-(--text-secondary) peer-checked:text-(--text-primary) transition-colors relative z-10">
                      Employee
                    </span>
                  </label>

                  {/* Admin Card */}
                  <label className="relative flex flex-col items-center justify-center p-5 rounded-xl border border-(--border-color) bg-(--bg-surface) hover:bg-(--bg-hover) transition cursor-pointer select-none">
                    <input
                      type="radio"
                      value="admin"
                      className="peer sr-only"
                      {...register("role", { required: "Role is required" })}
                    />
                    <div className="absolute inset-0 rounded-xl border-2 border-transparent peer-checked:border-purple-500 peer-checked:bg-purple-500/4 transition-all pointer-events-none" />
                    <ShieldCheck className="text-(--text-muted) peer-checked:text-purple-600 dark:peer-checked:text-purple-300 mb-2 transition-colors relative z-10" size={24} />
                    <span className="text-sm font-semibold text-(--text-secondary) peer-checked:text-(--text-primary) transition-colors relative z-10">
                      Administrator
                    </span>
                  </label>
                </div>

                {errors.role && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1.5 animate-pulse-once">
                    <AlertCircle size={14} />
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Full Name */}
              <div>
                <label className="block mb-3 text-sm font-medium text-(--text-secondary)">
                  Full Name
                </label>

                <div className="flex items-center border border-(--border-color) bg-(--bg-surface) rounded-xl px-4 h-16 focus-within:border-purple-500 dark:focus-within:border-purple-400 transition">
                  <User className="text-(--text-muted)" size={20} />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="bg-transparent w-full h-full outline-none px-4 text-(--text-primary) placeholder:text-(--text-muted)"
                    {...register("fullname", {
                      required: "Full name is required",
                    })}
                  />
                </div>

                {errors.fullname && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1.5 animate-pulse-once">
                    <AlertCircle size={14} />
                    {errors.fullname.message}
                  </p>
                )}
              </div>

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
                <label className="block mb-3 text-sm font-medium text-(--text-secondary)">
                  Password
                </label>

                <div className="flex items-center border border-(--border-color) bg-(--bg-surface) rounded-xl px-4 h-16 focus-within:border-purple-500 dark:focus-within:border-purple-400 transition">
                  <Lock className="text-(--text-muted)" size={20} />

                  <input
                    type="password"
                    placeholder="••••••••"
                    className="bg-transparent w-full h-full outline-none px-4 text-(--text-primary) placeholder:text-(--text-muted)"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                </div>

                {/* Password Strength */}
                <div className="flex gap-2 mt-4">
                  <div className={`h-1 flex-1 rounded-full ${strength.score >= 1 ? strength.barColor : "bg-(--border-color)"}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${strength.score >= 2 ? strength.barColor : "bg-(--border-color)"}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${strength.score >= 3 ? strength.barColor : "bg-(--border-color)"}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${strength.score >= 4 ? strength.barColor : "bg-(--border-color)"}`}></div>
                </div>

                {strength.label && (
                  <p className={`text-sm mt-2 ${strength.colorClass}`}>{strength.label}</p>
                )}

                {errors.password && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1.5 animate-pulse-once">
                    <AlertCircle size={14} />
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Terms disclaimer */}
              <div>
                <p className="text-(--text-muted) text-sm leading-relaxed">
                  By creating an account, you agree to the{" "}
                  <span className="text-purple-600 dark:text-purple-300 font-medium hover:text-purple-500 cursor-pointer">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-purple-600 dark:text-purple-300 font-medium hover:text-purple-500 cursor-pointer">
                    Privacy Policy
                  </span>
                  .
                </p>
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
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>


              {/* Login toggle */}
              <p className="text-center text-(--text-muted) pt-8 text-lg">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/auth/login")}
                  className="text-purple-600 dark:text-purple-300 font-semibold hover:text-purple-500 cursor-pointer"
                >
                  Log In
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

export default Register;