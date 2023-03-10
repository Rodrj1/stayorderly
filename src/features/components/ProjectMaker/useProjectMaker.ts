import { useState } from 'react';
import { emptyProjectTemplate } from '../../../data/templates';
import { useProjectStore } from '../../../stores/useProjectStore';
import { ProjectProps } from '../../../types';

interface Props {
  handleProjectMaker: () => void;
}

export const useProjectMaker = ({ handleProjectMaker }: Props) => {
  const [tempProject, setTempProject] =
    useState<ProjectProps>(emptyProjectTemplate);
  const projectsInStore = useProjectStore((state) => state.projects);
  const { createProject } = useProjectStore();

  const handleCreateProject = () => {
    if (tempProject.name != '') {
      const projectAlreadyExists = projectsInStore.find(
        (project) => project.name == tempProject.name
      );
      if (!projectAlreadyExists) {
        createProject(tempProject);
        setTempProject(emptyProjectTemplate);
        handleProjectMaker();
      }
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updateTempProject = { ...tempProject, name: e.target.value };
    setTempProject(updateTempProject);
  };
  return { handleOnChange, handleCreateProject };
};
