"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { createService, deleteService } from "./action";

export default function ServicesPage({ serviceData = [] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Create dialog state
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formError, setFormError] = useState("");

  // Delete dialog state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // ── Create handlers ──────────────────────────────────
  const handleOpen = () => {
    setName("");
    setDescription("");
    setImageFile(null);
    setImagePreview(null);
    setFormError("");
    setOpen(true);
  };

  const handleClose = () => {
    if (isPending) return;
    setOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return setFormError("Service name is required.");
    if (!description.trim()) return setFormError("Description is required.");
    setFormError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);

    startTransition(async () => {
      const result = await createService(formData);
      if (result.success) {
        showSnackbar("Service created successfully!");
        handleClose();
      } else {
        setFormError(
          result.message ||
            Object.values(result.errors || {})
              .flat()
              .join(", "),
        );
      }
    });
  };

  // ── Delete handlers ──────────────────────────────────
  const handleDeleteOpen = (service) => {
    setServiceToDelete(service);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    if (isDeleting) return;
    setServiceToDelete(null);
    setDeleteOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (!serviceToDelete) return;
    setIsDeleting(true);

    const result = await deleteService(serviceToDelete.id);

    setIsDeleting(false);
    handleDeleteClose();

    if (result.success) {
      showSnackbar("Service deleted successfully!", "success");
    } else {
      showSnackbar(result.message || "Failed to delete service.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
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
              + Create Service
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="text-sm font-medium text-gray-600 hover:text-indigo-600"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Empty State */}
        {serviceData.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
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
            <h3 className="mt-4 text-sm font-semibold text-gray-900">
              No services found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new service.
            </p>
            <button
              onClick={handleOpen}
              className="mt-6 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700"
            >
              Create Service
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceData.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Image */}
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-44 object-cover"
                  />
                ) : (
                  <div className="w-full h-44 bg-violet-50 flex items-center justify-center">
                    <svg
                      className="h-12 w-12 text-violet-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800">
                        Service
                      </span>
                      <span className="text-xs text-gray-400">
                        {service.Companies?.length || 0} companies
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {service.name}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-3">
                      {service.description || "No description provided."}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteOpen(service)}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 hover:border-red-300 transition-colors"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Create Service Dialog ── */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 700 }}>Create New Service</DialogTitle>
        <DialogContent>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}
          >
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
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={
                !!formError && formError.toLowerCase().includes("description")
              }
            />
            <Button
              variant="outlined"
              component="label"
              sx={{
                textTransform: "none",
                py: 1.5,
                borderColor: "#7c3aed",
                color: "#7c3aed",
                "&:hover": { borderColor: "#6d28d9", bgcolor: "#f5f3ff" },
              }}
            >
              {imageFile ? "Change Image" : "Upload Service Image (Optional)"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {imagePreview && (
              <Box sx={{ position: "relative" }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-xl border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow text-gray-500 hover:text-red-500 text-xs"
                >
                  ✕ Remove
                </button>
              </Box>
            )}
            {formError && (
              <p className="text-sm text-red-600 font-medium">{formError}</p>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose} color="inherit" disabled={isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={isPending}
            sx={{
              bgcolor: "#7c3aed",
              "&:hover": { bgcolor: "#6d28d9" },
              textTransform: "none",
              px: 3,
            }}
          >
            {isPending ? "Creating..." : "Create Service"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Delete Confirm Dialog ── */}
      <Dialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Service</DialogTitle>
        <DialogContent>
          <p className="text-gray-600 text-sm">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-900">
              {serviceToDelete?.name}
            </span>
            ?
            {serviceToDelete?.image && (
              <span> This will also remove the image from Cloudinary.</span>
            )}
            <span className="block mt-1 text-red-500">
              This action cannot be undone.
            </span>
          </p>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleDeleteClose}
            color="inherit"
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            disabled={isDeleting}
            sx={{
              bgcolor: "#dc2626",
              "&:hover": { bgcolor: "#b91c1c" },
              textTransform: "none",
              px: 3,
            }}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
