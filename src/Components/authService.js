// authService.js
import axios from 'axios';

const users = [
    { email: "user1@example.com", password: "password1" },
    { email: "user2@example.com", password: "password2" },
  ];
  
  export const signUp = (email, password) => {
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      return { success: false, message: "User already exists" };
    }
    users.push({ email, password });
    return { success: true, message: "User registered successfully" };
  };
  
  export const login = async (email, password) => {
    try {
      const response = await axios.post('https://p9v82c8s-8000.inc1.devtunnels.ms/v1/user/login', {
        username: email,
        password: password,
      });
      console.log(response)
      console.log(response.status)
      if (response.status === 200) {
        console.log("Hey")
        console.log(response.data.user_id)
        return { user_id : response.data.user_id,success: true, message: "Login successful" };
      } else {
        return { user_id :0,success: false, message: "Invalid email or password" };
      }
    } catch (error) {
      return { user_id:0,success: false, message: "Invalid email or password" };
    }
  };
  // export const login = (email, password) => {
  //   const user = users.find((user) => user.email === email && user.password === password);
  //   if (user) {
  //     return { success: true, message: "Login successful" };
  //   }
  //   return { success: false, message: "Invalid email or password" };
  // };
  