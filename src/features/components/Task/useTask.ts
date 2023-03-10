import { useProjectStore } from '../../../stores/useProjectStore';
import { TaskProps } from '../../../types';
import { useTaskAction, useVisibility } from '../../hooks';
import { deleteTask } from '../TaskMaker/updateProject';

interface Props {
  task: TaskProps;
}

export const useTask = ({ task }: Props) => {
  const { updateStoredProjects } = useProjectStore();
  const { doTaskAction } = useTaskAction();
  const { isVisible, handleVisibility } = useVisibility();

  const handleDeleteTask = () => {
    doTaskAction(task, deleteTask).then((updatedProjects) =>
      updateStoredProjects(updatedProjects)
    );
  };

  return { isVisible, handleVisibility, handleDeleteTask };
};
