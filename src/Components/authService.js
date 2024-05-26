import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/v1/user/login", {
      username: email,
      password: password,
    });
    console.log(response);
    console.log(response.status);
    if (response.status === 200) {
      return {
        user_id: response.data.user_id,
        success: true,
        message: "Login successful",
      };
    } else {
      return {
        user_id: 0,
        success: false,
        message: "Invalid email or password",
      };
    }
  } catch (error) {
    return { user_id: 0, success: false, message: "Invalid email or password" };
  }
};

  