// import LandingPage from "./LandingPage";
// import "./index.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Body from "./components/Body";
// import Login from "./components/login";
// import Profile from "./components/Profile";
// import { Provider } from "react-redux";
// import appStore from "./utils/AppStore";
// import Feed from "./components/Feed";
// import Connections from "./components/Connections";
// import Requests from "./components/Requests";
// import UserProfile from "./components/UserProfile";

// function App() {
//   return (
//     <>
//       <Provider store={appStore}>
//         <BrowserRouter basename="/">
//           <Routes>
//               <Route path="/" element={<Body />}>
//               <Route index element={<LandingPage />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/profile" element={<Profile />} />
//               <Route path="/profile/:userId" element={<UserProfile />} />
//               <Route path="/connections" element={<Connections />} />
//               <Route path="/requests" element={<Requests />} />
//               <Route path="/feed" element={<Feed />} />
//             </Route>
//           </Routes>
//         </BrowserRouter>
//       </Provider>
//     </>
//   );
// }

// export default App;

import LandingPage from "./LandingPage";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/AppStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import UserProfile from "./components/UserProfile";
import ErrorPage from "./components/ErrorPage"; // ✅ import error page
import WorkInProgress from "./components/WorkInProgress";
function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/feed" element={<Feed />} />

            {/* Example manual error routes */}
            <Route path="/forbidden" element={<ErrorPage code={403} />} />
            <Route path="/server-error" element={<ErrorPage code={500} />} />

            {/* Catch-all route for 404 */}
            <Route path="*" element={<ErrorPage code={404} />} />
            <Route path="/wip" element={<WorkInProgress />} />
           <Route path="/wip/:page" element={<WorkInProgress />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
