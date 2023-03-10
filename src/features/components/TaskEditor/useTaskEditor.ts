import { useState } from 'react';
import { useProjectStore } from '../../../stores/useProjectStore';
import { TaskProps } from '../../../types';
import { useTaskAction } from '../../hooks';
import { editTask } from '../TaskMaker/updateProject';

interface Props {
  task: TaskProps;
  handleVisibility: () => void;
}

export const useTaskEditor = ({ task, handleVisibility }: Props) => {
  const [taskInEdition, setTaskInEdition] = useState<TaskProps>(task);
  const { doTaskAction } = useTaskAction();
  const { updateStoredProjects } = useProjectStore();
  const selectedProject = useProjectStore((state) => state.selectedProject);

  const taskFieldsAreFilled =
    taskInEdition.title != '' &&
    taskInEdition.description != '' &&
    selectedProject != '';

  const handleEditTask = () => {
    if (taskFieldsAreFilled) {
      doTaskAction(taskInEdition, editTask).then((updatedProjects) =>
        updateStoredProjects(updatedProjects)
      );
      handleVisibility();
    }
  };

  type HTMLElementEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>;

  const handleOnChange = (e: HTMLElementEvent, val: string) => {
    const updateTempTask = { ...taskInEdition, [val]: e.target.value };
    setTaskInEdition(updateTempTask);
  };

  return { handleEditTask, handleOnChange, taskInEdition, setTaskInEdition };
};
