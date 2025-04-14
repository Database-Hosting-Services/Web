import React, { memo, useEffect } from "react";
import { useDashboardContext } from "../store/DashboardContext";

const ProjectHome = memo(() => {
  const { updateProjectData } = useDashboardContext();

  useEffect(() => {
    updateProjectData("123", "Hello");
  }, []);

  return <div>ProjectHome</div>;
});

export default ProjectHome;
