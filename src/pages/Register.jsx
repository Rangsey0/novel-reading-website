import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    userEmail: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const newUser = {
      userName: form.userName,
      userEmail: form.userEmail,
      password: form.password,
      profileImage: "https://i.pravatar.cc/300",
    };

    localStorage.setItem("registeredUser", JSON.stringify(newUser));

    alert("Registration successful!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-black dark:text-white">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={form.userName}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />

          <input
            type="email"
            name="userEmail"
            placeholder="Email"
            value={form.userEmail}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-500 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
