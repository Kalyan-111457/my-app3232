import { useEffect, useState } from "react";
import {
  AllInActiveJobs,
  AllActiveApplications,
  AllActiveUsersCount,
  AllInActiveApplications,
  AllActiveJobCount,
  AllInActiveUsersCount
} from "../api";

const MainDashBoard = () => {

  const [data, setData] = useState({
    activejobs: 0,
    inactivejobs: 0,
    activeusers: 0,
    inactiveusers: 0,
    activeapplications: 0,
    inactiveapplications: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          activejobs,
          inactivejobs,
          activeusers,
          inactiveusers,
          activeapplications,
          inactiveapplications
        ] = await Promise.all([
          AllActiveJobCount(),
          AllInActiveJobs(),
          AllActiveUsersCount(),
          AllInActiveUsersCount(),
          AllActiveApplications(),
          AllInActiveApplications()
        ]);

        setData({
          activejobs,
          inactivejobs,
          activeusers,
          inactiveusers,
          activeapplications,
          inactiveapplications
        });

      } catch (error) {
        alert("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Active Jobs: {data.activejobs}</p>
      <p>Inactive Jobs: {data.inactivejobs}</p>
      <p>Active Users: {data.activeusers}</p>
      <p>Inactive Users: {data.inactiveusers}</p>
      <p>Active Applications: {data.activeapplications}</p>
      <p>Inactive Applications: {data.inactiveapplications}</p>
    </div>
  );
};

export default MainDashBoard;