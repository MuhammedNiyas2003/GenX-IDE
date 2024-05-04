import "./style.scss";
import ProjectButton from "../ProjectButton";
import { formatDate } from "../../../utils/formatDate";

const ProjectCard = ({ _id, title, desc, createdAt, tags }) => {
  return (
    <div className="projectcard-container">
      <div className="projectcard-header">
        <p>{formatDate(createdAt)}</p>
        <div className="projectcard-profile">
          <img
            src="https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg"
            alt=""
          />
          <img
            src="https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg"
            alt=""
          />
          <img
            src="https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="projectcard-content">
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className="projectcard-tags">
          {tags?.map((tag, i) => (
            <p key={i}>{tag}</p>
          ))}
        </div>
      </div>
      <ProjectButton></ProjectButton>
    </div>
  );
};

export default ProjectCard;
