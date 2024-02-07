import { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Spotify = () => {
  const { token } = useSelector((state) => state.spotify);
  const [currentPlaying, setCurrentPlaying] = useState(null);

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
  };
  const playMusic = async () => {
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
  };
  useEffect(() => {
    getCurrentTrack();
  }, [token]);

  useEffect(() => {
    console.log(currentPlaying);
  }, [currentPlaying]);

  return (
    <div>
      <button onClick={changeTrack}>change track</button>
      <button onClick={pauseMusic}>pause</button>
      <button onClick={playMusic}>play</button>
      {currentPlaying && <p>{currentPlaying.name}</p>}
    </div>
  );
};

export default Spotify;
