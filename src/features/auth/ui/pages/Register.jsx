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
      return { score, label: "Medium password", colorClass: "text-amber-400", barColor: "bg-amber-400" };
    } else {
      return { score, label: "Strong password", colorClass: "text-purple-300", barColor: "bg-purple-400" };
    }
  };

  const strength = getPasswordStrength(passwordVal);

  return (
    <div className="min-h-screen bg-[#09070F] text-white flex flex-col">
      {/* Main Section */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left Side */}
        <div className="relative hidden lg:flex lg:w-1/2 border-r border-white/10 overflow-hidden">
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
            alt="ai-bg"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#08112B]/70 to-[#09070F]" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between p-12 w-full">
            {/* Logo */}
            <h1 className="text-3xl font-bold tracking-wide">team-sync</h1>

            {/* Bottom Content */}
            <div className="space-y-8">
              <div className="flex items-center gap-2 text-sm tracking-[0.3em] uppercase text-purple-300">
                <Sparkles size={16} />
                <span>Next-Gen Intelligence</span>
              </div>

              <div>
                <h2 className="text-5xl font-bold leading-tight max-w-xl">
                  Accelerate your team's intelligence.
                </h2>

                <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-lg">
                  Connect your enterprise data to our specialized AI models and
                  unlock unparalleled strategic insights in seconds.
                </p>
              </div>

              <div className="flex items-center gap-16 pt-8">
                <div>
                  <h3 className="text-4xl font-bold">99.9%</h3>
                  <p className="text-gray-400 mt-1">Uptime SLA</p>
                </div>

                <div>
                  <h3 className="text-4xl font-bold">ISO</h3>
                  <p className="text-gray-400 mt-1">27001 Certified</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-1 items-center justify-center px-6 py-14">
          <div className="w-full max-w-xl">
            <div className="mb-10">
              <h1 className="text-5xl font-bold">Create your account</h1>

              <p className="text-gray-400 mt-4 text-lg">
                Experience the future of collaborative data intelligence.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onRegisterSubmit)}
              className="space-y-7"
            >
              {/* Full Name */}
              <div>
                <label className="block mb-3 text-sm font-medium text-gray-300">
                  Full Name
                </label>

                <div className="flex items-center border border-white/10 bg-white/[0.03] rounded-xl px-4 h-16 focus-within:border-purple-400 transition">
                  <User className="text-gray-500" size={20} />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="bg-transparent w-full h-full outline-none px-4 text-white placeholder:text-gray-500"
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
                <label className="block mb-3 text-sm font-medium text-gray-300">
                  Email Address
                </label>

                <div className="flex items-center border border-white/10 bg-white/[0.03] rounded-xl px-4 h-16 focus-within:border-purple-400 transition">
                  <Mail className="text-gray-500" size={20} />

                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="bg-transparent w-full h-full outline-none px-4 text-white placeholder:text-gray-500"
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
                <label className="block mb-3 text-sm font-medium text-gray-300">
                  Password
                </label>

                <div className="flex items-center border border-white/10 bg-white/[0.03] rounded-xl px-4 h-16 focus-within:border-purple-400 transition">
                  <Lock className="text-gray-500" size={20} />

                  <input
                    type="password"
                    placeholder="••••••••"
                    className="bg-transparent w-full h-full outline-none px-4 text-white placeholder:text-gray-500"
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
                  <div className={`h-1 flex-1 rounded-full ${strength.score >= 1 ? strength.barColor : "bg-white/10"}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${strength.score >= 2 ? strength.barColor : "bg-white/10"}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${strength.score >= 3 ? strength.barColor : "bg-white/10"}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${strength.score >= 4 ? strength.barColor : "bg-white/10"}`}></div>
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

              {/* Checkbox */}
              <div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 w-5 h-5 rounded border border-white/20 bg-transparent accent-purple-500 animate-pulse-once"
                    {...register("terms", {
                      required: "You must agree to the Terms of Service and Privacy Policy",
                    })}
                  />

                  <p className="text-gray-400 text-sm leading-relaxed">
                    I agree to the{" "}
                    <span className="text-purple-300 cursor-pointer">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="text-purple-300 cursor-pointer">
                      Privacy Policy
                    </span>
                    .
                  </p>
                </div>

                {errors.terms && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1.5 animate-pulse-once">
                    <AlertCircle size={14} />
                    {errors.terms.message}
                  </p>
                )}
              </div>

               {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-16 rounded-xl bg-gradient-to-r from-purple-600 to-purple-300 text-black font-semibold text-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>



              {/* Login */}
              <p className="text-center text-gray-400 pt-8 text-lg">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/auth/login")}
                  className="text-purple-300 font-semibold cursor-pointer"
                >
                  Log In
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-8 py-6 flex flex-col lg:flex-row items-center justify-between gap-5 text-sm text-gray-400">
        <h2 className="text-2xl font-bold text-white">team-sync</h2>

        <div className="flex items-center gap-8">
          <p className="hover:text-white cursor-pointer">Privacy Policy</p>

          <p className="hover:text-white cursor-pointer">Terms of Service</p>

          <p className="hover:text-white cursor-pointer">Security</p>

          <p className="hover:text-white cursor-pointer">System Status</p>
        </div>

        <p>© 2026 team-sync. Enterprise Intelligence Platforms.</p>
      </footer>
    </div>
  );
};

export default Register;