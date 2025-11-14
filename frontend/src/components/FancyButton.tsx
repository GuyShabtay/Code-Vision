import React from "react";
import "./FancyButton.css";

const FancyButton = () => {
  return (
    <div className="button-container">
      {/* Invisible click layer */}
      <button className="real-button"></button>

      {/* This MUST be a sibling after .real-button */}
      <div className="visuals">
        <div className="spin spin-blur"></div>
        <div className="spin spin-intense"></div>
        <div className="backdrop"></div>

        <div className="button-border">
          <div className="spin spin-inside"></div>
          <div className="button">Button</div>
        </div>
      </div>

      {/* SVG filters */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="unopaq" width="300%" height="300%" x="-100%" y="-100%">
          <feColorMatrix values="
            1 0 0 0 0 
            0 1 0 0 0 
            0 0 1 0 0 
            0 0 0 9 0
          "/>
        </filter>

        <filter id="unopaq2" width="300%" height="300%" x="-100%" y="-100%">
          <feColorMatrix values="
            1 0 0 0 0 
            0 1 0 0 0 
            0 0 1 0 0 
            0 0 0 3 0
          "/>
        </filter>

        <filter id="unopaq3" width="300%" height="300%" x="-100%" y="-100%">
          <feColorMatrix values="
            1 0 0 0.2 0 
            0 1 0 0.2 0 
            0 0 1 0.2 0 
            0 0 0 2 0
          "/>
        </filter>
      </svg>
    </div>
  );
};

export default FancyButton;
