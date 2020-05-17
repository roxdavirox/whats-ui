import axios from "axios";
import localStorageService from "./localStorageService";
import api from '../services/api';

class JwtAuthService {

  // Dummy user object just for the demo
  user = {
    // userId: "1",
    // role: 'ADMIN',
    // displayName: "Adm",
    // email: "fulano@gmail.com",
    // photoURL: "/assets/images/face-6.jpg",
    // age: 25,
    // token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh"
  }

  // You need to send http request with email and passsword to your server in this method
  // Your server will return user object & a Token
  // User should have role property
  // You can define roles in app/auth/authRoles.js
  loginWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      api
        .post('auth/authenticate', { email, password })
        .then(({ data }) => resolve(data));
    }).then(data => {
      // Login successful
      // Save token
      this.setSession(data.token);
      // Set user
      this.user = {
        ...data.user,
        token: data.token
      };
      this.setUser(this.user);
      console.log('this.user', this.user);
      return this.user
    });
  };

  // You need to send http requst with existing token to your server to check token is valid
  // This method is being used when user already logged in & app is reloaded
  loginWithToken = () => {
    return new Promise((resolve, reject) => {
      const token = localStorageService.getToken();
      if (!token) reject("No token provided");
      console.log('localStorage token', token);

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }

      api
        .post('auth/validate', { token }, config)
        .then(resolve);
    }).then(({ data }) => {
      console.log('data', data);
      if (!data.auth) {
        console.log('auth error');
        return;
      }
      this.setSession(data.token);
      this.setUser(data.user);
      return data.user;
    });
  };

  logout = () => {
    console.log('logout - localstorage');
    this.setSession(null);
    this.removeUser();
  }

  // Set token to all http request header, so you don't need to attach everytime
  setSession = token => {
    if (token) {
      localStorage.setItem("jwt_token", token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      localStorage.removeItem("jwt_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // Save user to localstorage
  setUser = (user) => {    
    localStorageService.setItem("auth_user", user);
  }
  // Remove user from localstorage
  removeUser = () => {
    localStorage.removeItem("auth_user");
  }
}

export default new JwtAuthService();
