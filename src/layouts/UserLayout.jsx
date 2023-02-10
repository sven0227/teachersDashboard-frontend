import React from "react";
import { AppHeader, AppSidebar, AppContent, AppFooter } from "../components/users/index";
import { useSelector } from "react-redux";

const UserLayout = () => {
    const user = useSelector(state => state.user);
    return (
        <div>
            {user.token && 
            <AppSidebar/>}
            <AppHeader/>
            <AppContent/>
            <AppFooter/>
        </div>
    )
}

export default UserLayout;