import React from 'react';
import RequireAdmin from 'src/@core/layouts/components/RequireAdmin';
import TableUsers from 'src/views/tables/TableUsers';

const UserManagementPage = () => {
  return (
    <RequireAdmin>
    <div>
      <h1>User Account Control</h1>
      <TableUsers />
    </div>
    </RequireAdmin>
  );
}

export default UserManagementPage;
