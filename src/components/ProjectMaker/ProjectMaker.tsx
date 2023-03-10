import { useProjectMaker } from '../../features/components/ProjectMaker';
import style from '../../styles/Modals.module.scss';

interface Props {
  handleProjectMaker: () => void;
}

const ProjectMaker = ({ handleProjectMaker }: Props) => {
  const { handleOnChange, handleCreateProject } = useProjectMaker({
    handleProjectMaker,
  });

  return (
    <div className={style.projectMaker}>
      <div className={style.flex}>
        <h3>Add New Project</h3>
        <span onClick={handleProjectMaker}></span>
      </div>

      <h5>Title</h5>
      <input onChange={(e) => handleOnChange(e)} />

      <button onClick={handleCreateProject}>Create Project</button>
    </div>
  );
};

export default ProjectMaker;
