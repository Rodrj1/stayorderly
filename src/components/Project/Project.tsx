import { ProjectProps } from '../../types';
import { Category } from '../Category';
import { useEffect, useState } from 'react';
import { useProjectStore } from '../../stores/useProjectStore';
import style from '../../styles/Project.module.scss';

const Project = () => {
  const projectsInStore = useProjectStore((state) => state.projects);
  const selectedProject = useProjectStore((state) => state.selectedProject);
  const [project, setProject] = useState<ProjectProps>({} as ProjectProps);

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

  return (
    <section className={style.container}>
      {selectedProject != '' && DisplayCategories}
    </section>
  );
};

export default Project;
