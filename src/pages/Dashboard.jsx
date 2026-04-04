import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel sm:p-8">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-600">Dashboard</p>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">Welcome back</h1>
            <p className="mt-2 text-sm text-slate-600">Choose a section to continue your work.</p>
          </div>
          <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800" onClick={onLogout}>Logout</button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link to="/profile" className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">Protected</p>
            <h2 className="mt-3 text-xl font-bold text-slate-900">Your Profile</h2>
            <p className="mt-1 text-sm text-slate-600">View account details for the currently logged-in user.</p>
          </Link>

          <Link to="/products" className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">Catalog</p>
            <h2 className="mt-3 text-xl font-bold text-slate-900">Products</h2>
            <p className="mt-1 text-sm text-slate-600">Browse paginated products and open complete product details.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}