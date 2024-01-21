import { io } from "socket.io-client";

const socket = io.connect(import.meta.env.VITE_SERVER_URL);
export default socket;
