import React from "react";
import "./styles.css";
import { ReactComponent as Airplane } from "./assets/svg/airplane.svg";
import { ReactComponent as Cellular } from "./assets/svg/cellular.svg";
import { ReactComponent as Wifi } from "./assets/svg/wifi.svg";
import { ReactComponent as Bluetooth } from "./assets/svg/bluetooth.svg";
import { ReactComponent as Rewind } from "./assets/svg/rewind.svg";
import { ReactComponent as Play } from "./assets/svg/play.svg";
import { ReactComponent as FastForward } from "./assets/svg/fastforward.svg";
import { ReactComponent as Orientation } from "./assets/svg/orientation.svg";
import { ReactComponent as NightMode } from "./assets/svg/nightmode.svg";
import { ReactComponent as Brightness } from "./assets/svg/brightness.svg";
import { ReactComponent as Volume } from "./assets/svg/volume.svg";
import { ReactComponent as Screen } from "./assets/svg/screen.svg";
import { ReactComponent as Flashlight } from "./assets/svg/flashlight.svg";
import { ReactComponent as Timer } from "./assets/svg/timer.svg";
import { ReactComponent as Calculator } from "./assets/svg/calculator.svg";
import { ReactComponent as Camera } from "./assets/svg/camera.svg";

const IPhoneGrid = () =>
  <div className="grid-container">
    <div className="grid-item big-grid-item"></div>
    <div className="grid-item big-grid-item"></div>
    <div className="grid-item"></div>
    <div className="grid-item"></div>
    <div className="grid-item tall-grid-item"></div>
    <div className="grid-item tall-grid-item"></div>
    <div className="grid-item large-grid-item"></div>
    <div className="grid-item"></div>
    <div className="grid-item"></div>
    <div className="grid-item"></div>
    <div className="grid-item"></div>
  </div>

export default IPhoneGrid