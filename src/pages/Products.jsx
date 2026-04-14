import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const limit = 10;

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        const res = await getProducts(page, limit);
        setProducts(res.products);
        setTotal(res.total);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load products.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel sm:p-8">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Products
            </p>
            <h2 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Browse catalog
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Page {page} of {totalPages}
            </p>
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-slate-600">Loading products...</p>
        ) : null}
        {error ? (
          <p className="text-sm font-medium text-rose-700">{error}</p>
        ) : null}

        {!loading && !error ? (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {products.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <img
                    src={
                      p.thumbnail ||
                      p.images?.[0] ||
                      "https://dummyimage.com/600x400/e5e7eb/6b7280&text=No+Image"
                    }
                    alt={p.title}
                    className="mb-3 aspect-[16/10] w-full rounded-xl border border-slate-200 bg-slate-100 object-cover"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src =
                        "https://dummyimage.com/600x400/e5e7eb/6b7280&text=No+Image";
                    }}
                  />
                  <p className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                    {p.category}
                  </p>
                  <h3 className="mt-3 text-lg font-bold text-slate-900">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{p.description}</p>
                  <strong className="mt-2 inline-block text-slate-900">
                    ${p.price}
                  </strong>
                </Link>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
              <button
                className="rounded-xl border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Previous
              </button>
              <span className="text-sm text-slate-700">
                Page {page} of {totalPages}
              </span>
              <button
                className="rounded-xl border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
