import React from "react";
import { NavigationDots, SocialMedia } from "../components";

const AppWrap = (Component, idName, classNames) =>
  function HOC() {
    return (
      <div id={idName} className={`app-container ${classNames}`}>
        <SocialMedia />
        <div className="app-wrapper app-flex">
          <Component />
          <div className="copyright">
            <p className="p-text"> &copy; 2023 MICAEL</p>
            <p className="p-text">All Rights Reserved</p>
          </div>
        </div>
        <NavigationDots active={idName} />
      </div>
    );
  };

export default AppWrap;
