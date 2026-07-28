import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => {
      setBestsellers(res.data.filter((p) => p.isBestseller).slice(0, 4));
    });
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="uppercase tracking-[0.3em] text-xs text-gold font-body mb-4">
            Makeup &amp; Skincare
          </p>
          <h1 className="font-display text-6xl md:text-7xl leading-[1.05] text-plum mb-6">
            Bloom in
            <br />
            <span className="blush-stroke">every shade</span>
          </h1>
          <p className="font-body text-plum/70 mb-8 max-w-md">
            Blushé brings together makeup and skincare essentials from brands
            you trust — picked for real skin, real routines, real glow.
          </p>
          <div className="flex gap-4">
            <Link
              to="/makeup"
              className="px-7 py-3 rounded-full bg-wine text-white font-body text-sm uppercase tracking-widest hover:bg-wine-dark transition"
            >
              Shop Makeup
            </Link>
            <Link
              to="/skincare"
              className="px-7 py-3 rounded-full border border-wine text-wine font-body text-sm uppercase tracking-widest hover:bg-wine hover:text-white transition"
            >
              Shop Skincare
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 bg-blush rounded-[3rem] rotate-3 opacity-60" />
          <img
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800"
            alt="Blushé beauty essentials"
            className="relative rounded-[3rem] shadow-xl w-full aspect-[4/5] object-cover"
          />
        </div>
      </section>

      {/* CATEGORY TILES */}
      <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-6 mb-24">
        <Link to="/makeup" className="group relative rounded-2xl overflow-hidden h-64">
          <img
            src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800"
            alt="Makeup collection"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-plum/40 flex items-end p-6">
            <h2 className="font-display text-3xl text-white blush-stroke">Makeup</h2>
          </div>
        </Link>
        <Link to="/skincare" className="group relative rounded-2xl overflow-hidden h-64">
          <img
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800"
            alt="Skincare collection"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-plum/40 flex items-end p-6">
            <h2 className="font-display text-3xl text-white blush-stroke">Skincare</h2>
          </div>
        </Link>
      </section>

      {/* BESTSELLERS */}
      {bestsellers.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-display text-4xl text-plum">Bestsellers</h2>
            <div className="blush-divider" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bestsellers.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
