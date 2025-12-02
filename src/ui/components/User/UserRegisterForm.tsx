import React, { useState, useEffect, useRef } from "react";
import { useIonRouter } from "@ionic/react";

// Spinner
import { BounceLoader } from "react-spinners";

// Config
import { routeConfig } from "../../../config/routeConfig";
import { Link } from "react-router-dom";
import { toastConfig } from "../../../config/toastConfig";
import { authUser } from "../../../services/authUser";

// Resend component
const Resend: React.FC<{email: string}> = ({ email }) => {
  const [time, setTime] = useState<number>(20)
  const timerRef = useRef<number | null>(null)
  const [flag, setFlag] = useState<boolean>(false)

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setTime(t => {
        if (t <= 1) {
          // sẽ về 0 rồi dừng
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [flag]);

  const reSendVerification = async () => {
    if (time === 0) {
      // do something
      const resendState = await authUser.reSendVerification(email)
      setFlag(!flag)
      setTime(20)
    }
  }

  return (
    <div className="h-fit w-full flex flex-col gap-0.5">
      <button className={`w-full h-fit py-3.5! ${time > 0 && 'bg-gray!'} bg-mainDark text-csMedium font-medium text-white hover:cursor-grab rounded-main!`} disabled={!(time === 0)} onClick={reSendVerification}>Gửi lại mã</button>
      <p className="text-csMedium font-medium">00:{time >= 10 ? time : `0${time}`}</p>
      <span className="flex text-csNormal italic font-medium text-mainDark mt-5">
        Tài khoản đã được xác thực nếu bạn không tìm thấy email sau khi đã gửi lại thành công.
      </span>
    </div>
  )
}

interface ProcessPopup_interface {
  isCreate: boolean;
  username: string;
  email: string;
  password: string;
}

const ProcessPopup: React.FC<ProcessPopup_interface> = ({
  isCreate,
  email,
  password,
  username,
}) => {
  const [isComplete, setIsComplete] = useState(false);
  const router = useIonRouter();

  useEffect(() => {
    if (!isCreate && (!email || !password || !username)) return;

    register();
  }, []);

  const register = async () => {
    const signup = await authUser.signup(email, password, username);

    if (signup) setIsComplete(true)
  };

  const handleNavigate = () => {
    router.push(routeConfig.login.root, "root");
  };

  if (isComplete) {
    return (
      <div className="absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.8)] flex items-center-safe justify-center-safe px-mainTwoSidePadding">
        <div className="w-full h-fit bg-white rounded-main p-5 flex flex-col gap-2.5 items-center-safe text-center">
          <i className="far fa-check-circle text-lime text-6xl"></i>
          <span className="flex flex-col gap-1">
            <h2 className="leading-none! text-xl! font-semibold text-mainDark">
              Hoàn tất!
            </h2>
            <p className="text-csMedium text-gray">
              Mail xác thực đã được gửi.{" "}
              <a
                className="text-csMedium font-medium text-mainRed! italic underline"
                href="https://mail.google.com/mail"
                target="_blank"
              >
                Hộp thư của tôi
              </a>
            </p>
          </span>

          <button
            onClick={handleNavigate}
            className="w-full h-fit bg-mainRed text-white text-csMedium font-medium py-3.5! rounded-main! mt-2"
          >
            Quay về trang đăng nhập
          </button>

          <div className="relative h-[2px] w-full bg-lightGray! my-3.5">
            <p className="absolute top-1/2 left-1/2 translate-[-50%] capitalize italic bg-white px-2.5 text-csNormal font-medium text-mainDark">hoặc</p>
          </div>

          <Resend email={email} />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.8)] flex items-center-safe justify-center-safe px-mainTwoSidePadding">
      <div className="w-full h-fit bg-white rounded-main p-5 flex flex-col gap-5">
        {/* Content */}
        <div className="flex flex-col items-center-safe justify-center-safe gap-2.5 text-center py-5">
          <BounceLoader size={40} color="#f25255" />
          <h2 className="leading-none! text-xl! font-semibold text-mainDark mt-2.5">
            Đang tạo tài khoản
          </h2>
          <p className="text-csMedium text-gray">
            Vui lòng chờ trong giây lát, hệ thống đang xử lý
          </p>
        </div>
      </div>
    </div>
  );
};

// Interface
interface CitizenRegisterForm_interface { }

// Type
type toastInputType = {
  userName: {
    state: boolean;
    toast: string;
  };
  email: {
    state: boolean;
    toast: string;
  };
  password: {
    length: boolean;
    specialSymbol: boolean;
    uppercaseSymbol: boolean;
    numSymbol: boolean;
  };
  confirmPassword: {
    state: boolean;
    toast: string;
  };
};

const CitizenRegisterForm: React.FC<CitizenRegisterForm_interface> = () => {
  // State
  const [isProcess, setIsProcess] = useState<boolean>(false);

  // Data
  const [username, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [toastInput, setToastInput] = useState<toastInputType>({
    userName: {
      state: false,
      toast: "Nhập tên của bạn",
    },
    email: {
      state: false,
      toast: "Nhập gmail của bạn",
    },
    password: {
      length: false,
      specialSymbol: false,
      uppercaseSymbol: false,
      numSymbol: false,
    },
    confirmPassword: {
      state: false,
      toast: "Nhập lại mật khẩu của bạn",
    },
  });

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userNameInput = e.target.value;
    let toastMessage = "";
    let state = false;

    setUserName(userNameInput);

    if (
      userNameInput &&
      userNameInput.length >= 8 &&
      userNameInput.length <= 20
    ) {
      toastMessage = "Tên hợp lệ";
      state = true;
    } else {
      toastMessage = "Độ dài từ 8 đến 20 ký tự";
      state = false;
    }

    if (toastMessage) {
      setToastInput((prev) => ({
        ...prev,
        userName: {
          state,
          toast: toastMessage,
        },
      }));
    }
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value;
    let toastMessage = "";
    let state = false;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmail(emailInput);

    if (!regex.test(emailInput)) {
      toastMessage = "Email không hợp lệ";
      state = false;
    } else {
      toastMessage = "Email hợp lệ";
      state = true;
    }

    if (toastMessage) {
      setToastInput((prev) => ({
        ...prev,
        email: {
          state,
          toast: toastMessage,
        },
      }));
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordInput = e.target.value.replaceAll(" ", "");
    let state: toastInputType["password"] = {
      length: false,
      specialSymbol: false,
      uppercaseSymbol: false,
      numSymbol: false,
    };
    setPassword(passwordInput);

    if (
      passwordInput &&
      passwordInput.length >= 8 &&
      passwordInput.length <= 20
    ) {
      state.length = true;
    }

    if (/[A-Z]/.test(passwordInput)) {
      state.uppercaseSymbol = true;
    }

    if (/[0-9]/.test(passwordInput)) {
      state.numSymbol = true;
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(passwordInput)) {
      state.specialSymbol = true;
    }

    setToastInput((prev) => ({
      ...prev,
      password: state,
    }));
  };

  const handleConfirmPasword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPasswordInput = e.target.value;
    let toastMessage = "";
    let state = false;
    setConfirmPassword(confirmPasswordInput);

    if (confirmPasswordInput === password) {
      toastMessage = "Nhập lại chính xác";
      state = true;
    } else {
      toastMessage = "Nhập lại không chính xác";
      state = false;
    }

    if (toastMessage) {
      setToastInput((prev) => ({
        ...prev,
        confirmPassword: {
          state,
          toast: toastMessage,
        },
      }));
    }
  };

  const handleRegister = () => {
    const isUsername = toastInput.userName.state;
    const isEmail = toastInput.email.state;
    const isPassword = !Object.values(toastInput.password).includes(false);
    const isConfirmPassword = toastInput.confirmPassword.state;

    if (!isUsername || !isEmail || !isPassword || !isConfirmPassword) {
      toastConfig({
        toastType: "error",
        toastMessage: "Thông tin không hợp lệ",
      });
      return;
    } else setIsProcess(!isProcess);
  };

  return (
    <div className="relative h-full w-full">
      <div className="relative h-full w-full bg-white flex flex-col gap-5 px-mainTwoSidePadding pt-2.5">
        <span className="w-full">
          <h1 className="leading-none! text-4xl! text-mainDark">Xin chào</h1>
          <p className="text-csMedium text-gray">
            Vui lòng điền đầy đủ thông tin bên dưới
          </p>
        </span>

        <span className="w-full flex flex-col gap-2.5">
          <span className="w-full">
            <p className="text-csMedium">
              Tên <b className="text-mainRed">*</b>
            </p>
            <input
              type="text"
              className="outline-none w-full text-csMedium! border-[0.5px] border-lightGray px-2.5 py-2.5 rounded-small"
              value={username}
              onChange={handleUsername}
              placeholder="VD: Nguyen Van A"
            />
            <p className="text-csNormal text-gray font-medium flex gap-1.5 items-center-safe mt-1">
              <i
                className={`${toastInput.userName.state
                  ? "fas fa-check text-lime"
                  : "fas fa-times text-mainRed"
                  }`}
              ></i>

              {toastInput.userName.toast}
            </p>
          </span>

          <span className="w-full">
            <p className="text-csMedium">
              Email <b className="text-mainRed">*</b>
            </p>
            <input
              type="text"
              className="outline-none w-full text-csMedium! border-[0.5px] border-lightGray px-2.5 py-2.5 rounded-small"
              value={email}
              onChange={handleEmail}
              placeholder="nguyenvana@gmail.com"
            />
            <p className="text-csNormal text-gray font-medium flex gap-1.5 items-center-safe mt-1">
              <i
                className={`${toastInput.email.state
                  ? "fas fa-check text-lime"
                  : "fas fa-times text-mainRed"
                  }`}
              ></i>

              {toastInput.email.toast}
            </p>
          </span>

          <span className="w-full flex flex-col gap-2.5">
            <span>
              <p className="text-csMedium">
                Mật khẩu <b className="text-mainRed">*</b>
              </p>
              <input
                type="password"
                className="outline-none w-full text-csMedium! border-[0.5px] border-lightGray px-2.5 py-2.5 rounded-small"
                value={password}
                onChange={handlePassword}
                placeholder="Nhập mật khẩu"
              />
            </span>

            <span className="pl-1.5 flex flex-col gap-0.5">
              <p className="text-csNormal text-gray font-medium flex gap-1.5 items-center-safe">
                <i
                  className={`${toastInput.password.length
                    ? "fas fa-check text-lime"
                    : "fas fa-times text-mainRed"
                    }`}
                ></i>
                Độ dài từ 8 đến 20 ký tự
              </p>

              <p className="text-csNormal text-gray font-medium flex gap-1.5 items-center-safe">
                <i
                  className={`${toastInput.password.specialSymbol
                    ? "fas fa-check text-lime"
                    : "fas fa-times text-mainRed"
                    }`}
                ></i>
                Chứa ít nhất 1 ký tự đặc biệt
              </p>

              <p className="text-csNormal text-gray font-medium flex gap-1.5 items-center-safe">
                <i
                  className={`${toastInput.password.uppercaseSymbol
                    ? "fas fa-check text-lime"
                    : "fas fa-times text-mainRed"
                    }`}
                ></i>
                Chứa ít nhất 1 chữ cái in hoa
              </p>

              <p className="text-csNormal text-gray font-medium flex gap-1.5 items-center-safe">
                <i
                  className={`${toastInput.password.numSymbol
                    ? "fas fa-check text-lime"
                    : "fas fa-times text-mainRed"
                    }`}
                ></i>
                Chứa ít nhất 1 chữ số
              </p>
            </span>
          </span>

          <span className="w-full">
            <p className="text-csMedium">
              Nhập lại mật khẩu <b className="text-mainRed">*</b>
            </p>
            <input
              type="password"
              className="outline-none w-full text-csMedium! border-[0.5px] border-lightGray px-2.5 py-2.5 rounded-small"
              value={confirmPassword}
              onChange={handleConfirmPasword}
              placeholder="Nhập lại mật khẩu"
            />
            <p className="text-csNormal text-gray font-medium flex gap-1.5 items-center-safe mt-1">
              <i
                className={`${toastInput.confirmPassword.state
                  ? "fas fa-check text-lime"
                  : "fas fa-times text-mainRed"
                  }`}
              ></i>

              {toastInput.confirmPassword.toast}
            </p>
          </span>
        </span>

        <span className="w-full">
          <button
            className="w-full h-fit bg-mainRed text-white py-3.5! rounded-main!"
            onClick={handleRegister}
          >
            Đăng ký
          </button>
        </span>

        <span className="flex items-center-safe justify-center-safe">
          <p className="text-csNormal">
            Đã có tài khoản?
            <Link
              to={routeConfig.login.root}
              className="text-mainRed! font-medium underline italic"
            >
              Đăng nhập
            </Link>
          </p>
        </span>
      </div>

      {isProcess && (
        <ProcessPopup
          isCreate={isProcess}
          email={email}
          username={username}
          password={password}
        />
      )}
    </div>
  );
};

export default CitizenRegisterForm;
