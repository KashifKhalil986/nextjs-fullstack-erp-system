"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSendOtp } from "@/services/users/users";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const router = useRouter();

  const sendOtpMutation = useSendOtp();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    sendOtpMutation.mutate(
      { email },
      {
        onSuccess: (data) => {
          setMessage({ type: "success", text: data.message || "OTP sent successfully" });

          setTimeout(() => {
            router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
          }, 2000);
        },
        onError: (error) => {
          setMessage({
            type: "error",
            text: error.message || "Failed to send OTP",
          });
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900 tracking-tight">
            Forgot Password?
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email and {"we'll"} send you an OTP to reset your password.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm placeholder-gray-400 transition-all"
              placeholder="Email address"
            />
          </div>

          {message.text && (
            <div
              className={`p-4 rounded-lg text-sm font-medium ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={sendOtpMutation.isPending}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {sendOtpMutation.isPending ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send OTP"
              )}
            </button>
          </div>

          <div className="text-center">
            <Link
              href="/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
