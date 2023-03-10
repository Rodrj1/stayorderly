import { useProjectHandler } from '../../features/components/ProjectHandler';
import style from '../../styles/Modals.module.scss';

interface Props {
  handleVisibility: () => void;
}

const ProjectHandler = ({ handleVisibility }: Props) => {
  const { handleOnChange, tempName, handleUpdateProject, handleDeleteProject } =
    useProjectHandler({ handleVisibility });

  return (
    <div className={style.taskMaker}>
      <div className={style.flex}>
        <h3>Edit Project</h3>
        <span onClick={handleVisibility}></span>
      </div>

      <h5>Title</h5>
      <input
        placeholder="e.g. Ship development"
        onChange={(e) => handleOnChange(e)}
        value={tempName}
      />

      <button onClick={handleUpdateProject}>Update Project</button>
      <button onClick={handleDeleteProject}>Delete Project</button>
    </div>
  );
};

export default ProjectHandler;
