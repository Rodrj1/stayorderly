import { CategoryProps, ProjectProps, TaskProps } from '../../../types';

export const createTask = (project: ProjectProps, task: TaskProps) => {
  const updatedCategories = project.categories.map((category) => {
    const categoryShouldAddTask = category.name == task.status;

    if (categoryShouldAddTask)
      return { ...category, tasks: category.tasks.concat(task) };
    else return category;
  });

  return updatedCategories;
};

export const editTask = (project: ProjectProps, task: TaskProps) => {
  const updatedCategories: CategoryProps[] = project.categories.map(
    (category) => {
      const categoryShouldAddTask = category.name == task.status;

      const removePreviousTask = category.tasks.filter(
        (tasks) => tasks.id != task.id
      );

      if (categoryShouldAddTask)
        return {
          ...category,
          tasks: [...removePreviousTask, task],
        };
      else
        return {
          ...category,
          tasks: [...removePreviousTask],
        };
    }
  );

  return updatedCategories;
};

export const deleteTask = (project: ProjectProps, task: TaskProps) => {
  const updatedCategories = project.categories.map((category) => {
    const removeTask = category.tasks.filter((tasks) => tasks.id != task.id);

    return { ...category, tasks: removeTask };
  });

  return updatedCategories;
};

export const updateTasksWhenProjectNameChanges = (project: ProjectProps) => {
  const updatedCategories: CategoryProps[] = project.categories.map(
    (category) => {
      const updateTasksBelonging = category.tasks.map((task) => {
        const newTaskBelonging = { ...task, belongsTo: project.name };
        return newTaskBelonging;
      });

      return { ...category, tasks: updateTasksBelonging };
    }
  );

  return updatedCategories;
};

type createTask = typeof createTask;
type editTask = typeof editTask;
type deleteTask = typeof deleteTask;

export const updateProject = (
  projectsInStore: ProjectProps[],
  task: TaskProps,
  categoryUpdater: createTask | editTask | deleteTask
) => {
  const updatedProject = projectsInStore.map((project) => {
    const updateCategories = categoryUpdater(project, task);
    const projectHasTask = project.name == task.belongsTo;
    if (projectHasTask) {
      return {
        ...project,
        categories: updateCategories,
      };
    }
    return project;
  });
  return updatedProject;
};
