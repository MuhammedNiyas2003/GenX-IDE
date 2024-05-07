# GenX-IDE ( Online Code Editor )

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
 
# Features
- **Real-time Collaboration:** Engage in teamwork across distances with WebRTC video conferencing.
- **Real-time Mouse Pointer Sharing:** Enhance collaboration with live sharing.
- **Built-in Invitation Sending:** Simplify team coordination with easy Invitation sending.
- **AI features :** AI for code generation and conversion.
- **Intuitive Project Management:** Navigate effortlessly with our tree-view file folders.
- **GitHub Authentication:** Integrate effortlessly for collaborative development.


## Technologies

- **Frontend**:
  - React.js
  - Redux toolkit for state management
  - Axios for API requests
  - React Spectrum
  - GSAP
  - Monaco Editor
  - Web Socket
  - Redux Persist
  - Sass

- **Backend**:
  - Node.js with Express.js
  - MongoDB for the database
  - Mongoose
  - JWT ( jsonwebtokens )
  - Web Sockets
  - Bcrypt
  - google/generative-ai
  - passport-github2
  - axios

## Getting Started

To run this project on your local machine, follow these steps:

1 . Clone the repository:

   ```bash
   git clone https://github.com/mohammedfarisofficial/GenX-IDE.git
   cd GenX-IDE
   npm run dev
   ```
2 .  To start the frontend
```bash
cd client
npm run dev
```
  3 .  To start the backend
```
cd ../server
 && npm run dev
 ```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

1 . Frontend 

`VITE_SERVER_URL=`

`VITE_CLIENT_URL=`

2 . Backend

`MONGODB_URL=`

`PORT=`

`JWT_SECRET=`

`GITHUB_CLIENT_ID=`

`GITHUB_CLIENT_SECRET=`

`SERVER_URL=`

`GEMINI_API_KEY=` 
 ## Screenshots
