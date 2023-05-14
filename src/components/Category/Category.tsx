import { CategoryProps } from '../../types';
import { Task } from '../Task';
import style from '../../styles/Category.module.scss';
import { useProjectStore } from '../../stores/useProjectStore';

const Category = ({ name, tasks, color }: CategoryProps) => {
  const { deleteCategoryFromProject } = useProjectStore();
  return (
    <section className={style.container}>
      <div className={style.title}>
        <span style={{ backgroundColor: `${color}` }} />
        <h3>{name}</h3>
      </div>

      <div>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>

      <button onClick={() => deleteCategoryFromProject(name)}>
        Delete Category
      </button>
    </section>
  );
};

export default Category;
