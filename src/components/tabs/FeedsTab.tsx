import  { useEffect, useState } from "react";
import { getUserFeeds } from "../../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { STATUS_CODES } from "../../utils/constants";
import { addfeeds } from "../../features/userSlice";
// import { notify } from "../../utils/common";
import Loader from "../loader/Loader";

const FeedsTab = () => {
  const token = useSelector((state: any) => state.users.userToken);
  const feeds = useSelector((state: any) => state.users.feeds);
  const [loader, setLoader] = useState(true);

  const dispatch = useDispatch();

  const getFunc = async () => {
    // debugger;
    const resp = await getUserFeeds(token);
    if (resp?.statusCode === STATUS_CODES.OK) {
      dispatch(addfeeds(resp?.data));
    } 
    // else {
    //   notify(resp?.data?.message);
    // }
    setLoader(false);
  };

  useEffect(() => {
    getFunc();
  }, []);

  return (
    <>
      {loader ? (
        <div className="setLod">
          <Loader />
        </div>
      ) : (
        <div className="notificationsMainDiv px-5">
          {feeds?.length > 0 ? (
            feeds?.map((item:any) => {
              return (
                <div className="notification alignUnset">
                  <div style={{marginRight:"20px"}}>
                    <img
                      src="/assets/images/avatar.png"
                      alt=""
                      style={{ marginBottom: "10px" }}
                    />
                  </div>
                  <div className="ml25">
                    <h5 className="notificationH5"><span className="boldr"> First Name</span> : {item?.firstName}</h5>
                    <h5 className="notificationH5"><span className="boldr">Last Name</span> : {item?.lastName}</h5>
                    <h5 className="notificationH5"><span className="boldr">Status</span> : {item?.status ?  item?.status : "N/A"}</h5>
                    <p className="notificationP">
                      {item?.desc} &nbsp;
                      {/* <span className="green">View More</span> */}
                      {/* <button className="btn smallBtn mt-2">View More</button> */}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="notification noNotification">
              <p className="notificationP">No current feeds</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FeedsTab;
