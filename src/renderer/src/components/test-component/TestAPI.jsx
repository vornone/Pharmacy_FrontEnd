
import React, { useEffect } from "react";
import useGetAllUser from "../../hooks/useGetAllUser";
import useGetAllUserRole from "../../hooks/useGetAllUserRole";
const TestAPI = () => {
    const { data: data1, loading: loading1, error: error1, fetchData: fetchUserData } = useGetAllUser();
    const { data: roleData, loading: roleLoading, error: roleError, fetchRoleData } = useGetAllUserRole();
    
    const handleFetchAllData = () => {
        fetchUserData();
        fetchRoleData();

    }

  return <div style={{ textAlign: "center", padding: "20px" }}>
    <button onClick={handleFetchAllData}>Fetch Data</button>
    <h1>Test API</h1>
    {loading1 ? <p>Loading...</p> : null}
    {error1 ? <p>Error: {error1}</p> : null}
    {data1 ? <p>Data: {JSON.stringify(data1)}</p> : null}
    <br />
    <br />
    <br />
    <br />
    <br />
    {roleLoading ? <p>Loading...</p> : null}
    {roleError ? <p>Error: {roleError}</p> : null}
    {roleData ? <p>Role Data: {JSON.stringify(roleData[0].role_name)}</p> : null}
  </div>;
};

export default TestAPI;
