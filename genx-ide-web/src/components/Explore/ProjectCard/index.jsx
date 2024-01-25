import "./style.scss"
import Button from '../../Button'

const ProjectCard = () => {
  return (
      <div className="projectcard-container">
      <div className="projectcard-header">
        <div className="project-icon">
          <img src="" alt="logo" />
        </div>
        <div className="header-content">
          <h5></h5>
          <p>
            name - date and time
          </p>
        </div>
        <img className="save-btn" src="" alt="error" />
      </div>
      <p className="projectcard-caption">description</p>
      <div className="jobcard-tags">
            <div>
              <p>hello</p>
            </div>
      </div>
      <p className="projectcard-caption">
         days ego •Applicants
      </p>
      <div className="projectcard-bottom">
        <h3>
          10000
          <span>/m</span>
        </h3>
        <Button/>
      </div>
    </div>
  )
}

export default ProjectCard