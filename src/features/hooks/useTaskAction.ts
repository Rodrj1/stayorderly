import { useProjectStore } from '../../stores/useProjectStore';
import { CategoryProps, ProjectProps, TaskProps } from '../../types';
import { updateProject } from '../components/TaskMaker';

export const useTaskAction = () => {
  const projectsInStore = useProjectStore((state) => state.projects);
  const selectedProject = useProjectStore((state) => state.selectedProject);

  const doTaskAction = (
    task: TaskProps,
    action: (project: ProjectProps, task: TaskProps) => CategoryProps[]
  ) =>
    new Promise<ProjectProps[]>((resolve) => {
      const findSelectedProject = projectsInStore.find(
        (project) => project.name == selectedProject
      );

      if (findSelectedProject) {
        const sendTaskToProject = updateProject(
          projectsInStore,
          { ...task },
          action
        );
        resolve(sendTaskToProject);
      }
      resolve(projectsInStore);
    });

  return { doTaskAction };
};
