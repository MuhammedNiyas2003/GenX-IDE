import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
//auth
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
//routes
import compilerRouter from "./routes/compiler.js";
import authRouter from "./routes/auth.js";
import openaiRouter from "./routes/openai.js";
import workspaceRouter from "./routes/workspace.js";
import fileFolderRouter from "./routes/fileFolder.js";
import invitationRouter from "./routes/invitation.js";
// models
import User from "./models/User.js";
import session from "cookie-session";
//socket
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: true });

dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", async (req, res) => {
  res.send("GenX backend");
});
//auth
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/auth/github/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          // If user doesn't exist, create a new one
          user = new User({
            username: profile.username,
            githubId: profile.id,
            email: profile.email,
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
//socket connection
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});

//routes
app.use("/api/compiler", compilerRouter);
app.use("/api/auth", authRouter);
app.use("/api/openai", openaiRouter);
app.use("/api/workspace", workspaceRouter);
app.use("/api/file-folder", fileFolderRouter);
app.use("/api/invitation", invitationRouter);

//db connection
mongoose.set("strictQuery", true);
mongoose
  .connect(
    process.env.MONGODB_URL || {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    server.listen(process.env.PORT, () =>
      console.log(`server port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(`${err} : did not connect`));
