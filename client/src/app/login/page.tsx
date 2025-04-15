"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAppDispatch } from "../redux";
import { setUser } from "@/state";
import { User } from "@/state/api";


export default function LoginPage() {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
  
      const data = await response.json();
      console.log("API Response:", data); // Log the API response
  
      if (response.ok) {
        dispatch(setUser(data.user)); // Update Redux state with user data
        Cookies.set("token", data.token, { expires: 1 }); // Save token in cookies
        router.push("/"); // Redirect to homepage
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:text-white dark:bg-[#131720]">
      <div className="w-full max-w-md p-8 bg-neutral-200 rounded shadow-md dark:bg-[#485365]">
        <h1 className="text-2xl font-bold text-center mb-6 dark:text-white ">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="">
            <label className="block text-sm font-medium text-gray-700 dark:text-white ">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded bg-slate-50 dark:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded bg-slate-50 dark:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 text-white bg-[#0c0e14] rounded hover:bg-[#0c0e14]/80"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}