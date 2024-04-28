import React, { useEffect, useState } from "react";
import {
  acceptRequest,
  deleteRequest,
  deleteRequestReciever,
  getAllFriendRequests,
} from "../../services/friendsServices";
import { STATUS_CODES } from "../../utils/constants";
import { addRequests } from "../../features/friendSlice";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../utils/common";
import Loader from "../loader/Loader";

const RequestTabs = () => {
  const [showModal, setShowModal] = useState(false);
  const { userToken } = useSelector((state: any) => state.users);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [activeTab, setActiveTab] = useState("requestsReceived");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [loader, setLoader] = useState(true);
  const token = useSelector((state: any) => state.users.userToken);
  const data = useSelector((state: any) => state.request.allRequests);

  const dispatch = useDispatch();

  const handleRequest = async (id, type) => {
    // debugger;
    if (type === "cancel") {
      let resp;
      if (activeTab === "requestsReceived") {
        resp = await deleteRequestReciever(userToken, id);
        if (resp?.statusCode === STATUS_CODES.OK) {
          setLoader(true);
        }
      } else {
        resp = await deleteRequest(userToken, id);
        if (resp?.statusCode === STATUS_CODES.OK) {
          setLoader(true);
        }
      }
    } else {
      const resp = await acceptRequest(userToken, id);
      if (resp?.statusCode === STATUS_CODES.OK) {
        setLoader(true);
      }
    }
  };

  const getFunc = async () => {
    const resp = await getAllFriendRequests(token);
    if (resp?.statusCode === STATUS_CODES.OK) {
      dispatch(addRequests(resp?.data));
    } else {
      notify(resp?.data?.message);
    }
    setLoader(false);
  };

  useEffect(() => {
    getFunc();
  }, [loader]);

  return (
    <>
      <div className="towBtun">
        <button
          className={`btn reverseBtn ${
            activeTab === "requestsReceived" ? "activee" : ""
          }`}
          onClick={() => handleTabClick("requestsReceived")}
        >
          Requests Received
        </button>
        <button
          className={`btn reverseBtn ${
            activeTab === "Requests" ? "activee" : ""
          }`}
          onClick={() => handleTabClick("Requests")}
        >
          Requests Sent
        </button>
      </div>

      {loader ? (
        <div className="setLod">
          <Loader />
        </div>
      ) : (
        <div className="notificationsMainDiv setNotificationsMainDiv px-5">
          {data[activeTab]?.length > 0 ? (
            data[activeTab].map((item) => {
              return (
                <div className="notification setNoti">
                  <div className="ml25">
                    <img
                      src="/assets/images/avatar.png"
                      alt=""
                      style={{ marginBottom: "10px" }}
                    />
                    <h5 className="notificationH5">
                      Name :{" "}
                      {activeTab === "requestsReceived"
                        ? item?.user?.fullName
                        : item?.friend?.fullName}
                    </h5>
                    <h5 className="notificationH5">
                      Status : {item?.friend?.status || "N/A "}
                      {activeTab === "requestsReceived"
                        ? item?.user?.status || ""
                        : item?.friend?.status || ""}
                    </h5>

                    {activeTab === "requestsReceived" ? (
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          className="btn smallBtn mt-2"
                          onClick={() => handleRequest(item?.id, "accept")}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRequest(item?.id, "cancel")}
                          className="btn smallBtn mt-2 reverseBtn"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleRequest(item?.id, "cancel")}
                        className="btn smallBtn mt-2 reverseBtn"
                      >
                        Cancel Request
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="notification noNotification">
              <p className="notificationP">No requests found</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RequestTabs;
