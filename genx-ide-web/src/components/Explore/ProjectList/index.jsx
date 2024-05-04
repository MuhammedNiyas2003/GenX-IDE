import { useEffect } from "react";
import "./style.scss";
import axios from "axios";
import ProjectCard from "../ProjectCard";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../../../state/reducers/exploreSlice";

const ProjectList = () => {
  const { allPosts } = useSelector((state) => state.explore);

  const dispatch = useDispatch();
  useEffect(() => {
    getAllPost();
  }, []);

  // fetch all post
  const getAllPost = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/explore`
      );
      if (response.status === 200) {
        console.log("All post!!", response.data);
        dispatch(setAllPosts(response.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="projectlist-container">
      {allPosts.map((data) => (
        <ProjectCard key={data._id} {...data} />
      ))}
    </div>
  );
};

export default ProjectList;
