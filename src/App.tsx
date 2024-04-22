import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri'

import LoginScreen from "./Screens/LoginScreen";
import VPNScreen from "./Screens/VpnScreen";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    invoke('val_login').then((response) => {
      console.log(response);
      setIsLoggedIn(true);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const performLogin = (username: string, password: string) => {
    invoke('perf_login', { username: username, password: password }).then((response) => {
        console.log(response);
        setIsLoggedIn(true);
        return true;
    }).catch((error) => {
        console.error(error);
        return false;
    });
  };

  return (
    <>
      {isLoggedIn ? <VPNScreen /> : <LoginScreen performLogin={performLogin} />}
    </>
  );
}

export default App;
