import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks.ts";
import { signup } from "../features/auth/authSlice.ts";

export default function SignupPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { username, email, password } = form;

    if (username && email && password) {
      // Store in localStorage
      const user = { username, email, password };
      localStorage.setItem("user", JSON.stringify(user));

      //   dispatch(signup({ username }));
      alert("Signup successful! Please log in.");
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        <input
          className="w-full mb-3 p-2 border rounded"
          name="username"
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          className="w-full mb-3 p-2 border rounded"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="w-full mb-3 p-2 border rounded"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          type="submit"
        >
          Signup
        </button>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-500 text-sm">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
}
