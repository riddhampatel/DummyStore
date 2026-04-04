import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/api";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      setError("");

      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product details.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-panel sm:p-8">
          <p className="text-sm text-slate-600">Loading product details...</p>
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
        {product ? (
          <>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-600">Product Detail</p>
            <h2 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">{product.title}</h2>
            <p className="mt-2 text-sm text-slate-600">Complete details for selected product.</p>

            <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.35fr_0.65fr]">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-700">{product.description}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
                <p className="mb-2"><strong>Price:</strong> ${product.price}</p>
                <p className="mb-2"><strong>Brand:</strong> {product.brand}</p>
                <p className="mb-2"><strong>Category:</strong> {product.category}</p>
                <p className="mb-2"><strong>Rating:</strong> {product.rating}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
              </div>
            </div>
          </>
        ) : (
          <p>No product found.</p>
        )}
      </div>
    </div>
  );
}