import { useState } from 'react';
import { Centerer } from './components/Centerer';
import { Project } from './components/Project';
import { ProjectMaker } from './components/ProjectMaker';
import { ProjectsContainer } from './components/ProjectsContainer';
import { TaskMaker } from './components/TaskMaker';
import { useProjectStore } from './stores/useProjectStore';
import style from './styles/App.module.scss';

function App() {
  const [taskMakerIsVisible, setTaskMakerIsVisible] = useState(false);
  const [projectMakerIsVisible, setProjectMakerIsVisible] = useState(false);
  const selectedProject = useProjectStore((state) => state.selectedProject);

  const handleTaskMaker = () => {
    setTaskMakerIsVisible((current) => !current);
  };

  const handleProjectMaker = () => {
    setProjectMakerIsVisible((current) => !current);
  };

  return (
    <div className={style.container}>
      <section className={style.gridItem}>
        <ProjectsContainer handleProjectMaker={handleProjectMaker} />
      </section>

      <section className={style.gridItem}>
        <div className={style.flex}>
          <h2>{selectedProject}</h2>
          {selectedProject != '' && (
            <button onClick={handleTaskMaker}>+ Add New Task</button>
          )}
        </div>
      </section>

      <section className={style.gridItem}>
        <Project />
      </section>

      {taskMakerIsVisible && (
        <Centerer>
          <TaskMaker handleTaskMaker={handleTaskMaker} />
        </Centerer>
      )}

      {projectMakerIsVisible && (
        <Centerer>
          <ProjectMaker handleProjectMaker={handleProjectMaker} />
        </Centerer>
      )}
    </div>
  );
}

export default App;
