import { useRef, useState, useEffect, useCallback } from "react";
import "./style.scss";
import { gsap } from "gsap";
//video conference
import socket from "../../../utils/socket/socket";
import peer from "../../../service/peer.js";
import ReactPlayer from "react-player";
//adobe icons
import ChevronDoubleLeft from "@spectrum-icons/workflow/ChevronDoubleLeft";
import ChevronDoubleRight from "@spectrum-icons/workflow/ChevronDoubleRight";
import { ActionButton,Button } from "@adobe/react-spectrum";

const RightBar = () => {
  const windowRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleWindowHandler = (state) => {
    const tl = gsap.timeline();

    if (state === "open") {
      tl.to(windowRef.current, {
        width: 300,
        ease: "power1.inOut",
        duration: 0.2,
      });
      setIsOpen(true);
    } else {
      setIsOpen(false);
      tl.to(windowRef.current, {
        width: 60,
        ease: "power1.inOut",
        duration: 0.2,
      });
    }
  };
  // socket
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);
  return (
    <div ref={windowRef} className="rightbar-container">
      <div className="right-bar-toggle">
        {isOpen ? (
          <ActionButton onPress={() => toggleWindowHandler("close")} isQuiet>
            <ChevronDoubleRight />
          </ActionButton>
        ) : (
          <>
            <ActionButton onPress={() => toggleWindowHandler("open")} isQuiet>
              <ChevronDoubleLeft />
            </ActionButton>
          </>
        )}
      </div>

      <div>
        <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
        {myStream && <Button onClick={sendStreams}>Send Stream</Button>}
        {remoteSocketId && <Button onClick={handleCallUser}>CALL</Button>}
        <div className="video-items">
          {myStream && (
            <>
              <div className="video-item">
                <ReactPlayer
                  playing
                  height="100%"
                  width="100%"
                  url={myStream}
                />
              </div>
            </>
          )}
          {remoteStream && (
            <>
              <div className="video-item">
                <ReactPlayer
                  playing
                  height="100%"
                  width="100%"
                  url={remoteStream}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
