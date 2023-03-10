import { useEffect, useState } from 'react';
import { useProjectStore } from '../../../stores/useProjectStore';
import { ProjectProps } from '../../../types';

interface Props {
  handleVisibility: () => void;
}

export const useProjectHandler = ({ handleVisibility }: Props) => {
  const selectedProject = useProjectStore((state) => state.selectedProject);
  const projectsInStore = useProjectStore((state) => state.projects);
  const [tempName, setTempName] = useState(selectedProject);
  const [currentProject, setCurrentProject] = useState({} as ProjectProps);

  const {
    updateStoredProjects,
    deleteProject,
    deselectProject,
    selectProject,
  } = useProjectStore();
  const projectHasName = tempName != '';

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempName(e.target.value);
  };

  const handleUpdateProject = () => {
    if (projectHasName) {
      const updateCurrentProject = projectsInStore.map((project) => {
        if (project.name == selectedProject) {
          return { ...project, name: tempName };
        }
        return project;
      });
      selectProject(tempName);
      updateStoredProjects(updateCurrentProject);
      handleVisibility();
    }
  };

  const handleDeleteProject = () => {
    if (currentProject) {
      deselectProject();
      deleteProject(selectedProject);
      handleVisibility();
    }
  };

  useEffect(() => {
    const updateCurrentProject = projectsInStore.find(
      (project) => project.name == selectedProject
    );
    if (updateCurrentProject) setCurrentProject(updateCurrentProject);
    setTempName(selectedProject);
  }, [projectsInStore]);

  return {
    handleOnChange,
    tempName,
    handleUpdateProject,
    handleDeleteProject,
  };
};
