"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyOtp, useResetPassword, useSendOtp } from "@/services/users/users";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const [step, setStep] = useState(1);

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [cooldown, setCooldown] = useState(60);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!email) router.push("/forgot-password");
  }, [email, router]);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const verifyOtpMutation = useVerifyOtp();
  const resetPasswordMutation = useResetPassword();
  const sendOtpMutation = useSendOtp();

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      setMessage("Enter valid 6-digit OTP");
      return;
    }

    setMessage("");

    verifyOtpMutation.mutate(
      { email, otp },
      {
        onSuccess: () => {
          setMessage("OTP Verified");
          setStep(2);
        },
        onError: (error) => {
          setMessage(error.message || "Invalid OTP");
        },
      }
    );
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    resetPasswordMutation.mutate(
      { email, otp, newPassword },
      {
        onSuccess: () => {
          setMessage("Password reset successful");
          setTimeout(() => router.push("/login"), 2000);
        },
        onError: (error) => {
          setMessage(error.message || "Failed to reset password");
        },
      }
    );
  };

  const handleResendOtp = () => {
    if (cooldown > 0 || sendOtpMutation.isPending) return;

    sendOtpMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setMessage("OTP sent again");
          setCooldown(60);
        },
        onError: (error) => {
          setMessage(error.message || "Failed to resend OTP");
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>

        <p className="text-center text-sm text-gray-500 mb-4">{email}</p>

        {step === 1 && (
          <>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter OTP"
              className="w-full border p-2 rounded mb-3 text-center text-lg tracking-widest"
            />

            <button
              onClick={handleVerifyOtp}
              disabled={verifyOtpMutation.isPending}
              className="w-full bg-blue-600 text-white p-2 rounded"
            >
              {verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="text-center mt-4">
              <button
                onClick={handleResendOtp}
                disabled={cooldown > 0 || sendOtpMutation.isPending}
                className="text-sm text-blue-600 disabled:text-gray-400"
              >
                {sendOtpMutation.isPending
                  ? "Resending..."
                  : cooldown > 0
                    ? `Resend OTP in ${cooldown}s`
                    : "Resend OTP"}
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border p-2 rounded mb-2"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />

            <button
              onClick={handleResetPassword}
              disabled={resetPasswordMutation.isPending}
              className="w-full bg-green-600 text-white p-2 rounded"
            >
              {resetPasswordMutation.isPending ? "Updating..." : "Reset Password"}
            </button>
          </>
        )}

        {message && (
          <p className="text-center text-sm mt-3 text-green-500">{message}</p>
        )}
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white w-full max-w-md p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    }>
      <VerifyOtpContent />
    </Suspense>
  );
}
