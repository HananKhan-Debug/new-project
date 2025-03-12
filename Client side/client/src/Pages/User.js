import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { getUsers, updateUserRole, deleteUser } from '../services/api';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({}); // Store selected roles

  const roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' },
    { id: 3, name: 'Manager' }
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleRoleSelection = (userId, newRoleId) => {
    setSelectedRoles((prev) => ({ ...prev, [userId]: newRoleId }));
  };

  const handleUpdateRole = async (userId) => {
    try {
      const newRoleId = selectedRoles[userId];
      if (!newRoleId) return; // Ensure a role is selected before updating

      await updateUserRole(userId, newRoleId);
      fetchUsers(); // Refresh user list after update
      alert('User role updated successfully!');
    } catch (error) {
      console.error('Failed to update role:', error);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        fetchUsers(); // Refresh the table
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  // Role selection dropdown with Update button
  const roleTemplate = (rowData) => (
    <div className="grid align-items-center gap-2">
      <div className="col">
        <Dropdown
          value={selectedRoles[rowData.id] || rowData.roleId} // Use selected or current role
          options={roles}
          optionLabel="name"
          optionValue="id"
          placeholder="Select Role"
          className="w-full"
          onChange={(e) => handleRoleSelection(rowData.id, e.value)}
        />
      </div>
      <div className="col">
        <Button
          label="Update"
          icon="pi pi-check"
          className="p-button-success w-full"
          onClick={() => handleUpdateRole(rowData.id)}
          disabled={!selectedRoles[rowData.id]} // Disable if no new role is selected
        />
      </div>
    </div>
  );

  // Delete button with PrimeFlex
  const deleteTemplate = (rowData) => (
    <div className="grid justify-content-center">
      <Button
        label="Delete"
        icon="pi pi-trash"
        className="p-button-danger w-full"
        onClick={() => handleDelete(rowData.id)}
      />
    </div>
  );

  return (
    <div className="card">
      <h2 className="text-center">User Management</h2>
      <DataTable value={users} paginator rows={8} responsiveLayout="scroll" className="p-datatable-striped">
        <Column field="id" header="ID" sortable className="w-3" />
        <Column field="username" header="UserName" sortable className="w-3" />
        <Column field="email" header="Email" sortable className="w-4" />
        <Column field="roleId" header="Role" body={roleTemplate} className="w-4" />
        <Column body={deleteTemplate} header="Actions" className="w-2" />
      </DataTable>
    </div>
  );
};

export default UserTable;
