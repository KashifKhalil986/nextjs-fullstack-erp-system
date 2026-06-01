"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useServices,
  useCreateService,
} from "@/services/services/services";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

export default function ServicesPage() {
  const router = useRouter();
  const { data: services = [], isLoading, error } = useServices();
  const createServiceMutation = useCreateService();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState("");

  const handleOpen = () => {
    setName("");
    setDescription("");
    setFormError("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError("Service name is required");
      return;
    }

    createServiceMutation.mutate(
      { name, description },
      {
        onSuccess: () => {
          handleClose();
        },
        onError: (err) => {
          setFormError(err.message || "Failed to create service");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Corporate Services
            </h1>
            <p className="text-gray-500 mt-1">
              Create and manage services that can be assigned to companies.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleOpen}
              className="bg-violet-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-violet-700 transition-colors"
            >
              Create Service
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="text-sm font-medium text-gray-600 hover:text-indigo-600"
            >
              Back
            </button>
          </div>
        </div>

        {isLoading ? (
          <p className="text-gray-500">Loading services...</p>
        ) : error ? (
          <p className="text-red-600">{error.message}</p>
        ) : services.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No services found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new service.
            </p>
            <div className="mt-6">
              <button
                onClick={handleOpen}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700"
              >
                Create Service
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800">
                      Service
                    </span>
                    <span className="text-xs text-gray-500">
                      Assigned to {service.Companies?.length || 0} companies
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                    {service.description || "No description provided."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create New Service</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}>
              <TextField
                label="Service Name"
                variant="outlined"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!formError && formError.toLowerCase().includes("name")}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {formError && (
                <p className="text-sm text-red-600 mt-1 font-medium">{formError}</p>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={createServiceMutation.isPending}
            >
              {createServiceMutation.isPending ? "Creating..." : "Create Service"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
