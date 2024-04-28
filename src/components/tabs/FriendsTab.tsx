import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../cards/ProfileCard";
import Loader from "../loader/Loader";
import { notify } from "../../utils/common";
import { getUserDetail } from "../../services/userServices";
import { adduserDetail } from "../../features/userSlice";
import { STATUS_CODES } from "../../utils/constants";
import { blockUser } from "../../services/friendsServices";

const FriendsTab = () => {
  const { userDetail, userToken } = useSelector(
    (state:any) => state.users
  );
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  const blockBtn = true;
  const friendScreen = true;

  const getFunc = async () => {
    const resp = await getUserDetail(userDetail?.id);
    if (resp?.statusCode === STATUS_CODES.OK) {
      dispatch(adduserDetail(resp.data));
      setLoader(false);
    } else {
      notify(resp?.data?.message);
    }
  };

  useEffect(() => {
    getFunc();
  }, [loader]);

  const handleShowModal = async (id, type) => {
    const resp = await blockUser(userToken, id, null);
    if (resp?.statusCode === STATUS_CODES.OK) {
      setLoader(true);
    } else {
      notify(resp?.data?.message);
    }
  };

  return (
    <>
      {loader ? (
        <div className="setLod">
          <Loader />
        </div>
      ) : (
        <div className="notificationsMainDiv setNotificationsMainDiv px-5">
          {userDetail.user_friends &&
          userDetail.user_friends.filter(
            (item) => item.user_status === "active"
          ).length > 0 ? (
            userDetail.user_friends
              .filter((item) => item.user_status === "active")
              .map((item) => (
                <ProfileCard
                  key={item.id} // Make sure to include a unique key for each ProfileCard
                  item={item}
                  handleShowModal={handleShowModal}
                  blockBtn={blockBtn}
                  friendScreen={friendScreen}
                />
              ))
          ) : (
            <div className="notification noNotification">
              <p className="notificationP">No Friends Found</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FriendsTab;
