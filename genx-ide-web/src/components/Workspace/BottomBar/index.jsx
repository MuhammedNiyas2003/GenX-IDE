import { useDispatch, useSelector } from "react-redux";
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
import Spotify from "../../Spotify";

const BottomBar = () => {
  const { loggedIn } = useSelector((state) => state.spotify);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(setLogout());
  };

  const spotifyLoginHandler = () => {
    const client_id = "af711a8074794d1cb9dcf724638c0123";
    const redirect_uri = "http://localhost:5173/workspace";
    const api_uri = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
    ];
    window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };
  return (
    <div className="bottombar-container">
      <div className="bottombar-user">
        <Button onClick={logoutHandler} text="Logout" />
      </div>
      <div className="bottombar-music">
        {loggedIn ? (
          <DialogTrigger type="popover" placement="top" containerPadding={20}>
            <ActionButton staticColor="white" isQuiet>
              spotify
            </ActionButton>
            <Dialog
              UNSAFE_style={{ backgroundColor: "#212329", border: "none" }}
            >
              <Heading>The Heading</Heading>
              <Divider />
              <Content>
                <Spotify />
              </Content>
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
              onPrimaryAction={() => spotifyLoginHandler()}
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
