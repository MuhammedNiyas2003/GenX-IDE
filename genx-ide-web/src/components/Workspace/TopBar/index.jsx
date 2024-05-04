import { useEffect, useState } from "react";
import axios from "axios";
import "./style.scss";
//adobe spectrum
import {
  ActionButton,
  Button,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Heading,
  ButtonGroup,
  Form,
  TextField,
  TagGroup,
  Item,
} from "@adobe/react-spectrum";
import Bell from "@spectrum-icons/workflow/Bell";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../../../state/reducers/notificationSlice";
//comp
import NotificationItem from "../../NotificationItem";
import { ToastQueue } from "@react-spectrum/toast";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const { name, _id: userId } = useSelector((state) => state.auth.user);
  const { currentWorkspace } = useSelector((state) => state.workspace);
  const { notifications } = useSelector((state) => state.notification);

  //react router
  const navigate = useNavigate();

  //publish;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const dispatch = useDispatch();

  const getNotifications = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/invitation/${userId}`
      );
      const { status, data } = response.data;
      if (status === "SUCESS") {
        dispatch(setNotifications(data));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const approveHandler = async (invitationId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/invitation/approve/${userId}`,
        { invitationId }
      );
      const { status, data } = response.data;
      if (status === "SUCESS") {
        dispatch(setNotifications(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const rejectHandler = async (notificationId) => {
    console.log(notificationId);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/invitation//${notificationId}`
      );
      const { status, data } = response.data;
      if (status === "SUCCESS") {
        dispatch(setNotifications(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNotifications();
  }, []);
  //tags action
  const onRemove = (keys) => {
    setTags((prevItems) => prevItems.filter((item) => !keys.has(item.id)));
  };
  const addTag = () => {
    setTags((prev) => [...prev, tag]);
    setTag("");
  };
  //create post
  const createPostHandler = async (close) => {
    const formData = {
      title,
      desc,
      tags,
      userId,
      workspaceId: currentWorkspace?._id,
    };
    console.log(formData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/explore/create`,
        formData
      );
      const { status, data } = response;
      if (status === 201) {
        console.log(data)
        ToastQueue.positive("Project Published", {
          timeout: 3000,
          actionLabel: "View Project",
          onAction: () => navigate("/explore"),
          shouldCloseOnAction: true,
        });
      }
    } catch (err) {
      const { status, data } = err.response;
      if (status === 403) {
        ToastQueue.info(data, {
          timeout: 3000,
          actionLabel: "Go to Explore",
          onAction: () => navigate("/explore"),
          shouldCloseOnAction: true,
        });
      }
    } finally {
      close();
    }
  };

  return (
    <div className="topbar-container">
      <DialogTrigger type="modal">
        <ActionButton UNSAFE_style={{ padding: "10px" }} isQuiet>
          <h4>Publish</h4>
        </ActionButton>
        {(close) => (
          <Dialog>
            <Heading>Enter project details</Heading>
            <Divider />
            <Content>
              <Form>
                <TextField
                  value={title}
                  onChange={(text) => setTitle(text)}
                  label="Title"
                />
                <TextField
                  value={desc}
                  onChange={(text) => setDesc(text)}
                  label="Description"
                />
                <TextField
                  value={tag}
                  onChange={(text) => setTag(text)}
                  label="Tags"
                />
                {tag.length > 2 && (
                  <ButtonGroup align="end">
                    <Button onPress={addTag} marginY={10} variant="accent">
                      {tag}
                    </Button>
                  </ButtonGroup>
                )}
                <TagGroup
                  actionLabel="Clear"
                  onAction={() => setTags([])}
                  aria-label="Static TagGroup items example"
                  onRemove={onRemove}
                >
                  {tags.map((tag, i) => (
                    <Item key={i}>{tag}</Item>
                  ))}
                </TagGroup>
              </Form>
            </Content>
            <ButtonGroup>
              <Button variant="secondary" onPress={close}>
                Cancel
              </Button>
              <Button
                variant="accent"
                onPress={() => createPostHandler(close)}
                autoFocus
              >
                Publish
              </Button>
            </ButtonGroup>
          </Dialog>
        )}
      </DialogTrigger>
      <DialogTrigger type="popover">
        <ActionButton marginX={20} staticColor="white" isQuiet>
          <Bell size="S" />
        </ActionButton>
        <Dialog UNSAFE_style={{ backgroundColor: "#212329", border: "none" }}>
          <Heading>Notifications</Heading>
          <Divider />
          <Content>
            {notifications?.map((notification) => (
              <>
                <NotificationItem
                  key={notification._id}
                  onReject={() => rejectHandler(notification?._id)}
                  onApprove={() => approveHandler(notification?._id)}
                  {...notification}
                />
                <Divider size="S" />
              </>
            ))}
          </Content>
        </Dialog>
      </DialogTrigger>

      <div className="topbar-userprofile">
        <div className="topbar-userprofile-image">
          <img
            src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg"
            alt="user-profile"
          />
        </div>
        <div className="topbar-userprofile-name">
          <p>
            Hey, <span>{name}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
