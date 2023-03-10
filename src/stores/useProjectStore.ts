import { create } from 'zustand';
import { ProjectProps } from '../types';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ProjectStore {
  projects: Array<ProjectProps>;
  selectedProject: string;
  createProject: (project: ProjectProps) => void;
  deleteProject: (projectName: string) => void;
  selectProject: (projectName: string) => void;
  deselectProject: () => void;
  updateStoredProjects: (projects: ProjectProps[]) => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
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
