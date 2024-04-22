import { useRef, useState } from "react";
import "./PowerButtonIcon.css";

function PowerButtonIcon() {
    const PBIconCircleAnimate11 = useRef<SVGAnimateElement | null>(null);
    const PBIconCircleAnimate21 = useRef<SVGAnimateElement | null>(null);
    const PBIconCircleAnimate12 = useRef<SVGAnimateElement | null>(null);
    const PBIconCircleAnimate22 = useRef<SVGAnimateElement | null>(null);
    const PBIconCircle = useRef<SVGCircleElement | null>(null);

    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout | null>(null);
    const [timeoutID2, setTimeoutID2] = useState<NodeJS.Timeout | null>(null);

    // TODO: Implement a still state for the power button

    const loopAnimation = () => {
        if (PBIconCircle.current) {
            PBIconCircle.current.classList.add('fullPBAnimation');
        };
        if (PBIconCircleAnimate11.current) {
            PBIconCircleAnimate11.current.beginElement();
        }
        if (PBIconCircleAnimate21.current) {
            PBIconCircleAnimate21.current.beginElement();
        }
        setTimeoutID(setTimeout(function() {
            if (PBIconCircleAnimate12.current) {
                PBIconCircleAnimate12.current.beginElement();
            }
            if (PBIconCircleAnimate22.current) {
                PBIconCircleAnimate22.current.beginElement();
            }
        }, 1000));

        setTimeoutID2(setTimeout(loopAnimation, 4000));
    }

    const startAnimation = () => {
        if (isAnimating) {
            return;
        }

        setIsAnimating(true);
        loopAnimation();
    }

    const stopAnimation = () => {
        if (!isAnimating) {
            return;
        }

        if (PBIconCircle.current) {
            PBIconCircle.current.classList.remove('fullPBAnimation');
        }
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
        if (timeoutID2) {
            clearTimeout(timeoutID2);
        }
        setIsAnimating(false);
    }

    return (
        <svg className="PBIcon" onClick={isAnimating ? stopAnimation : startAnimation} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <circle ref={PBIconCircle} className="PBIconCircle" cx={60} cy={60} r={50} />
            <path className="PBIconCircleAnimation" d="M60 10 a50 50 0 0 1 0 100" strokeDasharray="157.08" strokeDashoffset="157.08">
                <animate ref={PBIconCircleAnimate11} attributeName="stroke-dashoffset" values="157.08;0;0" dur="2s" begin="indefinite" />
                <animate ref={PBIconCircleAnimate12} attributeName="stroke-dashoffset" values="0;0;157.08" dur="2s" begin="indefinite" />
            </path>
            <path className="PBIconCircleAnimation" d="M60 10 a50 50 0 0 0 0 100" strokeDasharray="157.08" strokeDashoffset="-157.08">
                <animate ref={PBIconCircleAnimate21} attributeName="stroke-dashoffset" values="-157.08;0;0" dur="2s" begin="indefinite" />
                <animate ref={PBIconCircleAnimate22} attributeName="stroke-dashoffset" values="0;0;-157.08" dur="2s" begin="indefinite" />
            </path>
            <g transform='translate(42.5, 42.5)'>
                <defs>
                    <clipPath id="a">
                        <path d="M0 0h36v36H0z"/>
                    </clipPath>
                </defs>
                <g clipPath="url(#a)">
                    <path className="PBIconPower" d="m11.331 6.027 1.399 2.111c-3.851 1.876-6.497 5.743-6.497 10.205 0 6.298 5.272 11.412 11.767 11.412 6.495 0 11.767-5.114 11.767-11.412 0-4.383-2.553-8.193-6.295-10.104l1.397-2.106c4.407 2.379 7.381 6.971 7.381 12.21C32.25 26 25.896 32.277 18 32.277S3.75 26 3.75 18.343c0-5.318 3.064-9.969 7.581-12.316Zm8.158-2.304h-2.978v10.203h2.978V3.723Z" />
                </g>
            </g>
        </svg>
    )
}

export default PowerButtonIcon;