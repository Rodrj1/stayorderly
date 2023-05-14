import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import {
  emptyProjectTemplate,
  emptyTaskTemplate,
} from '../../../data/templates';
import { useProjectStore } from '../../../stores/useProjectStore';
import { ProjectProps, TaskProps } from '../../../types';
import { useTaskAction } from '../../hooks';
import { createTask } from './updateProject';

interface Props {
  handleTaskMaker: () => void;
}

export const useTaskMaker = ({ handleTaskMaker }: Props) => {
  const [currentProject, setCurrentProject] =
    useState<ProjectProps>(emptyProjectTemplate);

  const [tempTask, setTempTask] = useState<TaskProps>(emptyTaskTemplate);

  const { updateStoredProjects, getCurrentProject } = useProjectStore();

  const { doTaskAction } = useTaskAction();

  const selectedProject = useProjectStore((state) => state.selectedProject);

  const taskFieldsAreFilled =
    tempTask.title != '' && tempTask.description != '' && selectedProject != '';

  const handleCreateTask = () => {
    if (taskFieldsAreFilled) {
      const addStatus =
        tempTask.status == '' ? currentProject.categories[0].name : tempTask.status;
      doTaskAction(
        { ...tempTask, id: nanoid(), status: addStatus },
        createTask
      ).then((updatedProjects) => updateStoredProjects(updatedProjects));
      handleTaskMaker();
    }
    console.log(tempTask);
  };

  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    val: string
  ) => {
    const updateTempTask = { ...tempTask, [val]: e.target.value };
    setTempTask(updateTempTask);
  };

  useEffect(() => {
    const currentProject = getCurrentProject();
    if (currentProject) {
      setCurrentProject(currentProject);

      const bindTaskToProject = { ...tempTask, belongsTo: currentProject.name };
      setTempTask(bindTaskToProject);
    }
  }, []);

  return {
    tempTask,
    setTempTask,
    handleCreateTask,
    handleOnChange,
    currentProject,
  };
};
