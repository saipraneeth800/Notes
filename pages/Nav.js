import React,{useState,useEffect} from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

// import { Link, animateScroll as scroll } from "react-scroll";

export default function Nav() {
  const { theme, setTheme } = useTheme();
  const [cl, setCl] = useState(false);

  useEffect(() => setCl(true), []);

  if (!cl) return null;

  return (
    <>
      <nav className=" flex flex-wrap w-full items-center m-auto lg:p-5 bg-yellow-500 dark:bg-gray-800 mb-3 bg-gray-0 ">
        <div className="px-4 mx-auto">
          <div className="w-full gap-10 flex justify-between lg:w-auto">
            <a
              className="text-xl  font-bold leading-relaxed mr-4 py-2"
              href="#"
            >Notes.
              {/* <img src="/logo.png"  /> */}
            </a>
            
            <label className="flex items-center gap-3 relative cursor-pointer">
            <h1 className="text-xl ">

            {theme === "light" ? (
              <FontAwesomeIcon icon={faSun} />
            ) : (
              <FontAwesomeIcon icon={faMoon} />
            )}
          </h1>
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              />

              <div className="w-12 h-6 bg-gray-200   rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:absolute after:top-[14px]  after:left-[33px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-700"></div>
            </label> 
            
          </div>
          
        </div>
        
      </nav>
    </>
  );
}