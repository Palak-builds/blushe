import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <h1 className="font-display text-4xl text-plum text-center mb-2 blush-stroke inline-block w-full text-center">
        Welcome Back
      </h1>
      <p className="font-body text-plum/60 text-center mb-10">Sign in to your Blushé account</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm space-y-4">
        {error && <p className="text-wine font-body text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-blush-dark/40 rounded-lg px-4 py-3 font-body"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-blush-dark/40 rounded-lg px-4 py-3 font-body"
        />
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-wine text-white font-body text-sm uppercase tracking-widest hover:bg-wine-dark transition"
        >
          Sign In
        </button>
      </form>

      <p className="text-center font-body text-sm text-plum/60 mt-6">
        New to Blushé?{" "}
        <Link to="/signup" className="text-wine underline underline-offset-2">
          Create an account
        </Link>
      </p>
    </div>
  );
}
