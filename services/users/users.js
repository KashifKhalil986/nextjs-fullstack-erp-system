import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const userKeys = {
  all: ["users"],
  currentUser: ["currentUser"],
};

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || "An error occurred");
  }
  return data;
}

export async function getCurrentUser() {
  const res = await fetch("/api/auth/me");
  return handleResponse(res);
}

export async function login({ email, password }) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
}

export async function signup({ name, email, password }) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return handleResponse(res);
}

export async function logout() {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
  });
  return handleResponse(res);
}

export async function sendOtp({ email }) {
  const res = await fetch("/api/auth/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return handleResponse(res);
}

export async function verifyOtp({ email, otp }) {
  const res = await fetch("/api/auth/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });
  return handleResponse(res);
}

export async function resetPassword({ email, otp, newPassword }) {
  const res = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp, newPassword }),
  });
  return handleResponse(res);
}

export async function getUsers() {
  const res = await fetch("/api/users");
  return handleResponse(res);
}

export function useCurrentUser() {
  return useQuery({
    queryKey: userKeys.currentUser,
    queryFn: getCurrentUser,
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(userKeys.currentUser, data);
    },
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: signup,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(userKeys.currentUser, null);
    },
  });
}

export function useSendOtp() {
  return useMutation({
    mutationFn: sendOtp,
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: verifyOtp,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
  });
}

export function useUsers(options = {}) {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: getUsers,
    ...options,
  });
}
