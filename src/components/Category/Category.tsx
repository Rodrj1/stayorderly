import { CategoryProps } from '../../types';
import { Task } from '../Task';
import style from '../../styles/Category.module.scss';

const Category = ({ name, tasks, color }: CategoryProps) => {
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
    </section>
  );
};

export default Category;
