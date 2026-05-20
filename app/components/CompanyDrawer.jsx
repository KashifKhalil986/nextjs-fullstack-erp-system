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

import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function CompanyDrawer({ open, setOpen, company }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [addOpen, setAddOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { data: allUsers = [] } = useUsers({ enabled: addOpen });

  const assignedUsers = company?.Users || [];
  const assignedUserIds = assignedUsers.map((u) => u.id);
  const availableUsers = allUsers.filter(
    (user) => !assignedUserIds.includes(user.id),
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

  const closeAddUserModal = () => {
    setSelectedUsers([]);
    setAddOpen(false);
  };

  const addUsersMutation = useAddUsersToCompany();

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
            <Typography color="text.secondary">No users assigned</Typography>
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
    </>
  );
}
