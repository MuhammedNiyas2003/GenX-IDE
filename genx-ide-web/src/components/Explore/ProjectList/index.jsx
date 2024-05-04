import { useEffect } from "react";
import "./style.scss";
import axios from "axios";
//comp
import ProjectCard from "../ProjectCard";
//redux
import { useDispatch, useSelector } from "react-redux";
import {
  setAllPosts,
  setUserPosts,
} from "../../../state/reducers/exploreSlice";
//spectrum
import { Item, TabList, TabPanels, Tabs } from "@adobe/react-spectrum";

const ProjectList = () => {
  const { allPosts, userPosts } = useSelector((state) => state.explore);
  const { loggedIn, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    getAllPosts();
  }, []);
  useEffect(() => {
    getUserPosts();
  }, [user]);

  // fetch all posts
  const getAllPosts = async () => {
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
  const getUserPosts = async () => {
    try {
      if (loggedIn) {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/explore/${user?._id}`
        );
        if (response.status === 200) {
          console.log("Your posts!!", response.data);
          dispatch(setUserPosts(response.data));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="projectlist-container">
      <Tabs aria-label="History of Ancient Rome">
        <TabList>
          <Item key="Public">Public</Item>
          {loggedIn && <Item key="YourProjects">Your Projects</Item>}
        </TabList>
        <TabPanels UNSAFE_className="projectlist-container">
          <Item key="Public">
            {allPosts?.map((data) => (
              <ProjectCard key={data?._id} {...data} />
            ))}
          </Item>

          {loggedIn && (
            <Item key="YourProjects">
              {userPosts?.map((data) => (
                <ProjectCard key={data?._id} {...data} />
              ))}
            </Item>
          )}
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default ProjectList;
