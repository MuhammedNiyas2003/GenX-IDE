import { Link } from "react-router-dom";

const CreateProject = () => {
  return (
    <div>
      <h2>Create Project</h2>
      <Link to="/workspace/project/123">
        <button>create project</button>
      </Link>
    </div>
  );
};

export default CreateProject;
