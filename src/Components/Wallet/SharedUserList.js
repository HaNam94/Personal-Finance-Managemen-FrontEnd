import React, { useState } from 'react';
import axios from 'axios';
import Helper from "../../utils/helpers";
import UnshareModal from "../../Pages/Wallet/UnshareModal";
import WalletApi from "../../Apis/WalletApi";

function SharedUserList({ sharedUsers, walletId, onUpdateRole, handleUnshare }) {
  const [roles, setRoles] = useState(
    sharedUsers.reduce((acc, user) => {
      acc[user.userId] = user.role;
      return acc;
    }, {})
  );
  const handleRoleChange = async (userId, newRole) => {
    setRoles(prevRoles => ({
      ...prevRoles,
      [userId]: newRole
    }));

    try {
      await WalletApi.updateShareWallet(
        walletId, {
            userId: userId,
            role: newRole
          }
      );
      Helper.toastSuccess('Cập nhật quyền thành công!');
      onUpdateRole(userId, newRole);
    } catch (error) {
      console.log(walletId, userId);
      Helper.toastError('Cập nhật quyền thất bại: ' + (error.response?.data || error.message));
    }
  };

  return (
    <ul className="list-group">
      {sharedUsers.map(user => (
        <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <div><strong>UserName:</strong> {user.userName}</div>
            <div><strong>Email:</strong> {user.userEmail}</div>
            <div>
              <strong>Vai trò:</strong>
              <select
                value={roles[user.userId]}
                onChange={(e) => handleRoleChange(user.userId, e.target.value)}
                className="form-select form-select-sm ms-2"
                style={{ width: "auto", display: "inline-block" }}
              >
                <option value="READ_ONLY">READ_ONLY</option>
                <option value="OWNER">OWNER</option>
              </select>
            </div>
          </div>
          <UnshareModal email={user.userEmail} handleUnshare={handleUnshare} />
        </li>
      ))}
    </ul>
  );
}

export default SharedUserList;
