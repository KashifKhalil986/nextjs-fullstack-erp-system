"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CompanyDrawer from "../../components/CompanyDrawer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { editCompany, deleteCompany } from "./actions";

export default function ViewCompaniesComponent({ companies, users, services }) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  // Edit Company State
  const [editOpen, setEditOpen] = useState(false);
  const [editCompanyId, setEditCompanyId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editLocation, setEditLocation] = useState("");

  // Delete Company State
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteCompanyId, setDeleteCompanyId] = useState(null);
  const [deleteCompanyName, setDeleteCompanyName] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleOpenEdit = (company) => {
    setEditCompanyId(company.id);
    setEditName(company.name);
    setEditEmail(company.email);
    setEditLocation(company.location || "");
    setErrorMsg("");
    setSuccessMsg("");
    setEditOpen(true);
  };

  const handleOpenDelete = (company) => {
    setDeleteCompanyId(company.id);
    setDeleteCompanyName(company.name);
    setErrorMsg("");
    setSuccessMsg("");
    setDeleteOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const res = await editCompany(editCompanyId, {
      name: editName,
      // email: editEmail,
      location: editLocation,
    });

    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        setEditOpen(false);
        setSuccessMsg("");
      }, 1500);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleDeleteSubmit = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    const res = await deleteCompany(deleteCompanyId);

    if (res.success) {
      setSuccessMsg(res.message);
      if (selectedCompanyId === deleteCompanyId) {
        setSelectedCompanyId(null);
        setOpen(false);
      }
      setTimeout(() => {
        setDeleteOpen(false);
        setSuccessMsg("");
      }, 1500);
    } else {
      setErrorMsg(res.message);
    }
  };

  const selectedCompany =
    companies.find((c) => c.id === selectedCompanyId) || null;

  const handleOpenDrawer = (company) => {
    setSelectedCompanyId(company.id);
    setOpen(true);
  };

  console.log("selected Company:-", selectedCompany);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Registered Companies
            </h1>
            <p className="text-gray-500 mt-1">
              A list of all companies and their assigned team members.
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="text-sm font-medium text-gray-600 hover:text-indigo-600"
          >
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companies.map((company) => (
            <div
              key={company.id}
              onClick={() => handleOpenDrawer(company)}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="bg-indigo-600 p-6 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {company.name}
                  </h3>

                  <div className="text-indigo-100 text-sm mt-2">
                    {company.email}
                  </div>

                  {company.location && (
                    <div className="text-indigo-100 text-sm mt-1">
                      {company.location}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 text-white">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDrawer(company);
                    }}
                    className="hover:text-indigo-200 transition-colors cursor-pointer"
                    title="View Details"
                  >
                    <VisibilityIcon />
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEdit(company);
                    }}
                    className="hover:text-indigo-200 transition-colors cursor-pointer"
                    title="Edit Company"
                  >
                    <EditIcon />
                  </div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDelete(company);
                    }}
                    className="hover:text-red-200 transition-colors cursor-pointer text-red-100"
                    title="Delete Company"
                  >
                    <DeleteIcon />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCompany && (
          <CompanyDrawer
            open={open}
            setOpen={setOpen}
            company={selectedCompany}
            users={users}
            services={services}
          />
        )}
      </div>

      {/* Edit Company Dialog  */}
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="font-bold text-indigo-900 border-b pb-3">
          Edit Company Details
        </DialogTitle>
        <form onSubmit={handleEditSubmit}>
          <DialogContent className="flex flex-col gap-4 pt-4">
            {errorMsg && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-200 text-sm font-medium">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="bg-green-50 text-green-700 p-3 rounded-lg border border-green-200 text-sm font-medium">
                {successMsg}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Company Email
              </label>
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                disabled
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
          </DialogContent>
          <DialogActions className="p-4 bg-gray-50 border-t mt-4">
            <Button
              onClick={() => setEditOpen(false)}
              variant="outlined"
              color="inherit"
              className="capitalize text-gray-600 border-gray-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="capitalize bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4"
            >
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Delete Company Dialog */}
      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle className="font-bold text-gray-900 border-b pb-3">
          Delete Company
        </DialogTitle>
        <DialogContent className="pt-4">
          {errorMsg && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-200 text-sm font-medium mb-3">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-50 text-green-700 p-3 rounded-lg border border-green-200 text-sm font-medium mb-3">
              {successMsg}
            </div>
          )}
          <p className="text-gray-600">
            Are you sure you want to delete company{" "}
            <span className="font-semibold text-gray-900">
              &quot;{deleteCompanyName}&quot;
            </span>
            ? This action cannot be undone.
          </p>
        </DialogContent>
        <DialogActions className="p-4 bg-gray-50 border-t mt-4">
          <Button
            onClick={() => setDeleteOpen(false)}
            variant="outlined"
            color="inherit"
            className="capitalize text-gray-600 border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteSubmit}
            variant="contained"
            color="error"
            className="capitalize bg-red-600 hover:bg-red-700 text-white font-medium px-4"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
