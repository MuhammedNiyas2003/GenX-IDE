import { useParams } from "react-router-dom";

const Workspace = () => {
  const { projectId } = useParams();
  return <div>WorkspacePage {projectId}</div>;
};

export default Workspace;