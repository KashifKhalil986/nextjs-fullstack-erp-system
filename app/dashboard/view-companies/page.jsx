"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCompanies } from "@/services/company/company";
import CompanyDrawer from "../../components/CompanyDrawer";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function ViewCompaniesPage() {
  const router = useRouter();

  const { data: companies = [], isLoading: loading, error } = useCompanies();

  const [open, setOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const selectedCompany = companies.find((c) => c.id === selectedCompanyId) || null;

  const handleOpenDrawer = (company) => {
    setSelectedCompanyId(company.id);
    setOpen(true);
  };

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
            className="flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600"
          >
            Back
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error.message}</p>
        ) : (
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

                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDrawer(company);
                    }}
                    className="text-white"
                  >
                    <VisibilityIcon />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedCompany && (
          <CompanyDrawer
            open={open}
            setOpen={setOpen}
            company={selectedCompany}
          />
        )}
      </div>
    </div>
  );
}
