import { createContext, useContext, useState } from "react";

const DashboardContext = createContext({
  projectData: {
    _id: "",
    title: "",
  },
  updateProjectData: (projectId, projectTitle) => {
    console.log(projectId, projectTitle);
  },
});

const DashboardContextProvider = ({ children }) => {
  const [projectData, setProjectData] = useState({ _id: "", title: "" });

  const handleUpdateProjectData = (projectId, projectTitle) => {
    setProjectData(() => ({
      _id: projectId,
      title: projectTitle,
    }));
  };

  const ctxValue = { projectData, updateProjectData: handleUpdateProjectData };

  return (
    <DashboardContext.Provider value={ctxValue}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;

export const useDashboardContext = () => useContext(DashboardContext);
