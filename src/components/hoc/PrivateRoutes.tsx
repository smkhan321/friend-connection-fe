import { useSelector } from "react-redux";
import { ReactNode } from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
function PrivateRoutes({ children }: { children: ReactNode }) {
    const { userToken } = useSelector((state: any) => state.users);

  //UseState
  const [isExpiredTime, setIsExpiredTime] = useState(true);
  //UseEffect
  useEffect(() => {
    checkExpiryTime();
  }, []);
  //Functions
  const checkExpiryTime = () => {
    // debugger
    if (userToken) {
      setIsExpiredTime(true);
    } else {
      setIsExpiredTime(false);
    }
  };
  return isExpiredTime ? <div>{children}</div> : <Navigate to="/" />;
}

export default PrivateRoutes;
