import {
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import React, { lazy, useEffect, useRef, useState } from "react";
import { routeConfig } from "../../config/routeConfig";
import { Route } from "react-router";

// Page
import MapPage from "../pages/Map";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import NewsPage from "../pages/News";
const TaskPage = lazy(() => import("../pages/Task"));
import ReportPage from "../pages/Report";
import GetData from "../components/GetData";
import MorePage from "../pages/More";
import ResetDefaultPasword from "../components/Staff/ResetDefaultPasword";
import Websocket from "../components/Websocket";
import LocationTracker from "../../hooks/LocationTracker";

// Staff menu
const StaffMenu = () => {
  const Menu = useRef<
    { label: string; path: string; tab: string; icon: React.ReactNode }[]
  >([
    {
      label: "B.Đồ",
      path: routeConfig.main.map,
      tab: "map",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
          />
        </svg>
      ),
    },
    {
      label: "N.Vụ",
      path: routeConfig.main.staff.myTask,
      tab: "task",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
          />
        </svg>
      ),
    },
    {
      label: "S.Cố",
      path: routeConfig.main.news,
      tab: "news",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      ),
    },
    {
      label: "Thêm",
      path: routeConfig.main.moreInfo,
      tab: "more-info",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      ),
    },
  ]);

  return (
    <IonTabBar className="mainShadow z-50 bg-white flex py-0.5" slot="bottom">
      {Menu.current.map((choice, index) => {
        return (
          <IonTabButton
            key={index}
            tab={choice.tab}
            className="bg-white flex h-full flex-1 flex-col items-center justify-center rounded-main py-2 hover:bg-[rgba(128,128,128,0.2)]"
            href={choice.path}
          >
            <span className="flex justify-center">{choice.icon}</span>
            <p className="w-fit! text-csNormal font-medium">{choice.label}</p>
          </IonTabButton>
        );
      })}
    </IonTabBar>
  );
};

const UserMenu = () => {
  const Menu = useRef<
    { label: string; path: string; tab: string; icon: React.ReactNode }[]
  >([
    {
      label: "B.Đồ",
      path: routeConfig.main.map,
      tab: "map",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
          />
        </svg>
      ),
    },
    {
      label: "B.Cáo",
      path: routeConfig.main.user.myReport,
      tab: "report",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
          />
        </svg>
      ),
    },
    {
      label: "S.Cố",
      path: routeConfig.main.news,
      tab: "news",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
      ),
    },
    {
      label: "Thêm",
      tab: "more-info",
      path: routeConfig.main.moreInfo,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      ),
    },
  ]);

  return (
    <IonTabBar className="mainShadow z-50 bg-white flex py-0.5" slot="bottom">
      {Menu.current.map((choice, index) => {
        return (
          <IonTabButton
            key={index}
            tab={choice.tab}
            className="bg-white flex h-full flex-1 flex-col items-center justify-center rounded-main py-2 hover:bg-[rgba(128,128,128,0.2)]"
            href={choice.path}
          >
            <span className="flex justify-center">{choice.icon}</span>
            <p className="w-fit! text-csNormal font-medium">{choice.label}</p>
          </IonTabButton>
        );
      })}
    </IonTabBar>
  );
};

const MainLayout: React.FC = () => {
  // Redux
  const staffProfile = useSelector((state: RootState) => state.staff.staff);
  const userAuth = useSelector((state: RootState) => state.user.isAuth);
  const staffAuth = useSelector((state: RootState) => state.staff.isAuth);
  const [isReset, setIsReset] = useState<boolean>(false);

  useEffect(() => {
    if (userAuth && staffAuth) {
      alert("User và Staff không thể cùng Auth");
    }

    if (staffAuth) {
      setIsReset(staffProfile.is_new_user);
    }
  }, [userAuth, staffAuth, staffProfile.is_new_user]);

  const ToggleResetPassword = () => {
    setIsReset(!isReset);
  };

  return (
    <IonTabs>
      <GetData />
      <Websocket />
      <LocationTracker />
      <IonRouterOutlet className="z-0">
        {/* Map */}
        <Route
          path={routeConfig.main.map}
          children={<MapPage isUser={userAuth} />}
          exact
        />
        <Route
          path={routeConfig.mainSlug.map.getReportLocation}
          children={<MapPage isUser={userAuth} />}
          exact
        />

        {/* Task */}
        {userAuth ? (
          <Route
            path={routeConfig.main.user.myReport}
            children={<ReportPage />}
            exact
          />
        ) : (
          <Route
            path={routeConfig.main.staff.myTask}
            children={<TaskPage />}
            exact
          />
        )}

        {/* News */}
        <Route path={routeConfig.main.news} children={<NewsPage />} exact />

        {/* More */}
        <Route path={routeConfig.main.moreInfo} children={<MorePage />} exact />
      </IonRouterOutlet>

      {userAuth ? <UserMenu /> : <StaffMenu />}

      {isReset && <ResetDefaultPasword closeForm={ToggleResetPassword} />}
    </IonTabs>
  );
};

export default MainLayout;
