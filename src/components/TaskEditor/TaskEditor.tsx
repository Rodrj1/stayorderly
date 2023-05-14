import { TaskProps } from '../../types';
import { useTaskEditor } from '../../features/components/TaskEditor';
import style from '../../styles/Modals.module.scss';

interface Props {
  handleVisibility: () => void;
  task: TaskProps;
}

const TaskEditor = ({ task, handleVisibility }: Props) => {
  const {
    handleEditTask,
    handleOnChange,
    taskInEdition,
    setTaskInEdition,
    currentProject,
  } = useTaskEditor({
    task,
    handleVisibility,
  });

  return (
    <div className={style.taskMaker}>
      <div className={style.flex}>
        <h3>Edit Task</h3>
        <span onClick={handleVisibility}></span>
      </div>

      <h5>Title</h5>
      <input
        placeholder="e.g. Take coffee break"
        onChange={(e) => handleOnChange(e, 'title')}
        value={taskInEdition.title}
      />

      <h5>Description</h5>
      <textarea
        placeholder="e.g. It's always good to take a break"
        onChange={(e) => handleOnChange(e, 'description')}
        value={taskInEdition.description}
      />

      <h5>Category</h5>

      <div className={style.status}>
        <select
          onChange={(e) =>
            setTaskInEdition({ ...taskInEdition, status: e.target.value })
          }
          value={taskInEdition.status}
        >
          {currentProject.categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleEditTask}>Finish Editing</button>
    </div>
  );
};

export default TaskEditor;
