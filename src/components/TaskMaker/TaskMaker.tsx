import { useTaskMaker } from '../../features/components/TaskMaker';
import style from '../../styles/Modals.module.scss';

interface Props {
  handleTaskMaker: () => void;
}

const TaskMaker = ({ handleTaskMaker }: Props) => {
  const { tempTask, setTempTask, handleCreateTask, handleOnChange } =
    useTaskMaker({
      handleTaskMaker,
    });

  return (
    <div className={style.taskMaker}>
      <div className={style.flex}>
        <h3>Add New Task</h3>
        <span onClick={handleTaskMaker}></span>
      </div>

      <h5>Title</h5>
      <input
        placeholder="e.g. Take coffee break"
        onChange={(e) => handleOnChange(e, 'title')}
      />

      <h5>Description</h5>
      <textarea
        placeholder="e.g. It's always good to take a break"
        onChange={(e) => handleOnChange(e, 'description')}
      />

      <h5>Status</h5>
      <div className={style.status}>
        <select
          onChange={(e) => setTempTask({ ...tempTask, status: e.target.value })}
        >
          <option value="Todo">Todo</option>
          <option value="Doing">Doing</option>
        </select>
      </div>

      <button onClick={handleCreateTask}>Create Task</button>
    </div>
  );
};

export default TaskMaker;
