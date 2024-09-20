// src/components/UpdateUserComponent.js
import React, { useState } from 'react';
import useApiCaller from '../hooks/useApiCaller';

const UpdateUser= () => {
  const [userData, setUserData] = useState({ name: '', email: '' });
  const { data, loading, error } = useApiCaller('PUT', `/users/${userData.id}`, userData);

  const userRole = localStorage.getItem('userRole');

  const handleUpdate = (e) => {
    e.preventDefault();
    if (userRole === 'admin' || userRole === 'editor') {
      // Call the update hook with the payload
      setUserData({ ...userData }); // Trigger the useEffect hook to send the update request
    } else {
      alert('You do not have permission to update this data.');
    }
  };

  return (
    <div>
      <h1>Update User Info</h1>
      {loading ? <p>Updating...</p> : null}
      {error ? <p>Error: {error}</p> : null}
      {data ? <p>Update Successful: {JSON.stringify(data)}</p> : null}

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          placeholder="Name"
        />
        <input
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          placeholder="Email"
        />
        <button type="submit" disabled={userRole !== 'admin' && userRole !== 'editor'}>
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
