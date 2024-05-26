import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { login } from "./authService"; // Import the authentication service

const Home = () => {
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between sign-up and login
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Initialize navigate function

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user_id, success, message } = await login(
      form.email,
      form.password
    ); // Use await to handle the asynchronous login function
    setMessage(message);
    if (success) {
      setIsSignUp(false);
      navigate(`/app/user/${user_id}/threads`); // Navigate to /app/threads route on successful login
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setMessage(""); // Clear any previous messages
  };

  return (
    <div className="bg-[#A9BA9D] w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="bg-[#BDD1BD] p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        {message && (
          <p
            className={`mb-4 ${
              message.includes("success") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="string"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleInputChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
            >
              {isSignUp ? "Sign Up" : "Login"}
            </button>
            <button
              type="button"
              onClick={toggleForm}
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ml-2"
            >
              {isSignUp
                ? "Already have an account? Login"
                : "Need an account? Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
