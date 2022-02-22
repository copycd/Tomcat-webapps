// This file loads the unbuilt ES6 version of Cesium
// into the global scope during local developmnet

// copycd:: 이건 실행되는 app 기준의 상대경로임.
window.CESIUM_BASE_URL = "../Source/";

import * as Cesium from "../../Source/Cesium.js";
window.Cesium = Cesium;

// Since ES6 modules have no guaranteed load order,
// only call startup if it's already defined but hasn't been called yet
if (!window.startupCalled && typeof window.startup === "function") {
  window.startup(Cesium);
}
