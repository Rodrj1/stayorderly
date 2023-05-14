import { create } from 'zustand';
import { ProjectProps } from '../types';
import { persist } from 'zustand/middleware';

interface ProjectStore {
  projects: Array<ProjectProps>;
  selectedProject: string;
  createProject: (project: ProjectProps) => void;
  deleteProject: (projectName: string) => void;
  selectProject: (projectName: string) => void;
  getCurrentProject: () => ProjectProps | undefined;
  deleteCategoryFromProject: (categoryName: string) => void;
  deselectProject: () => void;
  updateStoredProjects: (projects: ProjectProps[]) => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [],
      selectedProject: '',

      createProject: (project: ProjectProps) =>
        set((state) => ({
          projects: [...state.projects, project],
        })),

      deleteProject: (projectName: string) =>
        set((state) => ({
          projects: [
            ...state.projects.filter(
              (projects) => projects.name != projectName
            ),
          ],
        })),

      selectProject: (projectName: string) =>
        set({ selectedProject: projectName }),

      getCurrentProject: () => {
        const project = get().selectedProject;

        const findSelected = get().projects.find(
          (stored) => stored.name == project
        );

        if (findSelected) {
          return findSelected;
        }
      },

      deleteCategoryFromProject: (categoryName: string) => {
        const getProject = get().getCurrentProject();

        if (getProject) {
          const updateCategories = getProject.categories.filter(
            (category) => category.name != categoryName
          );
          const newProject: ProjectProps = {
            ...getProject,
            categories: updateCategories,
          };

          const updatedProjects = get().projects.map((project) => {
            if (project.name == newProject.name) return newProject;
            return project;
          });

          if (updatedProjects) {
            get().updateStoredProjects(updatedProjects);
          }
        }
      },

      deselectProject: () => set({ selectedProject: '' }),

      updateStoredProjects: (projects: ProjectProps[]) =>
        set({ projects: projects }),
    }),
    {
      name: 'todo-storage',
      partialize: (state) => ({
        projects: state.projects,
        selectedProject: state.selectedProject,
      }),
    }
  )
);
