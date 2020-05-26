import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_HOST_WS || `http://localhost:3001/`
});