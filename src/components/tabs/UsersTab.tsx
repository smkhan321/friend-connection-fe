import { useEffect, useState } from "react";
import ProfileCard from "../cards/ProfileCard";
import { useDispatch, useSelector } from "react-redux";
import { addUsers } from "../../features/userSlice";
import { getAllUsers } from "../../services/userServices.js";
import { STATUS_CODES } from "../../utils/constants.js";
import ConfirmModal from "../modals/ConfirmModal.js";
import { notify } from "../../utils/common.js";
import {
  deleteRequest,
  sendRequest,
} from "../../services/friendsServices.js";
import Loader from "../loader/Loader.js";

const UsersTab = () => {
  const { userToken, users } = useSelector(
    (state: any) => state.users
  );
  const [loader, setLoader] = useState(true);
  const isBlockBtn = false;

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  // const handleShowModal = () => setShowModal(true);
  const handleShowModal = async (id, type,undefined) => {
    // debugger;
    if (type === "request") {
      const resp = await sendRequest(userToken, id,undefined);
      if (resp?.statusCode === STATUS_CODES.OK) {
        setLoader(true);
      } else {
        notify(resp?.data?.message);
      }
    } else {
      const resp = await deleteRequest(userToken, id);
      if (resp?.statusCode === STATUS_CODES.OK) {
        setLoader(true);
      } else {
        notify(resp?.data?.message);
      }
    }
  };

  const getFunc = async () => {
    const resp = await getAllUsers(userToken);
    if (resp?.statusCode === STATUS_CODES.OK) {
      dispatch(addUsers(resp?.data));
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
      {loader ? (
        <div className="setLod">
          <Loader />
        </div>
      ) : (
        <div className="notificationsMainDiv setNotificationsMainDiv px-5">
          {users?.length > 0 ? (
            users?.map((item) => {
              return (
                <ProfileCard
                  item={item}
                  handleShowModal={handleShowModal}
                  blockBtn={isBlockBtn}
                />
              );
            })
          ) : (
            <div className="notification noNotification">
              <p className="notificationP">No Users Found</p>
            </div>
          )}
          {/* not showing below */}
          <ConfirmModal show={showModal} handleClose={handleCloseModal} />
        </div>
      )}
    </>
  );
};

export default UsersTab;
