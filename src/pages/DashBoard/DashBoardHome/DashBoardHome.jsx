import React from 'react';
import useUserRole from '../../../hooks/useUserRole';
import Loading from '../../../components/Loading';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

const DashBoardHome = () => {
    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        return <Loading></Loading>
    }

    if (role === 'user') {
        return <UserDashboard></UserDashboard>
    }

    else if (role === 'admin') {
        return <AdminDashboard></AdminDashboard>
    }
    else {
        return <Forbidden></Forbidden>
    }

};

export default DashBoardHome;