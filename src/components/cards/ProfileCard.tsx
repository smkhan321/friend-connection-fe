const ProfileCard = ({ item, handleShowModal, blockBtn, friendScreen }) => {

  const handleClick = (type) => {
    handleShowModal(item.id, type); // Pass the id to the parent component
  };
  
  return (
    <div className="notification setNoti">
      <div className="ml25">
        <img
          src="/assets/images/avatar.png"
          alt=""
          style={{ marginBottom: "10px" }}
        />
        <h5 className="notificationH5">
          <span className="boldr">Name </span>: {item?.fullName}
        </h5>
        <h5 className="notificationH5">
          <span className="boldr">Email</span> : {item?.email}
        </h5>
        <p className="notificationP">
          {item?.desc} &nbsp;
          <div style={{ display: "flex", gap: "10px" }}>
          {!friendScreen && item?.request_sent !== true && (
              <button
                className="btn smallBtn mt-2"
                onClick={() => handleClick("request")}
              >
                Send Request
              </button>
            )}

            {blockBtn && (
              <button
                className="btn smallBtn mt-2 reverseBtn"
                onClick={() => handleClick("block")}
              >
                Block
              </button>
            )}
          </div>
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
