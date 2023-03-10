import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { emptyTaskTemplate } from '../../../data/templates';
import { useProjectStore } from '../../../stores/useProjectStore';
import { TaskProps } from '../../../types';
import { useTaskAction } from '../../hooks';
import { createTask } from './updateProject';

interface Props {
  handleTaskMaker: () => void;
}

export const useTaskMaker = ({ handleTaskMaker }: Props) => {
  const [tempTask, setTempTask] = useState<TaskProps>(emptyTaskTemplate);
  const { updateStoredProjects } = useProjectStore();
  const { doTaskAction } = useTaskAction();
  const selectedProject = useProjectStore((state) => state.selectedProject);
  const taskFieldsAreFilled =
    tempTask.title != '' && tempTask.description != '' && selectedProject != '';

  const handleCreateTask = () => {
    if (taskFieldsAreFilled) {
      doTaskAction({ ...tempTask, id: nanoid() }, createTask).then(
        (updatedProjects) => updateStoredProjects(updatedProjects)
      );
      handleTaskMaker();
    }
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
    const bindTaskToProject = { ...tempTask, belongsTo: selectedProject };
    setTempTask(bindTaskToProject);
  }, []);

  return { tempTask, setTempTask, handleCreateTask, handleOnChange };
};
