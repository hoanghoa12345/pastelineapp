import Cookies from "js-cookie";

function getToken() {
  return Cookies.get("access_token");
}

function generateAvatar(username, foregroundColor, backgroundColor) {
  const text = username.charAt(0).toUpperCase();
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 200;
  canvas.height = 200;

  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.font = "bold 100px Open Sans";
  context.fillStyle = foregroundColor;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL("image/png");
}

export { getToken, generateAvatar };
