import React from "react";
import { useSelector } from "react-redux";
import logo from './whats-up-logo.png';

const MatxLogo = ({className}) => {
  const settings = useSelector(state => state.layout.settings);  
  const theme = settings.themes[settings.activeTheme];
  
  return (
    <img src={logo}></img>
  );
};

export default MatxLogo;
