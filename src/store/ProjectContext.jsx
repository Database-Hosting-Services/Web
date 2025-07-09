import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

// Create the context
const ProjectContext = createContext();

// Custom hook to use the project context
export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};

// Provider component
export const ProjectProvider = ({ children, initialProjectId }) => {
  const [currentProjectId, setCurrentProjectId] = useState(
    initialProjectId || 1,
  );

  const value = {
    currentProjectId,
    setCurrentProjectId,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

ProjectProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialProjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ProjectContext;
