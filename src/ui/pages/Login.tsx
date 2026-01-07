import { IonPage, useIonRouter } from "@ionic/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Images
import Logo from "../../assets/AlertMe.png";
import Pattern from "../../assets/Pattern/Citizen.svg";
import { routeConfig } from "../../config/routeConfig";
import { toastConfig } from "../../config/toastConfig";
import { authUser } from "../../services/authUser";
const LoginPage: React.FC = () => {
  const router = useIonRouter();
  // State for form inputs
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Handle login button click
  const handleLogin = async () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !regex.test(email)) {
      toastConfig({
        toastType: "error",
        toastMessage: "Email không hợp lệ",
      });
      return;
    }

    if (!password || password.trim().length === 0) {
      toastConfig({
        toastType: "error",
        toastMessage: "Vui lòng nhâp mật khẩu",
      });
      return;
    }

    const loginResponse: undefined | boolean | string = await authUser.signin(
      email,
      password,
    );
    if (loginResponse) {
      router.push(loginResponse);
    }
  };

  return (
    <IonPage>
      <div className="relative h-full w-full bg-white overflow-hidden">
        {/* Background Patterns */}
        <img
          src={Pattern}
          alt="pattern"
          className="absolute -top-16 -left-16 w-64 h-64 opacity-20 transform rotate-45"
        />
        <img
          src={Pattern}
          alt="pattern"
          className="absolute -bottom-16 -right-16 w-64 h-64 opacity-20 transform rotate-12"
        />

        <div className="relative z-10 h-full flex flex-col justify-center">
          <div className="flex flex-col gap-7 px-4">
            {/* Header */}
            <span className="w-full flex flex-col items-center text-center">
              <img src={Logo} alt="AlertMe Logo" className="w-24 h-24" />
              <h1 className="leading-none! text-4xl text-mainDark font-bold">
                Đăng nhập
              </h1>
              <p className="text-csMedium text-gray-500">
                Vui lòng đăng nhập để tiếp tục
              </p>
            </span>

            {/* Form */}
            <span className="w-full flex flex-col gap-4">
              <span className="w-full">
                <p className="text-base font-medium text-gray-700">
                  Email <b className="text-red-600">*</b>
                </p>
                <input
                  type="email"
                  className="outline-none w-full text-base border border-gray-300 px-3 py-2.5 rounded-md mt-1 focus:border-red-500"
                  placeholder="nguyenvana@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>

              <span className="w-full">
                <p className="text-base font-medium text-gray-700">
                  Mật khẩu <b className="text-red-600">*</b>
                </p>
                <input
                  type="password"
                  className="outline-none w-full text-base border border-gray-300 px-3 py-2.5 rounded-md mt-1 focus:border-red-500"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </span>
            </span>

            {/* Actions */}
            <span className="w-full mt-2">
              <button
                className="w-full h-fit bg-mainRed text-white text-csMedium py-3! rounded-main! font-medium transition-colors"
                onClick={handleLogin}
              >
                Đăng nhập
              </button>
            </span>

            <span className="flex items-center justify-center">
              <p className="text-csNormal">
                Chưa có tài khoản?{" "}
                <Link
                  to={routeConfig.register.root}
                  className="text-mainRed! font-medium underline italic"
                >
                  Đăng ký
                </Link>
              </p>
            </span>
          </div>
        </div>
      </div>
    </IonPage>
  );
};

export default LoginPage;
