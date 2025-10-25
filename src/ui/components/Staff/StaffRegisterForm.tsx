import React, { useState, useEffect } from "react"
import { useIonRouter } from "@ionic/react";

// Spinner
import { BounceLoader } from 'react-spinners'

// Config
import { routeConfig } from "../../../config/routeConfig";

const processSteps = [
    {
        id: 1,
        name: "Nộp hồ sơ"
    },
    {
        id: 2,
        name: "Tạo tài khoản"
    },
    {
        id: 3,
        name: "Gửi mail xác thực"
    }
];

const stepContents: { [key: number]: { title: string, description: string } } = {
    1: {
        title: "Đang nộp hồ sơ",
        description: "Vui lòng chờ, hồ sơ của bạn đang được xử lý."
    },
    2: {
        title: "Đang tạo tài khoản",
        description: "Hồ sơ đã được duyệt, hệ thống đang tạo tài khoản."
    },
    3: {
        title: "Đang gửi mail xác thực",
        description: "Tài khoản của bạn đã được tạo, chúng tôi đang gửi mail xác thực."
    }
};

const ProcessPopup: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isComplete, setIsComplete] = useState(false);
    const router = useIonRouter();

    useEffect(() => {
        if (currentStep === 1) {
            const timer = setTimeout(() => {
                setCurrentStep(2);
            }, 3000); // Simulate API call for 3 seconds
            return () => clearTimeout(timer);
        } else if (currentStep === 2 && !isComplete) {
            const timer = setTimeout(() => {
                setIsComplete(true);
            }, 3000); // Simulate sending email
            return () => clearTimeout(timer);
        }
    }, [currentStep, isComplete]);

    const handleNavigate = () => {
        router.push(routeConfig.login.root, "root");
    };

    if (isComplete) {
        return (
            <div className="absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.8)] flex items-center-safe justify-center-safe px-mainTwoSidePadding">
                <div className="w-full h-fit bg-white rounded-main p-5 flex flex-col gap-4 items-center-safe text-center">
                    <i className="far fa-check-circle text-lime text-6xl"></i>
                    <span className="flex flex-col gap-1">
                        <h2 className="text-xl! font-semibold text-mainDark">Hoàn tất!</h2>
                        <p className="text-csMedium text-gray">Mail xác thực đã được gửi. Vui lòng kiểm tra hộp thư của bạn.</p>
                    </span>
                    <button onClick={handleNavigate} className="w-full h-fit bg-mainRed text-white py-3.5! rounded-main! mt-2">
                        Quay về trang đăng nhập
                    </button>
                </div>
            </div>
        )
    }

    const content = stepContents[currentStep];

    return (
        <div className="absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.8)] flex items-center-safe justify-center-safe px-mainTwoSidePadding">
            <div className="w-full h-fit bg-white rounded-main p-5 flex flex-col gap-5">
                {/* Stepper */}
                <div className="flex items-center-safe w-full">
                    {processSteps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <div className="flex flex-col items-center-safe gap-1.5 w-[120px]">
                                <div className={`h-10 w-10 rounded-full flex items-center-safe justify-center-safe border-2 font-semibold ${currentStep >= step.id ? 'border-mainRed bg-mainRed text-white' : 'border-lightGray bg-white text-gray'}`}>
                                    {currentStep > step.id ? <i className="fas fa-check text-white"></i> : step.id}
                                </div>
                                <p className={`text-csNormal text-center font-medium ${currentStep >= step.id ? 'text-mainDark' : 'text-gray'}`}>{step.name}</p>
                            </div>
                            {index < processSteps.length - 1 && (
                                <div className={`flex-1 h-1 mb-auto ${currentStep > index + 1 ? 'bg-mainRed' : 'bg-lightGray'}`}></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-lightGray"></div>

                {/* Content */}
                <div className="flex flex-col items-center-safe justify-center-safe gap-2.5 text-center py-5">
                    <BounceLoader size={40} color="#f25255" />
                    <h2 className="text-xl! font-semibold text-mainDark mt-2.5">{content.title}</h2>
                    <p className="text-csMedium text-gray">{content.description}</p>
                </div>
            </div>
        </div>
    )
}

// Interface
interface StaffRegisterForm_interface {
    toggleRole: () => void
}

// Type
type toastInputType = {
    fullName: {
        state: boolean,
        toast: string
    },
    citizenId: {
        state: boolean,
        toast: string
    },
    phone: {
        state: boolean,
        toast: string
    },
    address: {
        state: boolean,
        toast: string
    },
    workUnit: {
        state: boolean,
        toast: string
    },
    email: {
        state: boolean,
        toast: string
    },
    password: {
        length: boolean,
        specialSymbol: boolean,
        uppercaseSymbol: boolean,
        numSymbol: boolean
    },
    confirmPassword: {
        state: boolean,
        toast: string
    }
}

const StaffRegisterForm: React.FC<StaffRegisterForm_interface> = ({ toggleRole }) => {
    // State
    const [formStep, setFormStep] = useState<number>(1)
    const [isProcess, setIsProcess] = useState<boolean>(false)

    // Data
    const [fullName, setFullName] = useState<string>("")
    const [citizenId, setCitizenId] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [workUnit, setWorkUnit] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const [toastInput, setToastInput] = useState<toastInputType>({
        fullName: { state: false, toast: "Nhập họ và tên" },
        citizenId: { state: false, toast: "Nhập CCCD" },
        phone: { state: false, toast: "Nhập số điện thoại" },
        address: { state: false, toast: "Nhập địa chỉ" },
        workUnit: { state: false, toast: "Nhập đơn vị công tác" },
        email: { state: false, toast: "Nhập email" },
        password: {
            length: false,
            specialSymbol: false,
            uppercaseSymbol: false,
            numSymbol: false
        },
        confirmPassword: { state: false, toast: "Nhập lại mật khẩu" }
    })

    const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setFullName(input);
        let toastMessage = "";
        let state = false;

        if (input.length > 5) {
            toastMessage = "Họ và tên hợp lệ";
            state = true;
        } else {
            toastMessage = "Họ và tên phải có ít nhất 5 ký tự";
            state = false;
        }

        setToastInput(prev => ({
            ...prev,
            fullName: { state, toast: toastMessage }
        }));
    };

    const handleCitizenIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setCitizenId(input);
        let toastMessage = "";
        let state = false;
        const regex = /^[0-9]{12}$/;

        if (regex.test(input)) {
            toastMessage = "CCCD hợp lệ";
            state = true;
        } else {
            toastMessage = "CCCD phải có đúng 12 chữ số";
            state = false;
        }

        setToastInput(prev => ({
            ...prev,
            citizenId: { state, toast: toastMessage }
        }));
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setPhone(input);
        let toastMessage = "";
        let state = false;
        const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

        if (regex.test(input)) {
            toastMessage = "Số điện thoại hợp lệ";
            state = true;
        } else {
            toastMessage = "Số điện thoại không hợp lệ";
            state = false;
        }

        setToastInput(prev => ({
            ...prev,
            phone: { state, toast: toastMessage }
        }));
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setAddress(input);
        let toastMessage = "";
        let state = false;

        if (input.length > 5) {
            toastMessage = "Địa chỉ hợp lệ";
            state = true;
        } else {
            toastMessage = "Địa chỉ phải có ít nhất 5 ký tự";
            state = false;
        }

        setToastInput(prev => ({
            ...prev,
            address: { state, toast: toastMessage }
        }));
    };

    const handleWorkUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setWorkUnit(input);
        let toastMessage = "";
        let state = false;

        if (input.length > 3) {
            toastMessage = "Đơn vị công tác hợp lệ";
            state = true;
        } else {
            toastMessage = "Đơn vị công tác phải có ít nhất 3 ký tự";
            state = false;
        }

        setToastInput(prev => ({
            ...prev,
            workUnit: { state, toast: toastMessage }
        }));
    };

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailInput = e.target.value
        let toastMessage = ""
        let state = false
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setEmail(emailInput)

        if (!regex.test(emailInput)) {
            toastMessage = "Email không hợp lệ"
            state = false
        } else {
            toastMessage = "Email hợp lệ"
            state = true
        }

        if (toastMessage) {
            setToastInput(prev => (
                {
                    ...prev,
                    email: {
                        state,
                        toast: toastMessage
                    }
                }
            ))
        }
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordInput = e.target.value.replaceAll(" ", "")
        let state: toastInputType["password"] = {
            length: false,
            specialSymbol: false,
            uppercaseSymbol: false,
            numSymbol: false
        }
        setPassword(passwordInput)

        if (passwordInput && passwordInput.length >= 8 && passwordInput.length <= 20) {
            state.length = true
        }

        if (/[A-Z]/.test(passwordInput)) {
            state.uppercaseSymbol = true
        }

        if (/[0-9]/.test(passwordInput)) {
            state.numSymbol = true
        }

        if (/[!@#$%^&*(),.?":{}|<>]/.test(passwordInput)) {
            state.specialSymbol = true
        }

        setToastInput(prev => (
            {
                ...prev,
                password: state
            }
        ))
    }

    const handleConfirmPasword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPasswordInput = e.target.value
        let toastMessage = ""
        let state = false
        setConfirmPassword(confirmPasswordInput)

        if (confirmPasswordInput === password) {
            toastMessage = "Nhập lại chính xác"
            state = true
        } else {
            toastMessage = "Nhập lại không chính xác"
            state = false
        }

        if (toastMessage) {
            setToastInput(prev => (
                {
                    ...prev,
                    confirmPassword: {
                        state,
                        toast: toastMessage
                    }
                }
            ))
        }
    }

    const handleRegister = () => {
        setIsProcess(!isProcess)
    }

    return (
        <div className="relative h-full w-full">
            <div className="relative h-full w-full bg-white flex flex-col gap-5 px-mainTwoSidePadding pt-2.5">
                <span className="absolute top-2.5 right-2.5">
                    <button
                        onClick={toggleRole}
                        className="mainShadow text-csNormal flex items-center-safe gap-1.5 px-2.5! py-2.5! rounded-main!"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                        </svg>
                        Đổi vai trò
                    </button>
                </span>

                <div className="flex flex-col gap-4 over">
                    {formStep === 1 && (
                        <>
                            {/* Profile Section */}
                            <div className="flex flex-col gap-2.5">
                                <h2 className="text-lg font-semibold text-mainDark border-b-2 border-mainRed pb-1">Hồ sơ nhân viên</h2>
                                <span className="w-full">
                                    <p className="text-csMedium">Họ và tên <b className="text-mainRed">*</b></p>
                                    <input type="text" className="outline-none w-full text-csMedium! border-[0.5px] border-lightGray px-2.5 py-2.5 rounded-small" value={fullName} onChange={handleFullNameChange} placeholder="VD: Nguyen Van A" />
                                    <p className="text-csNormal text-gray font-medium flex gap-1.5 items-center-safe mt-1">
                                        <i className={`${toastInput.fullName.state ? "fas fa-check text-lime" : "fas fa-times text-mainRed"}`}></i>
                                        {toastInput.fullName.toast}
                                    </p>
                                </span>
                                <span className="w-full">
                                    <p className="text-csMedium">CCCD <b className="text-mainRed">*</b></p>
                                    <input type="text" className="outline-none w-full text-csMedium! border-[0.5px] border-lightGray px-2.5 py-2.5 rounded-small" value={citizenId} onChange={handleCitizenIdChange} placeholder="Nhập số CCCD" />
                                    <p className="text-csNormal text-gray font-medium flex gap-1.5 items-center-safe mt-1">
                                        <i className={`${toastInput.citizenId.state ? "fas fa-check text-lime" : "fas fa-times text-mainRed"}`}></i>
                                        {toastInput.citizenId.toast}
                                    </p>
                                </span>
                                <span className="w-full">
                                    <p className="text-csMedium">Số điện thoại <b className="text-mainRed">*</b></p>
                                    <input type="text" className="outline-none w-full text-csMedium! border-[0.5px] border-lightGray px-2.5 py-2.5 rounded-small" value={phone} onChange={handlePhoneChange} placeholder="Nhập số điện thoại" />
                                    <p className="text-csNormal text-gray font-medium flex gap-1.5 items-center-safe mt-1">
                                        <i className={`${toastInput.phone.state ? "fas fa-check text-lime" : "fas fa-times text-mainRed"}`}></i>
                                        {toastInput.phone.toast}
                                    </p>
                                </span>
                                <span className="w-full">
                                    <p className="text-csMedium">Địa chỉ <b className="text-mainRed">*</b></p>
                                    <input type="text" className="outline-none w-full text-csMedium! border-[0.5px] border-lightGray px-2.5 py-2.5 rounded-small" value={address} onChange={handleAddressChange} placeholder="Nhập địa chỉ" />
                                    <p className="text-csNormal text-gray font-medium flex gap-1.5 items-center-safe mt-1">
                                        <i className={`${toastInput.address.state ? "fas fa-check text-lime" : "fas fa-times text-mainRed"}`}></i>
                                        {toastInput.address.toast}
                                    </p>
                                </span>
                                <span className="w-full">
                                    <p className="text-csMedium">Đơn vị công tác <b className="text-mainRed">*</b></p>
                                    <input type="text" className="outline-none w-full text-csMedium! border-[0.5px] border-lightGray px-2.5 py-2.5 rounded-small" value={workUnit} onChange={handleWorkUnitChange} placeholder="Nhập đơn vị công tác" />
                                    <p className="text-csNormal text-gray font-medium flex gap-1.5 items-center-safe mt-1">
                                        <i className={`${toastInput.workUnit.state ? "fas fa-check text-lime" : "fas fa-times text-mainRed"}`}></i>
                                        {toastInput.workUnit.toast}
                                    </p>
                                </span>
                            </div>
                            <span className="w-full">
                                <button className="w-full h-fit bg-mainRed text-white py-3.5! rounded-main!" onClick={() => setFormStep(2)}>
                                    Tiếp tục
                                </button>
                            </span>
                        </>
                    )}

                    {formStep === 2 && (
                        <>
                            {/* Account Section */}
                            <div className="flex flex-col gap-5">
                                <span className="w-full h-fit">
                                    <h2 className="text-lg font-semibold text-mainDark border-b-2 border-mainRed pb-1">Tài khoản</h2>
                                </span>
                                <span className="w-full">
                                    <p className="text-csMedium">Email <b className="text-mainRed">*</b></p>
                                    <input type="text" className="outline-none w-full text-csMedium! border-[0.5px] border-lightGray px-2.5 py-2.5 rounded-small" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nguyenvana@gmail.com" />
                                </span>
                                <span className="w-full flex flex-col gap-2.5">
                                    <span>
                                        <p className="text-csMedium">Mật khẩu <b className="text-mainRed">*</b></p>
                                        <input type="password" className="outline-none w-full text-csMedium! border-[0.5px] border-lightGray px-2.5 py-2.5 rounded-small" value={password} onChange={handlePassword} placeholder="Nhập mật khẩu" />
                                    </span>
                                    <span className="pl-1.5 flex flex-col gap-0.5">
                                        <p className="text-csNormal text-gray font-medium flex gap-1.5 items-center-safe">
                                            <i className={`${toastInput.password.length ? "fas fa-check text-lime" : "fas fa-times text-mainRed"}`}></i>
                                            Độ dài từ 8 đến 20 ký tự
                                        </p>
                                        <p className="text-csNormal text-gray font-medium flex gap-1.5 items-center-safe">
                                            <i className={`${toastInput.password.specialSymbol ? "fas fa-check text-lime" : "fas fa-times text-mainRed"}`}></i>
                                            Chứa ít nhất 1 ký tự đặc biệt
                                        </p>
                                        <p className="text-csNormal text-gray font-medium flex gap-1.5 items-center-safe">
                                            <i className={`${toastInput.password.uppercaseSymbol ? "fas fa-check text-lime" : "fas fa-times text-mainRed"}`}></i>
                                            Chứa ít nhất 1 chữ cái in hoa
                                        </p>
                                        <p className="text-csNormal text-gray font-medium flex gap-1.5 items-center-safe">
                                            <i className={`${toastInput.password.numSymbol ? "fas fa-check text-lime" : "fas fa-times text-mainRed"}`}></i>
                                            Chứa ít nhất 1 chữ số
                                        </p>
                                    </span>
                                </span>
                                <span className="w-full">
                                    <p className="text-csMedium">Nhập lại mật khẩu <b className="text-mainRed">*</b></p>
                                    <input type="password" className="outline-none w-full text-csMedium! border-[0.5px] border-lightGray px-2.5 py-2.5 rounded-small" value={confirmPassword} onChange={handleConfirmPasword} placeholder="Nhập lại mật khẩu" />
                                    <p className="text-csNormal text-gray font-medium flex gap-1.5 items-center-safe mt-1">
                                        <i className={`${toastInput.confirmPassword.state ? "fas fa-check text-lime" : "fas fa-times text-mainRed"}`}></i>
                                        {toastInput.confirmPassword.toast}
                                    </p>
                                </span>
                            </div>

                            <span className="w-full flex gap-2.5 mt-5">
                                <button className="w-full h-fit bg-gray text-white py-3.5! rounded-main!" onClick={() => setFormStep(1)}>
                                    Quay lại
                                </button>
                                <button className="w-full h-fit bg-mainRed text-white py-3.5! rounded-main!" onClick={handleRegister}>
                                    Đăng ký
                                </button>
                            </span>
                        </>
                    )}
                </div>

                {formStep === 1 && (
                    <span className="flex items-center-safe justify-center-safe">
                        <p className="text-csNormal">Đã có tài khoản? <i className="text-mainRed font-medium underline">Đăng nhập</i></p>
                    </span>
                )}
            </div>

            {isProcess && (<ProcessPopup />)}
        </div>
    )
}

export default StaffRegisterForm