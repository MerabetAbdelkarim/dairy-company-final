import { useEffect, useRef, useState } from "react";

// Handler hook for when Outside click dropdown close
let useClickOutside = (handler) => {
    let domNode = useRef();

    useEffect(() => {
        let maybeHandler = (event) => {
            if (!domNode.current.contains(event.target)) {
                handler();
            }
        };

        document.addEventListener("mousedown", maybeHandler);

        return () => {
            document.removeEventListener("mousedown", maybeHandler);
        };
    });

    return domNode;
};
// Handler hook for when Outside click dropdown close End Code====>>

const Dropdown = ({ children,className,item }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    let domNode = useClickOutside(() => {
        setDropdownOpen(false);
    });

    return (
        <>
            <div className="flex flex-wrap">
                <div ref={domNode} className="">
                    <div className=" text-center">
                        <div className="relative inline-block  text-left">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className={className}
                            >
                                <div>
                                    {item}
                                </div>

                                <span className="pl-1">
                                    <svg
                                        width={15}
                                        height={15}
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="fill-current"
                                    >
                                        <path d="M10 14.25C9.8125 14.25 9.65625 14.1875 9.5 14.0625L2.3125 7C2.03125 6.71875 2.03125 6.28125 2.3125 6C2.59375 5.71875 3.03125 5.71875 3.3125 6L10 12.5312L16.6875 5.9375C16.9688 5.65625 17.4063 5.65625 17.6875 5.9375C17.9687 6.21875 17.9687 6.65625 17.6875 6.9375L10.5 14C10.3437 14.1563 10.1875 14.25 10 14.25Z" />
                                    </svg>
                                </span>
                            </button>
                            <div
                                className={`shadow-1 dark:shadow-box-dark absolute right-0  z-40 mt-2 w-fit rounded-md  py-[2px] transition-all ${dropdownOpen
                                    ? "top-full opacity-100 visible"
                                    : "top-[110%] invisible opacity-0"
                                    }`}
                            >
                                <div className="bg-blue-700   rounded-md">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dropdown;


