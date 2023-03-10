import { TaskProps } from '../../types';
import { Centerer } from '../Centerer';
import { TaskEditor } from '../TaskEditor';
import { useTask } from '../../features/components/Task';
import style from '../../styles/Task.module.scss';

interface Props {
  task: TaskProps;
}

const Task = ({ task }: Props) => {
  const { isVisible, handleVisibility, handleDeleteTask } = useTask({task});

  return (
    <>
      {isVisible && (
        <Centerer>
          <TaskEditor task={task} handleVisibility={handleVisibility} />
        </Centerer>
      )}
      <article className={style.container}>
        <h4>{task.title}</h4>
        <p>{task.description}</p>

        <div>
          <span onClick={handleVisibility}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M20.125 15L18 12.875l1.425-1.425l2.125 2.125ZM12 21v-2.125l5.3-5.3l2.125 2.125l-5.3 5.3Zm-9-5v-2h7v2Zm0-4v-2h11v2Zm0-4V6h11v2Z"
              />
            </svg>
          </span>
          <span onClick={handleDeleteTask}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M15 18v-2h4v2Zm0-8V8h7v2Zm0 4v-2h6v2ZM3 8H2V6h4V4.5h4V6h4v2h-1v11H3Z"
              />
            </svg>
          </span>
        </div>
      </article>
    </>
  );
};

export default Task;
