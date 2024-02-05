import "./style.scss"
import ProjectButton from "../ProjectButton"

const ProjectCard = () => {
  return (
      <div className="projectcard-container">
      <div className="projectcard-header">
      <p>September 19th 2024</p>
      <div className="projectcard-profile">
        <img src="https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg" alt="" />
        <img src="https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg" alt="" />
        <img src="https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg" alt="" />
      </div>
      </div>
      <div className="projectcard-content">
        <h3>Project Name</h3>
        <p> elit. Eveniet quae error excepturi consequatur voluptatum modi suscipit repellat ipsum vitae dicta?</p>
        <div className="projectcard-tags">
          <p>testing of</p>
          <p>the project</p>
          <p>projectv test here</p>
        </div>
      </div>
      <ProjectButton></ProjectButton>
    </div>
  )
}

export default ProjectCard