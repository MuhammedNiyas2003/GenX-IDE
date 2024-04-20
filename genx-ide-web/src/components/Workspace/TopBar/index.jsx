import { useEffect } from "react";
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
  View,
} from "@adobe/react-spectrum";
import Bell from "@spectrum-icons/workflow/Bell";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../../../state/reducers/notificationSlice";
//comp
import NotificationItem from "../../NotificationItem";

const TopBar = () => {
  const { name, _id } = useSelector((state) => state.auth.user);
  const { notifications } = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  const getNotifications = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/invitation/${_id}`
      );
      const { status, data } = response.data;
      if (status === "SUCESS") {
        console.log("notifications", data);
        dispatch(setNotifications(data));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const approveHandler = async (invitationId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/invitation/approve/${_id}`,
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

  return (
    <div className="topbar-container">
      <Button variant="secondary" style="fill">
        Publish
      </Button>
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
