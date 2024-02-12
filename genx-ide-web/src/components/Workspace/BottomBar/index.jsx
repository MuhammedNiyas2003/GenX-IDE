import { useDispatch, useSelector } from "react-redux";
import Button from "../../Button";
import "./style.scss";
// redux
import { setLogout } from "../../../state/reducers/authSlice";
import { setLogout as setLogoutSpotify } from "../../../state/reducers/spotifySlice";
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
import {
  forwardIcon,
  pauseIcon,
  rewindIcon,
  spotifyIcon,
} from "../../../contants/icons";

const BottomBar = () => {
  const { loggedIn } = useSelector((state) => state.spotify);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(setLogout());
    dispatch(setLogoutSpotify());
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
              <img className="spotify-icon" src={spotifyIcon} alt="spotify" />{" "}
              <p className="spotify-connect-text">Play Music</p>
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
              <img className="spotify-icon" src={spotifyIcon} alt="spotify" />{" "}
              <p className="spotify-connect-text">Connect spotify</p>
            </ActionButton>
            <AlertDialog
              variant="confirmation"
              title="Connect your Spofity..."
              primaryActionLabel="Open Spotify"
              cancelLabel="Cancel"
              onPrimaryAction={() => spotifyLoginHandler()}
            >
              Connect your spotify account ( The spotify account should be added
              to the dashboard and premium ⚠️ )
            </AlertDialog>
          </DialogTrigger>
        )}
      </div>
      {loggedIn && (
        <div className="bottombar-music-controllers">
          <img src={rewindIcon} alt="" />
          <img src={pauseIcon} alt="" />
          <img src={forwardIcon} alt="" />
        </div>
      )}

      <div className="bottombar-details">
        <div className="bottombar-users">
          <img
            src="https://astrotalk.com/astrology-blog/wp-content/uploads/2023/08/istockphoto-1040964930-612x612-1.jpg"
            alt=""
          />
        </div>
        <div className="bottombar-users">
          <img
            src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg"
            alt=""
          />
          "
        </div>
        <div className="bottombar-users">
          <img
            src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
