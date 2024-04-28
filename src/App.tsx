import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
// import { notify } from "./utils/common";
import PrivateRoutes from "./components/hoc/PrivateRoutes";

export default function App() {
  // if (Notification.permission !== "granted") {
  //   Notification.requestPermission().then((permission) => {
  //     if (permission === "granted") {
  //       // console.log("Notification permission granted");
  //       // You can now send notifications
  //     } else {
  //       notify(
  //         "Notification permission denied! Please Enable to recieve Notifications"
  //       );
  //     }
  //   });
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
