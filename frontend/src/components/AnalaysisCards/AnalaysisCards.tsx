import React from "react";
import "./AnalaysisCards.css";

const AnalaysisCards = () => {
  return (
    <div className="container">

      <div className="glass github" data-text="Upload">
        <div className="card-text">
          <div className="text-bg"></div>
          <h2>Upload</h2>
          <p>Copy & paste your code here</p>
        </div>
    <span className="analaysis-card-icon material-icons-round">upload</span>
      </div>

      <div className="glass code" data-text="Summary">
        <div className="card-text">
          <div className="text-bg"></div>
          <h2>Summary</h2>
          <p>Get summary & explanation of the code</p>
        </div>

          <svg className="analaysis-card-icon" viewBox="0 0 640 512" height="70px" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"
      ></path>
    </svg>
      </div>

      <div className="glass earn" data-text="Suggestions">
        <div className="card-text">
          <div className="text-bg"></div>
          <h2>Suggestions</h2>
          <p>View smart suggestions & improvements</p>
        </div>
        <span className="analaysis-card-icon material-icons-round">settings_suggest</span>
      </div>

    </div>
  );
};

export default AnalaysisCards;
