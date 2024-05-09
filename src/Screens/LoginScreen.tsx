import { useRef, useState } from "react";
import BrandingIcon from "../Components/Icons/BrandingIcon";

import "./LoginScreen.css";

interface LoginScreenProps {
    performLogin: (username: string, password: string) => Promise<[boolean, string]>;
}  

const LoginScreen: React.FC<LoginScreenProps> = ({ performLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState("");

    const inputUsername = useRef<HTMLInputElement>(null);
    const inputPassword = useRef<HTMLInputElement>(null);

    const inputLogin = useRef<HTMLInputElement>(null);

    const loginError = useRef<HTMLParagraphElement>(null);

    function addErrors() {
        inputUsername.current?.classList.add('onError');
        inputPassword.current?.classList.add('onError');
        inputLogin.current?.classList.add('onError');
        loginError.current?.classList.add('onError');
    }

    function clearErrors() {
        inputUsername.current?.classList.remove('onError');
        inputPassword.current?.classList.remove('onError');
        inputLogin.current?.classList.remove('onError');
        loginError.current?.classList.remove('onError');
            
        setErrorMsg("");
    }

    async function buttonPressed() {
        if (inputLogin.current?.classList.contains('onError')) {
            return;
        }
        
        if (username === '' || password === '') {
            setErrorMsg("Please fill in all of the fields.");
            addErrors();
            return;
        }

        let res = await performLogin(username, password); 

        if (!res[0]) {
            setErrorMsg(res[1]);
            addErrors();
        }
    }

    // TODO: Perhaps smooth out the error Message showing up and disappearing again

    return (
        <div className="container">
            <BrandingIcon />
            <h2>Log In</h2>
            <p>Login with the Cyberghost username and password you recieved via email with your order confirmation.</p>
            <div ref={inputLogin} className="loginInput">
                <input ref={inputUsername} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} onSelect={clearErrors} />
                <input ref={inputPassword} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onSelect={clearErrors} />
            </div>
            <p ref={loginError} style={{color: "red", marginBottom: "-10px"}}>{errorMsg}</p>
            <button className="loginBtn" onClick={buttonPressed}>Log in</button>
        </div>
    );
}

export default LoginScreen;