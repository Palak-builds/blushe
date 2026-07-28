import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function CategoryPage({ category }) {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/products", { params: { category, sort: sort || undefined } })
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, [category, sort]);

  const title = category === "makeup" ? "Makeup" : "Skincare";

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
        <div>
          <h1 className="font-display text-5xl text-plum blush-stroke inline-block">{title}</h1>
          <p className="text-plum/60 font-body mt-2">{products.length} products</p>
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="font-body text-sm border border-blush-dark rounded-full px-4 py-2 bg-white text-plum"
        >
          <option value="">Sort: Featured</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {loading ? (
        <p className="font-body text-plum/60">Loading products…</p>
      ) : products.length === 0 ? (
        <p className="font-body text-plum/60">No products found in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
