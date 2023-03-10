import { useProjectStore } from '../../../stores/useProjectStore';
import { useVisibility } from '../../hooks';

export const useProjectsContainer = () => {
  const projectsInStore = useProjectStore((state) => state.projects);
  const selectedProject = useProjectStore((state) => state.selectedProject);
  const { selectProject } = useProjectStore();
  const { isVisible, handleVisibility } = useVisibility();

  const handleSelectProject = (projectName: string) => {
    selectProject(projectName);
  };

  const handleProjectEditor = (projectName: string) => {
    handleVisibility();
    selectProject(projectName);
  };

  return {
    projectsInStore,
    selectedProject,
    handleSelectProject,
    handleProjectEditor,
    handleVisibility,
    isVisible,
  };
};
