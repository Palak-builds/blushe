import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-blush-bg/90 backdrop-blur border-b border-blush-dark/30">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-3xl tracking-wide text-wine">
          Blushé
        </Link>

        <nav className="hidden md:flex items-center gap-8 font-body text-sm uppercase tracking-widest text-plum">
          <Link className="nav-link" to="/makeup">Makeup</Link>
          <Link className="nav-link" to="/skincare">Skincare</Link>
          {user && <Link className="nav-link" to="/orders">Orders</Link>}
        </nav>

        <div className="flex items-center gap-5">
          <Link to="/cart" className="relative text-plum">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.994-4.694 2.616-7.163a.75.75 0 00-.734-.947H5.106M7.5 14.25L5.106 5.25M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-wine text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/account" className="text-sm font-body text-plum nav-link">
                Hi, {user.name?.split(" ")[0]}
              </Link>
              <button
                onClick={() => { logout(); navigate("/"); }}
                className="text-sm font-body text-wine underline underline-offset-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm font-body px-4 py-2 rounded-full bg-wine text-white hover:bg-wine-dark transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
