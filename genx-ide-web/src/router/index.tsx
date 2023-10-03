import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
//layout
import Root from "../layout/Root";
import ExploreLayout from "../layout/ExploreLayout";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import UnAuthenticatedLayout from "../layout/UnAuthenticatedLayout";
// pages
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";
import Explore from "../pages/ExplorePage";
import CreateProject from "../pages/CreateProject";
import Workspace from "../pages/WorkspacePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<UnAuthenticatedLayout />}>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/" element={<ExploreLayout />}>
        <Route path="/explore" element={<Explore />} />
      </Route>
      <Route path="/workspace" element={<AuthenticatedLayout />}>
        <Route path="" element={<CreateProject />} />
        <Route path="project" element={<Workspace />}>
          <Route path=":projectId" element={<Workspace />} />
        </Route>
      </Route>
    </Route>
  )
);
export default router;
