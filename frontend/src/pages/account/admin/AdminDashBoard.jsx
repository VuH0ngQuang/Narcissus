import React from 'react';
import ManageTab from './ManageTab.jsx';
import UseAuth from '../UseAuth.jsx';

const AdminDashboard = () => {
    UseAuth('ROLE_ADMIN');

    return (
        <div>
            <ManageTab />
        </div>
    );
};

export default AdminDashboard;
