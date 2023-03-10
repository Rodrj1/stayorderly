export interface TaskProps {
  title: string;
  description: string;
  belongsTo: string;
  status: string;
  id: string;
}

export interface CategoryProps {
  name: string;
  color: string;
  tasks: Array<TaskProps>;
}

export interface ProjectProps {
  name: string;
  categories: Array<CategoryProps>;
}
