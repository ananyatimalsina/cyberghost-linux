import { useEffect, useState } from "react";

import "./DroprightMenu.css";

interface Option {
    label: string;
    value: string;
    icon: JSX.Element;
}

interface DroprightMenuProps {
    options: Option[];
    selectedOption: Option;
    setSelectedOption: (option: Option) => void;
}

function DroprightMenu({ options, selectedOption, setSelectedOption }: DroprightMenuProps) {
    const [avilableOption, setAvilableOption] = useState<Option>(selectedOption);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        console.log("selected: " + selectedOption.label);
        let optionss = options.filter(option => option != selectedOption);
        console.log(optionss);
        setAvilableOption(options.filter(option => option != selectedOption)[0]);
        console.log("avilable: " + avilableOption.label);
    }, [selectedOption]);

    // TODO: Monitor once more the logic of the DroprightMenu component

    return (
        <div className="dropRight">
            <button className="menu-item" onClick={() => setIsOpen(!isOpen)}>
                {selectedOption.icon}
                <span className="menu-label">{selectedOption.label}</span>
            </button>
            {isOpen && (
                <button
                    className="menu-item-temp"
                    onClick={() => {
                        localStorage.setItem("protocol", avilableOption.value);
                        setSelectedOption(avilableOption);
                        setIsOpen(false);
                    }}
                >
                    {avilableOption.icon}
                    <span className="menu-label">{avilableOption.label}</span>
                </button>
                )
            }
        </div>
    );
}

export default DroprightMenu;
export type { Option };