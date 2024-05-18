import React from 'react';
import { useUser } from '@clerk/clerk-react';

function CheckLogin() {

    const { user } = useUser();
    if (user) {
    } else {
      console.warn('User is not logged in');
    }

    return (
    <nav className="topbar">
    </nav>
    )
}

export default CheckLogin