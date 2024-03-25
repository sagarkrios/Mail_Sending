import axios from "axios";
const serverUrl = process.env.REACT_APP_server_url;
console.log(serverUrl);

export const emailSend = async (Body) => {
  const response = await axios.post(serverUrl + "/api/user/email", Body);
  return response;
};
