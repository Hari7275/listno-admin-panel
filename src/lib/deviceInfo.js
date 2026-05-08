// ✅ Get Device Info
export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;

  let osName = "Web";
  let osVersion = "Unknown";

  // 🧠 OS detect
  if (userAgent.includes("Windows")) {
    osName = "Windows";
  } else if (userAgent.includes("Mac")) {
    osName = "MacOS";
  } else if (userAgent.includes("Android")) {
    osName = "Android";
  } else if (userAgent.includes("iPhone")) {
    osName = "iOS";
  }

  // 🧠 Browser detect
  let deviceModel = "Unknown Browser";

  if (userAgent.includes("Chrome")) {
    deviceModel = "Chrome";
  } else if (userAgent.includes("Firefox")) {
    deviceModel = "Firefox";
  } else if (userAgent.includes("Safari")) {
    deviceModel = "Safari";
  } else if (userAgent.includes("Edge")) {
    deviceModel = "Edge";
  }

  return {
    deviceModel,
    osName,
    osVersion,
    appVersion: "1.0.0",
    fcmToken: "",
    appInstallSource: "PLAY_STORE",
  };
};

// ✅ Generate / Get Device ID
export const getDeviceId = () => {
  let id = localStorage.getItem("deviceId");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("deviceId", id);
  }

  return id;
};