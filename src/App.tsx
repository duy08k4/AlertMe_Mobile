import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import "./style/main.css"

setupIonicReact();

// Config
import { routeConfig } from './config/routeConfig';

// Page
import IntroductionPage from './ui/pages/Introduction';
import LoginPage from './ui/pages/Login';
import RegisterPage from './ui/pages/Register';
import UnAuth from './ui/pages/UnAuth';


// Layout
import MainLayout from './ui/layouts/MainLayout';

// Component
import { ScreenSizeWarningPopup } from './hooks/DeviceCheck';
import Auth from './ui/components/Auth';
const App: React.FC = () => (
  <IonApp>
    <ScreenSizeWarningPopup />
    <IonReactRouter>
      <Auth />
      <IonRouterOutlet animated={false}>
        {/* Introduction */}
        <Route exact path="/" children={<IntroductionPage />}></Route>

        {/* Auth */}
        <Route exact path={routeConfig.login.root} children={<LoginPage />}></Route>
        <Route exact path={routeConfig.register.root} children={<RegisterPage />}></Route>
        <Route exact path={routeConfig.unAuth.root} children={<UnAuth />}></Route>

        {/* Main layout */}
        <Route path={routeConfig.main.root + "/*"} children={<MainLayout />}></Route>
        <Redirect exact path='/main' to={routeConfig.main.map} />

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
