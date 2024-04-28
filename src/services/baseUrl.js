import axios from "axios";

const liveServer = "https://friend-connection.septemsystems.com/";
const selectedServer = liveServer;
// instance used allover the site as baseUrl
const instance = axios.create({
  baseURL: selectedServer,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

export default instance;
