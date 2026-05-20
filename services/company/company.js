import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const companyKeys = {
  all: ["companies"],
};

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || "An error occurred");
  }
  return data;
}

export async function getCompanies() {
  const res = await fetch("/api/company");
  return handleResponse(res);
}

export async function createCompany(payload) {
  const res = await fetch("/api/company", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function addUsersToCompany({ companyId, userIds }) {
  const res = await fetch("/api/company-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ companyId, userIds }),
  });
  return handleResponse(res);
}

export async function removeUserFromCompany({ companyId, userId }) {
  const res = await fetch("/api/company-user", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ companyId, userId }),
  });
  return handleResponse(res);
}

export function useCompanies(options = {}) {
  return useQuery({
    queryKey: companyKeys.all,
    queryFn: getCompanies,
    ...options,
  });
}

export function useCreateCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companyKeys.all });
    },
  });
}

export function useAddUsersToCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUsersToCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companyKeys.all });
    },
  });
}

export function useRemoveUserFromCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeUserFromCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companyKeys.all });
    },
  });
}
