"use client";

import { useState } from "react";
import {
  SwipeableDrawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useUsers } from "@/services/users/users";
import { useAddUsersToCompany, useRemoveUserFromCompany } from "@/services/company/company";
import { useServices, useAddServicesToCompany, useRemoveServiceFromCompany } from "@/services/services/services";

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function CompanyDrawer({ open, setOpen, company }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [addOpen, setAddOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [confirmServiceOpen, setConfirmServiceOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const [addServiceOpen, setAddServiceOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  const { data: allUsers = [] } = useUsers({ enabled: addOpen });
  const { data: allServices = [] } = useServices({ enabled: addServiceOpen });

  const assignedUsers = company?.Users || [];
  const assignedUserIds = assignedUsers.map((u) => u.id);
  const availableUsers = allUsers.filter(
    (user) => !assignedUserIds.includes(user.id),
  );

  const assignedServices = company?.Services || [];
  const assignedServiceIds = assignedServices.map((s) => s.id);
  const availableServices = allServices.filter(
    (service) => !assignedServiceIds.includes(service.id),
  );

  const openConfirmDialog = (userId) => {
    setSelectedUserId(userId);
    setConfirmOpen(true);
  };

  const closeConfirmDialog = () => {
    setSelectedUserId(null);
    setConfirmOpen(false);
  };

  const deleteUserMutation = useRemoveUserFromCompany();
  const deleteServiceMutation = useRemoveServiceFromCompany();

  const closeAddUserModal = () => {
    setSelectedUsers([]);
    setAddOpen(false);
  };

  const addUsersMutation = useAddUsersToCompany();
  const addServicesMutation = useAddServicesToCompany();

  const handleDeleteUser = () => {
    if (selectedUserId) {
      deleteUserMutation.mutate(
        { companyId: company.id, userId: selectedUserId },
        {
          onSuccess: () => {
            closeConfirmDialog();
          },
          onError: (error) => {
            console.error("Delete Error:", error);
          },
        },
      );
    }
  };

  const openAddUserModal = () => {
    setSelectedUsers([]);
    setAddOpen(true);
  };

  const toggleUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id],
    );
  };

  const handleAddUsers = () => {
    if (selectedUsers.length > 0) {
      addUsersMutation.mutate(
        { companyId: company.id, userIds: selectedUsers },
        {
          onSuccess: () => {
            closeAddUserModal();
          },
          onError: (error) => {
            console.error("Add Users Error:", error);
          },
        },
      );
    }
  };

  const openConfirmServiceDialog = (serviceId) => {
    setSelectedServiceId(serviceId);
    setConfirmServiceOpen(true);
  };

  const closeConfirmServiceDialog = () => {
    setSelectedServiceId(null);
    setConfirmServiceOpen(false);
  };

  const handleDeleteService = () => {
    if (selectedServiceId) {
      deleteServiceMutation.mutate(
        { companyId: company.id, serviceId: selectedServiceId },
        {
          onSuccess: () => {
            closeConfirmServiceDialog();
          },
          onError: (error) => {
            console.error("Delete Service Error:", error);
          },
        },
      );
    }
  };

  const openAddServiceModal = () => {
    setSelectedServices([]);
    setAddServiceOpen(true);
  };

  const closeAddServiceModal = () => {
    setSelectedServices([]);
    setAddServiceOpen(false);
  };

  const toggleService = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleAddServices = () => {
    if (selectedServices.length > 0) {
      addServicesMutation.mutate(
        { companyId: company.id, serviceIds: selectedServices },
        {
          onSuccess: () => {
            closeAddServiceModal();
          },
          onError: (error) => {
            console.error("Add Services Error:", error);
          },
        },
      );
    }
  };

  return (
    <>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Box sx={{ width: 400, p: 3 }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Company Details
            </Typography>

            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">{company?.name}</Typography>
          <Typography color="text.secondary">{company?.email}</Typography>

          {company?.location && (
            <Typography color="text.secondary">{company.location}</Typography>
          )}

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography fontWeight="bold">
              Users ({assignedUsers.length})
            </Typography>

            <IconButton onClick={openAddUserModal}>
              <PersonAddIcon />
            </IconButton>
          </Box>

          {assignedUsers.length > 0 ? (
            assignedUsers.map((user) => (
              <Box
                key={user.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1.5,
                  mb: 1,
                  bgcolor: "#f5f5f5",
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Avatar sx={{ width: 30, height: 30 }}>
                    {user.name?.charAt(0).toUpperCase()}
                  </Avatar>

                  <Box>
                    <Typography fontWeight={600}>{user.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>
                </Box>

                <IconButton
                  color="error"
                  size="small"
                  onClick={() => openConfirmDialog(user.id)}
                  disabled={
                    deleteUserMutation.isPending && selectedUserId === user.id
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary" sx={{ mb: 2 }}>No users assigned</Typography>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Services Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography fontWeight="bold">
              Services ({assignedServices.length})
            </Typography>

            <IconButton onClick={openAddServiceModal}>
              <SettingsIcon />
            </IconButton>
          </Box>

          {assignedServices.length > 0 ? (
            assignedServices.map((service) => (
              <Box
                key={service.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1.5,
                  mb: 1,
                  bgcolor: "#f3e8ff",
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Avatar sx={{ width: 30, height: 30, bgcolor: "#8b5cf6" }}>
                    <AssignmentIcon sx={{ fontSize: 18, color: "#fff" }} />
                  </Avatar>

                  <Box>
                    <Typography fontWeight={600} color="#581c87">{service.name}</Typography>
                    {service.description && (
                      <Typography variant="body2" color="text.secondary" sx={{ lineClamp: 1, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {service.description}
                      </Typography>
                    )}
                  </Box>
                </Box>

                <IconButton
                  color="error"
                  size="small"
                  onClick={() => openConfirmServiceDialog(service.id)}
                  disabled={
                    deleteServiceMutation.isPending && selectedServiceId === service.id
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary">No services assigned</Typography>
          )}
        </Box>
      </SwipeableDrawer>

      <Dialog open={confirmOpen} onClose={closeConfirmDialog}>
        <DialogTitle>Remove User</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to remove this user from the company?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeConfirmDialog}>Cancel</Button>

          <Button
            onClick={handleDeleteUser}
            color="error"
            variant="contained"
            disabled={deleteUserMutation.isPending}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={addOpen}
        onClose={closeAddUserModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Users to Company</DialogTitle>

        <DialogContent>
          {availableUsers.length > 0 ? (
            availableUsers.map((user) => (
              <Box
                key={user.id}
                onClick={() => toggleUser(user.id)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 1.5,
                  mb: 1,
                  bgcolor: selectedUsers.includes(user.id)
                    ? "#e3f2fd"
                    : "#f5f5f5",
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                <Box>
                  <Typography fontWeight={600}>{user.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary">
              No available users to add.
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={closeAddUserModal}>Cancel</Button>

          <Button
            onClick={handleAddUsers}
            variant="contained"
            disabled={addUsersMutation.isPending || selectedUsers.length === 0}
          >
            {addUsersMutation.isPending ? "Adding..." : "Add Users"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Remove Service Confirmation */}
      <Dialog open={confirmServiceOpen} onClose={closeConfirmServiceDialog}>
        <DialogTitle>Remove Service</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to remove this service from the company?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeConfirmServiceDialog}>Cancel</Button>

          <Button
            onClick={handleDeleteService}
            color="error"
            variant="contained"
            disabled={deleteServiceMutation.isPending}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Services Dialog */}
      <Dialog
        open={addServiceOpen}
        onClose={closeAddServiceModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Assign Services to Company</DialogTitle>

        <DialogContent>
          {availableServices.length > 0 ? (
            availableServices.map((service) => (
              <Box
                key={service.id}
                onClick={() => toggleService(service.id)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  p: 2,
                  mb: 1.5,
                  bgcolor: selectedServices.includes(service.id)
                    ? "#f3e8ff"
                    : "#f5f5f5",
                  border: selectedServices.includes(service.id)
                    ? "1px solid #c084fc"
                    : "1px solid transparent",
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: selectedServices.includes(service.id) ? "#f3e8ff" : "#ebebeb",
                  }
                }}
              >
                <Box>
                  <Typography fontWeight={600} color={selectedServices.includes(service.id) ? "#6b21a8" : "inherit"}>
                    {service.name}
                  </Typography>
                  {service.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {service.description}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary">
              No available services to assign. Create some first!
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={closeAddServiceModal}>Cancel</Button>

          <Button
            onClick={handleAddServices}
            variant="contained"
            color="primary"
            disabled={addServicesMutation.isPending || selectedServices.length === 0}
          >
            {addServicesMutation.isPending ? "Assigning..." : "Assign Services"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
