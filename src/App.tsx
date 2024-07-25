import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri'

import LoginScreen from "./Screens/LoginScreen";
import ServerScreen from "./Screens/ServerScreen";

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

  const performLogin = async (username: string, password: string): Promise<[boolean, string]> => {
    try {
      const response = await invoke('perf_login', { username, password });
      console.log(response);
      setIsLoggedIn(true);
      return [true, "success"];
    } catch (error) {
      console.error(error);
      return [false, String(error)];
    }
  };

  return (
    <>
      {isLoggedIn ? <ServerScreen /> : <LoginScreen performLogin={performLogin} />}
    </>
  );
}

export default App;
