import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const serviceKeys = {
  all: ["services"],
};

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || "An error occurred");
  }
  return data;
}

export async function getServices() {
  const res = await fetch("/api/services");
  return handleResponse(res);
}

export async function createService(payload) {
  const res = await fetch("/api/services", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function addServicesToCompany({ companyId, serviceIds }) {
  const res = await fetch("/api/company-service", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ companyId, serviceIds }),
  });
  return handleResponse(res);
}

export async function removeServiceFromCompany({ companyId, serviceId }) {
  const res = await fetch("/api/company-service", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ companyId, serviceId }),
  });
  return handleResponse(res);
}

export function useServices(options = {}) {
  return useQuery({
    queryKey: serviceKeys.all,
    queryFn: getServices,
    ...options,
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all });
    },
  });
}

export function useAddServicesToCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addServicesToCompany,
    onSuccess: () => {
      (queryClient.invalidateQueries({ queryKey: ["companies"] }),
        queryClient.invalidateQueries({ queryKey: serviceKeys.all }));
    },
  });
}

export function useRemoveServiceFromCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeServiceFromCompany,
    onSuccess: () => {
      (queryClient.invalidateQueries({ queryKey: ["companies"] }),
        queryClient.invalidateQueries({ queryKey: serviceKeys.all }));
    },
  });
}
