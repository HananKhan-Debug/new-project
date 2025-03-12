import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { getUsers, createUser, updateUserRole, deleteUser } from "../services/api";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "", roleId: null });
  const [editMode, setEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const toast = useRef(null); // Toaster Reference

  const roleOptions = [
    { id: 1, name: "Admin" },
    { id: 2, name: "User" },
    { id: 3, name: "Manager" }
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      toast.current.show({ severity: "error", summary: "Error", detail: "Failed to fetch users.", life: 3000 });
      console.error("Fetch error:", err);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.username.trim()) errors.username = "Name is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    if (!editMode && !formData.password.trim()) errors.password = "Password is required.";
    if (!formData.roleId) errors.roleId = "Please select a role.";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const openDialog = (user = null) => {
    setValidationErrors({});
    if (user) {
      setFormData({ username: user.username, email: user.email, roleId: user.roleId });
      setEditMode(true);
      setSelectedUserId(user.id);
    } else {
      setFormData({ username: "", email: "", password: "", roleId: null });
      setEditMode(false);
    }
    setShowDialog(true);
  };

  const handleSave = async () => {
    if (!validateForm()) return;
  
    try {
      if (editMode) {
        await updateUserRole(selectedUserId, { 
          username: formData.username, 
          email: formData.email, 
          roleId: formData.roleId 
        });
        toast.current.show({ severity: "success", summary: "Success", detail: "User updated successfully!", life: 3000 });
      } else {
        await createUser(formData);
        toast.current.show({ severity: "success", summary: "Success", detail: "User created successfully!", life: 3000 });
      }
      fetchUsers(); // Refresh the table
      setShowDialog(false);
    } catch (err) {
      if (err.response?.status === 400) {
        toast.current.show({ severity: "error", summary: "Error", detail: "Invalid data. Please check your inputs.", life: 3000 });
      } else if (err.response?.status === 404) {
        toast.current.show({ severity: "error", summary: "Error", detail: "User not found.", life: 3000 });
      } else if (err.response?.status === 409) {
        toast.current.show({ severity: "warn", summary: "Warning", detail: "Email already exists.", life: 3000 });
      } else {
        toast.current.show({ severity: "error", summary: "Error", detail: "An unexpected error occurred.", life: 3000 });
      }
      console.error("Save error:", err);
    }
  };
  

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
        toast.current.show({ severity: "success", summary: "Deleted", detail: "User deleted successfully!", life: 3000 });
        fetchUsers();
      } catch (err) {
        toast.current.show({ severity: "error", summary: "Error", detail: "Failed to delete user.", life: 3000 });
        console.error("Delete error:", err);
      }
    }
  };

  return (
    <div className="p-4">
      <Toast ref={toast} /> {/* Toaster Component */}

      <h2 className="text-xl font-semibold mb-4">User Management</h2>

      {/* Add User Button */}
      <Button label="Add User" icon="pi pi-plus" className="p-button-success mb-3" onClick={() => openDialog()} />

      {/* User Table */}
      <DataTable value={users} paginator rows={10} responsiveLayout="scroll" className="p-datatable-gridlines">
        <Column field="id" header="ID" sortable />
        <Column field="username" header="Name" sortable />
        <Column field="email" header="Email" sortable />
        <Column 
          field="roleId" 
          header="Role" 
          body={(rowData) => roleOptions.find((role) => role.id === rowData.roleId)?.name} 
          sortable 
        />
        <Column
          header="Actions"
          body={(rowData) => (
            <div className="flex gap-2">
              <Button icon="pi pi-pencil" className="p-button-warning p-button-sm" onClick={() => openDialog(rowData)} />
              <Button icon="pi pi-trash" className="p-button-danger p-button-sm" onClick={() => handleDelete(rowData.id)} />
            </div>
          )}
        />
      </DataTable>

      {/* Add/Edit User Dialog */}
      <Dialog header={editMode ? "Edit User" : "Add User"} visible={showDialog} style={{ width: "30vw" }} onHide={() => setShowDialog(false)}>
        <div className="p-fluid">
          <div className="field">
            <label>Name</label>
            <InputText type="text" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
            {validationErrors.username && <small className="p-error">{validationErrors.username}</small>}
          </div>

          <div className="field">
            <label>Email</label>
            <InputText type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            {validationErrors.email && <small className="p-error">{validationErrors.email}</small>}
          </div>

          {!editMode && (
            <div className="field">
              <label>Password</label>
              <InputText type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
              {validationErrors.password && <small className="p-error">{validationErrors.password}</small>}
            </div>
          )}

          <div className="field">
            <label>Role</label>
            <Dropdown className="w-full" value={formData.roleId} options={roleOptions} optionLabel="name" optionValue="id" placeholder="Select Role" onChange={(e) => setFormData({ ...formData, roleId: e.value })} required />
            {validationErrors.roleId && <small className="p-error">{validationErrors.roleId}</small>}
          </div>

          <div className="flex justify-content-end mt-3">
            <Button label={editMode ? "Update" : "Create"} icon="pi pi-check" className="p-button-primary" onClick={handleSave} />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default UserTable;
