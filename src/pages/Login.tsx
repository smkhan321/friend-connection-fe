import  {  useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUser, getUserDetail, userLogin } from "../services/userServices";
import { useDispatch } from "react-redux";
import { STATUS_CODES } from "../utils/constants";
import { addToken, adduserDetail } from "../features/userSlice";
import ToastComponent from "../components/Toast";
import { notify } from "../utils/common";
import { onMessageListener } from "../firebase";

const Login = () => {
  // const { userToken } = useSelector((state: RootState) => state.users);
  onMessageListener()
    .then((payload) => {
      // setShow(true);
      // setNotification({title: payload.notification.title, body: payload.notification.body})
      alert(payload);
    })
    .catch((err) => console.log("failed: ", err));

  //
  const [loader, setLoader] = useState(false);

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
  // submiting data
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showFirstInput, setShowFirstInput] = useState(true);

  const toggleInputs = () => {
    setShowFirstInput(!showFirstInput);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // requestForToken()
  // return

  const onSubmit = async (fData) => {
    setLoader(true);
    try {
      if (showFirstInput) {
        const data = {
          email: fData.email,
        };
        const resp = await userLogin(data);
        if (resp?.data?.statusCode === STATUS_CODES.OK) {
          dispatch(addToken(resp?.data?.data?.uuid));
          const resp1 = await getUserDetail(resp?.data?.data?.uuid);
          if (resp1?.statusCode === STATUS_CODES.OK) {
            dispatch(adduserDetail(resp1?.data));
            navigate("/home");
          } else {
            notify(resp1?.data?.message);
          }
        } else {
          notify(resp?.data?.message);
        }
      } else {
        if (picture) {
          const formData = new FormData();

          formData.append("email", fData.email);
          formData.append("firstName", fData.fname);
          formData.append("lastName", fData.lname);
          formData.append("fcm_token", "test123");
          formData.append("image", picture);

          const resp = await createUser(formData);
          if (resp?.data?.statusCode === STATUS_CODES.OK) {
            dispatch(addToken(resp?.data?.data?.id));
            const resp1 = await getUserDetail(resp?.data?.data?.id);
            if (resp1?.statusCode === STATUS_CODES.OK) {
              dispatch(adduserDetail(resp1?.data));
              navigate("/home");
            } else {
              notify(resp1?.data?.message);
            }
          } else {
            notify(resp?.data?.message);
          }
        } else {
          notify("Image is Required!");
        }
      }
    } catch (error) {
      notify("An error occurred. Please try again.");
    } finally {
      setLoader(false); // Stop loader after async operations are done or if an error occurs
    }
  };

  // useEffect(() => {
  //   if(userToken){
  //     navigate("/home")
  //   }
  // }, [])

  return (
    <div className={`signInMain ${!showFirstInput ? "addMg" : ""}`}>
      <ToastComponent />
      {/* <ToastComponent />
      <button onClick={notify}>Notify!</button> */}
      <form onSubmit={handleSubmit(onSubmit)} className="signUpStudentForm">
        <h2 style={{ textAlign: "center" }}>
          {" "}
          {showFirstInput ? "Join" : "Sign In"}
        </h2>
        <div>
          {showFirstInput ? (
            <div className="mbcustomerSigninP mb-2">
              <p style={{ color: "black" }} className="mb-1 mb-pad-space">
                Email Address
              </p>
              <div>
                <input
                  placeholder="Email Address"
                  className="createFormLInput"
                  type="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="eror">This field is required</span>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="upperForm signupFormUpload text-center">
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
              </div>

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
                  />
                  {errors.lname && (
                    <span className="eror">This field is required</span>
                  )}
                </div>
              </div>
              <div className="mbcustomerSigninP mb-2">
                <p style={{ color: "black" }} className="mb-1 mb-pad-space">
                  Email Address
                </p>
                <div>
                  <input
                    placeholder="Email Address"
                    className="createFormLInput"
                    type="email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="eror">This field is required</span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="">
          <button disabled={loader} type="submit" className="btn setBtn">
            {showFirstInput ? "Join" : "Sign In"}
          </button>
        </div>
        <button
          type="button"
          className="btn"
          style={{ margin: "auto", marginBottom: "20px" }}
          onClick={toggleInputs}
        >
          {showFirstInput ? "Switch to SignUp" : "Swtich to SignIn"}
        </button>
      </form>
    </div>
  );
};

export default Login;
