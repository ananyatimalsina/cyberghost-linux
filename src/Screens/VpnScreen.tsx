import { useState } from 'react';

import DroprightMenu, { Option } from '../Components/DroprightMenu';

import PowerButtonIcon from '../Components/Icons/PowerButtonIcon';
import Wireguard from '../Components/Icons/Wireguard';
import Openvpn from '../Components/Icons/Openvpn';

import "./VpnScreen.css";

import flags from "../FlagDisplay";

function VPNScreen () {
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const options: Option[] = [
        {
            label: 'OpenVPN',
            value: "openvpn",
            icon: <Openvpn />,
        },
        {
          label: 'Wireguard',
          value: "wireguard",
          icon: <Wireguard />,
        },
    ];

    const [protocol, setProtocol] = useState<Option>(options.filter(option => option.value === localStorage.getItem("protocol"))[0] || options[0]);

    function connectVPN ()  {
        // Logic to connect to VPN
        setIsConnected(true);
    }

    function disconnectVPN ()  {
        // Logic to disconnect from VPN
        setIsConnected(false);
    }

    // TODO: Don't forget to implement the VPN protocolls

    return (
        <div className='container'>
            <div className='Select'>
                <DroprightMenu options={options} selectedOption={protocol} setSelectedOption={setProtocol} />
            </div>
            <h1>CyberGhost VPN</h1>
            <p style={{color: "#fc0"}}>{isConnected ? 'Connected' : 'Disconnected'}</p>
            <button className='PowerButton' onClick={() => isConnected ? disconnectVPN() : connectVPN()}>
                <PowerButtonIcon />
            </button>
            <p>Connect to:</p>
            <button className='ServerSelectBtn'>
                <img src={flags["DE"]} />
                <span>Germany</span>
            </button>
        </div>
    );
}

export default VPNScreen;