"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";

import { createCompany } from "./action";

export default function CreateCompanyComponent({ users }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
  });

  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage({ type: "", text: "" });

    startTransition(async () => {
      try {
        await createCompany({
          ...formData,
          users: selectedUserIds,
        });

        setMessage({
          type: "success",
          text: "Company created successfully!",
        });

        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } catch (error) {
        setMessage({
          type: "error",
          text: error.message || "Something went wrong",
        });
      }
    });
  };

  console.log("usrrs:--", users);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-indigo-600 px-8 py-6 text-center text-white">
            <h1 className="text-2xl font-bold">Create New Company</h1>
            <p className="text-indigo-100">
              Register your business and assign team members
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                placeholder="Company Name"
                value={formData.name}
                onChange={handleInputChange}
                className="border p-2 rounded-lg"
                required
              />

              <input
                name="email"
                placeholder="Company Email"
                value={formData.email}
                onChange={handleInputChange}
                className="border p-2 rounded-lg"
                required
              />

              <input
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleInputChange}
                className="border p-2 rounded-lg col-span-2"
              />
            </div>

            <FormControl fullWidth>
              <InputLabel>Select Users</InputLabel>

              <Select
                multiple
                value={selectedUserIds}
                onChange={(e) => setSelectedUserIds(e.target.value)}
                input={<OutlinedInput label="Select Users" />}
                renderValue={(selected) =>
                  users
                    .filter((u) => selected.includes(u.id))
                    .map((u) => u.name)
                    .join(", ")
                }
              >
                {users.map((user) => (
                  <MenuItem key={`${user.id}`} value={user.id}>
                    <Checkbox checked={selectedUserIds.includes(user.id)} />
                    <ListItemText primary={user.name} secondary={user.email} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* MESSAGE */}
            {message.text && (
              <div
                className={`p-3 rounded-lg text-center ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* BUTTON */}
            <button
              disabled={isPending}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold disabled:opacity-50"
            >
              {isPending ? "Creating..." : "Create Company"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
