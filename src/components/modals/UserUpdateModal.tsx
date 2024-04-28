import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/common";
import { STATUS_CODES } from "../../utils/constants";
import { updateUser, updateUserStatus } from "../../services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { adduserDetail } from "../../features/userSlice";
import ToastComponent from "../Toast";

interface ConfirmModalProps {
  show: boolean;
  handleClose: () => void;
}

const UserUpdateModal: React.FC<ConfirmModalProps> = ({
  show,
  handleClose,
}) => {

  const [loader, setLoader] = useState(false);
  const data = useSelector((state: any) => state.users.userDetail);
  const token = useSelector((state: any) => state.users.userToken);

  const dispatch = useDispatch();

  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState();

  const imagesPreview = (e) => {
    if (e.target.files[0]) {
      if (e.target.files[0]?.size <= 2097152) {
        setPicture(e.target.files[0]);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.addEventListener("load", () => {
          setImgData(reader.result);
        });
      } else {
        notify("Must be an Image of type png,jpg,jpeg,gif under size of 2MB");
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (fData) => {
    const formData = new FormData();

    formData.append("firstName", fData.fname);
    formData.append("lastName", fData.lname);
    if (picture) {
      formData.append("image", picture);
    }

    const resp = await updateUser(token, formData);
    if (resp?.statusCode === STATUS_CODES.OK) {
      // debugger;
      dispatch(adduserDetail(resp?.data));
      if (fData.message) {
        const body = {
          status: fData.message,
        };
        const resp1 = await updateUserStatus(token, body);
        if (resp1?.statusCode === STATUS_CODES.OK) {
          dispatch(adduserDetail(resp1?.data));
          notify("User Detail Updated Successfully!");
        } else {
          notify(resp1?.data?.message);
        }
      } else {
        notify("User Detail Updated Successfully!");
      }
      handleClose();
    } else {
      notify(resp?.data?.message);
    }
  };

  return (
    <>
      <ToastComponent />
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {/* <div className="upperForm signupFormUpload text-center">
              <div>
                {imgData ? (
                  <img
                    style={{ padding: "7px", borderWidth: "8px" }}
                    className="sizeSet imgBorder"
                    src={imgData}
                    alt=""
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="createFormUploadBtns mb-createFormUploadBtns">
                <div className="uploadBtn text-center">
                  <label htmlFor="fileInput">
                    <img
                      src="/assets/images/Uploadphoto.svg"
                      alt="Upload"
                      style={{ cursor: "pointer" }}
                    />
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => imagesPreview(e)}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div> */}

            <div className="mbcustomerSigninP mb-2">
              <p style={{ color: "black" }} className="mb-1 mb-pad-space">
                First Name
              </p>
              <div>
                <input
                  placeholder="Enter First Name"
                  className="createFormLInput"
                  type="text"
                  {...register("fname", { required: true })}
                  defaultValue={data?.firstName}
                />
                {errors.fname && (
                  <span className="eror">This field is required</span>
                )}
              </div>
            </div>
            <div className="mbcustomerSigninP mb-2">
              <p style={{ color: "black" }} className="mb-1 mb-pad-space">
                Last Name
              </p>
              <div>
                <input
                  placeholder="Enter Last Name"
                  className="createFormLInput"
                  type="text"
                  {...register("lname", { required: true })}
                  defaultValue={data?.lastName}
                />
                {errors.lname && (
                  <span className="eror">This field is required</span>
                )}
              </div>
            </div>
            <div className="mbcustomerSigninP mb-2">
              <p style={{ color: "black" }} className="mb-1 mb-pad-space">
                Email
              </p>
              <div>
                <input
                  placeholder="Email"
                  className="createFormLInput"
                  type="email"
                  value={data?.email}
                  readOnly
                />
              </div>
            </div>
            <div className="mbcustomerSigninP mb-2">
              <p style={{ color: "black" }} className="mb-1 mb-pad-space">
                User Status
              </p>
              <div>
                <textarea
                  placeholder="Status"
                  className="createFormLInput"
                  {...register("message")}
                  defaultValue={data?.status}
                />
                {/* {errors.message && (
                  <span className="eror">This field is required</span>
                )} */}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="smallBtn reverseBtn" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className="smallBtn"
            variant="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserUpdateModal;
