import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
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
  AlertDialog,
} from "@adobe/react-spectrum";
//comp
import Spotify from "../../Spotify";
//icons
import {
  forwardIcon,
  pauseIcon,
  rewindIcon,
  spotifyIcon,
  playIcon,
} from "../../../contants/icons";
import { clearWorkspace } from "../../../state/reducers/workspaceSlice";

const BottomBar = () => {
  const { loggedIn, token } = useSelector((state) => state.spotify);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(setLogout());
    dispatch(setLogoutSpotify());
    dispatch(clearWorkspace());
  };

  const redirect_uri = `${import.meta.env.VITE_CLIENT_URL}/workspace`;
  const spotifyLoginHandler = () => {
    const client_id = "af711a8074794d1cb9dcf724638c0123";

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

  // spotify actions

  const getCurrentTrack = useCallback(async () => {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.data !== "") {
      const currentPlaying = {
        id: response.data.item.id,
        name: response.data.item.name,
        artists: response.data.item.artists.map((artist) => artist.name),
        image: response.data.item.album.images[2].url,
      };
      setCurrentPlaying(currentPlaying);
    } else {
      console.log("no current playing");
    }
  }, []);

  const changeTrack = async () => {
    await axios.post(
      "https://api.spotify.com/v1/me/player/next",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    getCurrentTrack();
  };
  const pauseMusic = async () => {
    try {
      await axios.put(
        "https://api.spotify.com/v1/me/player/pause",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsPlaying(false);
    }
  };
  const playMusic = async () => {
    try {
      await axios.put(
        "https://api.spotify.com/v1/me/player/play",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsPlaying(true);
    }
  };
  useEffect(() => {
    getCurrentTrack();
  }, [token]);

  useEffect(() => {
    console.log(currentPlaying);
  }, [currentPlaying]);
  return (
    <div className="bottombar-container">
      <div className="bottombar-user">
        <DialogTrigger>
          <ActionButton staticColor="white" isQuiet>
            <p className="logout-btn">Sign Out</p>
          </ActionButton>
          <AlertDialog
            variant="destructive"
            title="Sign Out"
            primaryActionLabel="Sign Out"
            cancelLabel="Cancel"
            onPrimaryAction={logoutHandler}
          >
            Logout your account from genx
          </AlertDialog>
        </DialogTrigger>
      </div>
      <div className="bottombar-music">
        {loggedIn ? (
          <DialogTrigger type="popover" placement="top" containerPadding={20}>
            <ActionButton staticColor="white" isQuiet>
              <img className="spotify-icon" src={spotifyIcon} alt="spotify" />{" "}
              <p className="spotify-connect-text">
                {currentPlaying ? currentPlaying.name : "Play Music"}
              </p>
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
          {isPlaying ? (
            <img onClick={pauseMusic} src={pauseIcon} alt="" />
          ) : (
            <img onClick={playMusic} src={playIcon} alt="" />
          )}
          <img onClick={changeTrack} src={forwardIcon} alt="" />
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
