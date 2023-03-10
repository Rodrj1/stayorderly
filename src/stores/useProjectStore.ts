import { create } from 'zustand';
import { ProjectProps } from '../types';

interface ProjectStore {
  projects: Array<ProjectProps>;
  selectedProject: string;
  createProject: (project: ProjectProps) => void;
  deleteProject: (projectName: string) => void;
  selectProject: (projectName: string) => void;
  deselectProject: () => void;
  updateStoredProjects: (projects: ProjectProps[]) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  selectedProject: '',
  createProject: (project: ProjectProps) =>
    set((state) => ({
      projects: [...state.projects, project],
    })),
  deleteProject: (projectName: string) =>
    set((state) => ({
      projects: [
        ...state.projects.filter((projects) => projects.name != projectName),
      ],
    })),
  selectProject: (projectName: string) => set({ selectedProject: projectName }),
  deselectProject: () => set({ selectedProject: '' }),
  updateStoredProjects: (projects: ProjectProps[]) =>
    set({ projects: projects }),
}));
