"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUsers } from "@/services/users/users";
import { useCreateCompany } from "@/services/company/company";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";

export default function CreateCompanyPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
  });

  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const { data: users = [], isLoading: fetchingUsers } = useUsers();

  const createCompanyMutation = useCreateCompany();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage({
      type: "",
      text: "",
    });

    createCompanyMutation.mutate(
      {
        ...formData,
        users: selectedUserIds,
      },
      {
        onSuccess: () => {
          setMessage({
            type: "success",
            text: "Company created successfully!",
          });

          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        },

        onError: (error) => {
          setMessage({
            type: "error",
            text: error.message || "Failed to connect to server",
          });
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Dashboard
        </button>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="bg-indigo-600 px-8 py-6">
            <h1 className="text-2xl font-bold text-white text-center">
              Create New Company
            </h1>

            <p className="text-indigo-100 text-center mt-1">
              Register your business and assign team members
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
                Company Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="Acme Corp"
                  />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company Email
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="contact@acme.com"
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location
                  </label>

                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="San Francisco, CA"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <h2 className="text-lg font-semibold text-gray-900">
                  Assign Users
                </h2>

                <div className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  {selectedUserIds.length} Selected
                </div>
              </div>

              {fetchingUsers ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mb-2"></div>

                  <p className="text-gray-500">Loading users...</p>
                </div>
              ) : (
                <FormControl fullWidth>
                  <InputLabel id="users-select-label">Select Users</InputLabel>

                  <Select
                    labelId="users-select-label"
                    multiple
                    value={selectedUserIds}
                    onChange={(e) => setSelectedUserIds(e.target.value)}
                    input={<OutlinedInput label="Select Users" />}
                    renderValue={(selected) =>
                      users
                        .filter((user) => selected.includes(user.id))
                        .map((user) => user.name)
                        .join(", ")
                    }
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 300,
                        },
                      },
                    }}
                  >
                    {users.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        <Checkbox checked={selectedUserIds.includes(user.id)} />

                        <ListItemText
                          primary={user.name}
                          secondary={user.email}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </div>

            {message.text && (
              <div
                className={`p-4 rounded-lg text-sm font-medium text-center ${
                  message.type === "success"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={createCompanyMutation.isPending}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95 ${
                createCompanyMutation.isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200"
              }`}
            >
              {createCompanyMutation.isPending ? (
                <span className="flex items-center justify-center">
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
                  Processing...
                </span>
              ) : (
                "Create Company"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
