import React from "react";
import { Mail, Lock, Sparkles, ShieldCheck } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  let { register, handleSubmit, onLoginSubmit, errors, navigate } = useAuth();

  return (
    <div className="min-h-screen bg-[#09070F] text-white flex flex-col">
      {/* Main Section */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left Side */}
        <div className="relative hidden lg:flex lg:w-1/2 border-r border-white/10 overflow-hidden">
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop"
            alt="security-bg"
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
                <ShieldCheck size={16} />
                <span>Secure Authorization</span>
              </div>

              <div>
                <h2 className="text-5xl font-bold leading-tight max-w-xl">
                  Securely access your workspace.
                </h2>

                <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-lg">
                  Authenticate with your corporate credentials to access your organization's synchronized dashboard, projects, and integrations.
                </p>
              </div>

              <div className="flex items-center gap-16 pt-8">
                <div>
                  <h3 className="text-4xl font-bold">256-bit</h3>
                  <p className="text-gray-400 mt-1">AES Encryption</p>
                </div>

                <div>
                  <h3 className="text-4xl font-bold">SOC2</h3>
                  <p className="text-gray-400 mt-1">Type II Certified</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-1 items-center justify-center px-6 py-14">
          <div className="w-full max-w-xl">
            <div className="mb-10">
              <h1 className="text-5xl font-bold">Welcome back</h1>

              <p className="text-gray-400 mt-4 text-lg">
                Experience the future of collaborative data intelligence.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onLoginSubmit)}
              className="space-y-7"
            >
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
                  <p className="text-red-400 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-300">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-sm text-purple-300 hover:text-purple-200"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="flex items-center border border-white/10 bg-white/[0.03] rounded-xl px-4 h-16 focus-within:border-purple-400 transition">
                  <Lock className="text-gray-500" size={20} />

                  <input
                    type="password"
                    placeholder="••••••••"
                    className="bg-transparent w-full h-full outline-none px-4 text-white placeholder:text-gray-500"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                </div>

                {errors.password && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border border-white/20 bg-transparent accent-purple-500"
                  {...register("remember")}
                />

                <p className="text-gray-400 text-sm">Stay signed in</p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full h-16 rounded-xl bg-gradient-to-r from-purple-600 to-purple-300 text-black font-semibold text-lg hover:opacity-90 transition"
              >
                Sign In
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 py-2">
                <div className="h-px flex-1 bg-white/10"></div>

                <p className="text-sm text-gray-500">OR CONTINUE WITH</p>

                <div className="h-px flex-1 bg-white/10"></div>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-5">
                <button
                  type="button"
                  className="h-16 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition flex items-center justify-center gap-3"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                    alt="google"
                    className="w-5 h-5"
                  />

                  <span className="text-lg">Google</span>
                </button>

                <button
                  type="button"
                  className="h-16 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition flex items-center justify-center gap-3"
                >
                  <ShieldCheck size={20} />

                  <span className="text-lg">SSO</span>
                </button>
              </div>

              {/* Register link */}
              <p className="text-center text-gray-400 pt-8 text-lg">
                Don&apos;t have an account?{" "}
                <span
                  onClick={() => navigate("/auth/register")}
                  className="text-purple-300 font-semibold cursor-pointer"
                >
                  Sign Up
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

        <p>© 2024 team-sync. Enterprise Intelligence Platforms.</p>
      </footer>
    </div>
  );
};

export default Login;