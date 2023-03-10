import { useProjectsContainer } from '../../features/components/ProjectsContainer';
import { Centerer } from '../Centerer';
import { ProjectHandler } from '../ProjectHandler';
import style from '../../styles/ProjectsContainer.module.scss';

interface Props {
  handleProjectMaker: () => void;
}

const ProjectsContainer = ({ handleProjectMaker }: Props) => {
  const {
    projectsInStore,
    selectedProject,
    handleSelectProject,
    handleProjectEditor,
    handleVisibility,
    isVisible,
  } = useProjectsContainer();

  return (
    <div className={style.container}>
      <h1>StayOrderly</h1>
      <div className={style.projects}>
        <h3>ALL PROJECTS ({projectsInStore.length})</h3>
        {projectsInStore.map((project) => (
          <div className={style.project} key={project.name}>
            <button onClick={() => handleProjectEditor(project.name)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M22 9V7h-2V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2m-4 10H4V5h14v14M6 13h5v4H6v-4m6-6h4v3h-4V7M6 7h5v5H6V7m6 4h4v6h-4v-6Z"
                />
              </svg>
            </button>
            <button
              onClick={() => handleSelectProject(project.name)}
              className={`${selectedProject == project.name && style.selected}`}
            >
              {project.name}
            </button>
          </div>
        ))}
        <button onClick={handleProjectMaker}>+ Create New Project</button>
      </div>

      {isVisible && (
        <Centerer>
          <ProjectHandler handleVisibility={handleVisibility} />
        </Centerer>
      )}
    </div>
  );
};

export default ProjectsContainer;
