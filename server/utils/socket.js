import { io } from "socket.io-client";
import { serverURL } from './server.js'

const socket = io.connect(serverURL);
export default socket; 