import { useDispatch } from "react-redux";
import Button from "../../Button";
import "./style.scss";
// redux
import { setLogout } from "../../../state/reducers/authSlice";
//spectrum
import {
  DialogTrigger,
  Dialog,
  ActionButton,
  Content,
  Heading,
  Divider,
  Text,
  ButtonGroup,
  AlertDialog,
} from "@adobe/react-spectrum";

const BottomBar = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(setLogout());
  };
  const isLogged = true;
  return (
    <div className="bottombar-container">
      <div className="bottombar-user">
        <Button onClick={logoutHandler} text="Logout" />
        hi
      </div>
      <div className="bottombar-music">
        {isLogged ? (
          <DialogTrigger type="popover" placement="top" containerPadding={20}>
            <ActionButton staticColor="white" isQuiet>
              spotify
            </ActionButton>
            <Dialog
              UNSAFE_style={{ backgroundColor: "#212329", border: "none" }}
            >
              {/* <Heading>The Heading</Heading>
              <Divider />
              <Content>
                <Text>This is a popover.</Text>
              </Content> */}
            </Dialog>
          </DialogTrigger>
        ) : (
          <DialogTrigger>
            <ActionButton staticColor="white" isQuiet>
              connect spotify
            </ActionButton>
            <AlertDialog
              variant="information"
              title="Connect your Spofity"
              primaryActionLabel="Sign In"
              cancelLabel="Cancel"
            >
              Please connect an existing account to sync any new files.
            </AlertDialog>
          </DialogTrigger>
        )}
      </div>
      <div className="bottombar-details"></div>
    </div>
  );
};

export default BottomBar;
