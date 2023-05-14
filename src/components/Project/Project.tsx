import { ProjectProps } from '../../types';
import { Category } from '../Category';
import { useEffect, useState } from 'react';
import { BlockPicker } from 'react-color';
import { useProjectStore } from '../../stores/useProjectStore';
import { emptyCateegoryTemplate } from '../../data/templates';
import style from '../../styles/Project.module.scss';

const Project = () => {
  const projectsInStore = useProjectStore((state) => state.projects);
  const selectedProject = useProjectStore((state) => state.selectedProject);
  const { updateStoredProjects } = useProjectStore();
  const [project, setProject] = useState<ProjectProps>({} as ProjectProps);
  const [newCategory, setNewCategory] = useState(emptyCateegoryTemplate);

  const DisplayCategories = project.categories?.map((category) => {
    return (
      <Category
        key={category.name}
        name={category.name}
        tasks={category.tasks}
        color={category.color}
      />
    );
  });

  useEffect(() => {
    const findProjectInStore = projectsInStore.find(
      (project) => project.name == selectedProject
    );
    if (findProjectInStore) setProject(findProjectInStore);
  }, [selectedProject, projectsInStore]);

  type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

  const handleOnChange = (e: ChangeEvent) => {
    setNewCategory({ ...newCategory, name: e.target.value });
  };

  const createCategory = () => {
    if (newCategory.name != '') {
      setNewCategory(emptyCateegoryTemplate);

      const findProject = projectsInStore.find(
        (stored) => stored.name == project.name
      );

      if (findProject) {
        const updateProjects = projectsInStore.map((stored) => {
          if (stored.name == findProject.name) {
            return {
              ...stored,
              categories: stored.categories.concat(newCategory),
            };
          }
          return stored;
        });

        updateStoredProjects(updateProjects);
      }
    }
  };

  return (
    <section className={style.container}>
      {selectedProject != '' && (
        <>
          <div className={style.addCategory}>
            <button onClick={createCategory}>Add Category</button>

            <input
              onChange={(e) => handleOnChange(e)}
              type="text"
              name="addCategory"
            />

            <BlockPicker
              color={newCategory.color}
              onChange={(color) => {
                setNewCategory({ ...newCategory, color: color.hex });
              }}
            />
          </div>

          <div className={style.categories}>{DisplayCategories}</div>
        </>
      )}
    </section>
  );
};

export default Project;
