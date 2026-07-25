export default function Footer() {
  return (
    <footer className="mt-24 border-t border-blush-dark/30 bg-blush-light">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-2xl text-wine mb-2">Blushé</h3>
          <p className="text-sm text-plum/70 font-body">
            Bloom in every shade — makeup and skincare, thoughtfully chosen.
          </p>
        </div>
        <div>
          <h4 className="font-body text-sm uppercase tracking-widest text-plum mb-3">Shop</h4>
          <ul className="space-y-2 text-sm font-body text-plum/70">
            <li>Makeup</li>
            <li>Skincare</li>
            <li>Gift Cards</li>
          </ul>
        </div>
        <div>
          <h4 className="font-body text-sm uppercase tracking-widest text-plum mb-3">Account</h4>
          <ul className="space-y-2 text-sm font-body text-plum/70">
            <li>Orders</li>
            <li>Addresses</li>
            <li>Sign In</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-plum/50 font-body pb-6">
        © {new Date().getFullYear()} Blushé. All rights reserved.
      </div>
    </footer>
  );
}
