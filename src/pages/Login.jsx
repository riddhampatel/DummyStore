import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { login, authLoading, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
      return;
    }

    setError(result.error || "Invalid credentials.");
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-3xl bg-gradient-to-br from-brand-900 via-brand-700 to-cyan-500 p-8 text-white shadow-panel lg:p-10">
          <p className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider">Welcome Back</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight">Sign in to your account</h1>
          <p className="mt-3 text-sky-100">
            Continue to your dashboard to access your profile, browse products, and open product details.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-lg bg-white/20 px-3 py-2 text-xs">Protected routes enabled</span>
            <span className="rounded-lg bg-white/20 px-3 py-2 text-xs">Token-based session</span>
            <span className="rounded-lg bg-white/20 px-3 py-2 text-xs">API validation included</span>
          </div>
          <p className="mt-4 text-sm text-sky-100">
            This DummyJSON demo does not have sign-up in this app. Use login only.
          </p>
        </section>

        <section className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-panel sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">Login</h2>
          <p className="mt-1 text-sm text-slate-600">Use email or username and password to continue.</p>

          <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
            <label className="text-sm font-semibold text-slate-700" htmlFor="email">Email or Username</label>
            <input
              id="email"
              type="text"
              placeholder="name@example.com or michaelw"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-brand-100"
            />

            <label className="text-sm font-semibold text-slate-700" htmlFor="password">Password</label>
            <div className="grid grid-cols-[1fr_auto] gap-2">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-brand-100"
              />
              <button
                type="button"
                className="rounded-xl border border-slate-300 bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}

            <button className="mt-1 w-full rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70" disabled={authLoading}>
              {authLoading ? "Signing in..." : "Sign in"}
            </button>

            <div className="mt-1 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-700">Demo Login</p>
              <p className="mt-1 text-sm text-slate-700">Username: <strong>michaelw</strong> | Password: <strong>michaelwpass</strong></p>
              <button
                type="button"
                className="mt-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                onClick={() => {
                  setEmail("michaelw");
                  setPassword("michaelwpass");
                }}
              >
                Use Demo Credentials
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}