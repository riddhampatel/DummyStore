import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getCurrentUser } from "../services/api";

export default function Profile() {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      setError("");

      try {
        const data = await getCurrentUser(token);
        setUser(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load profile.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel sm:p-8">
          <p className="text-sm text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel sm:p-8">
          <p className="text-sm font-medium text-rose-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel sm:p-8">
        {user ? (
          <>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Protected Profile
            </p>
            <h2 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              {user.firstName} {user.lastName}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Only your own profile is shown after login.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Email
                </h3>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {user.email}
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Username
                </h3>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {user.username}
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Phone
                </h3>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {user.phone || "Not available"}
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Address
                </h3>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {user.address?.city || "Not available"}
                </p>
              </article>
            </div>
          </>
        ) : (
          <p>No user data found.</p>
        )}
      </div>
    </div>
  );
}
