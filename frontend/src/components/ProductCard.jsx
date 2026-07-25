import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const price = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <Link
      to={`/product/${product._id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-blush-light">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.isBestseller && (
          <span className="absolute top-3 left-3 bg-wine text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded-full">
            Bestseller
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-widest text-gold font-body">{product.brand}</p>
        <h3 className="font-display text-lg text-plum leading-tight mt-1 mb-2">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="font-body font-medium text-wine">₹{price}</span>
          {hasDiscount && (
            <span className="text-xs text-plum/40 line-through font-body">₹{product.price}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
