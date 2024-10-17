import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import logo from "../assets/logo.png";
import background from "../assets/background.png";
import Swal from "sweetalert2";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || "Login failed. Please try again.");
        setLoading(false);
        return;
      }

      // Save the token and user data in local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.data));

      // Redirect to another page after successful login
      setLoading(false);
      Swal.fire({
        title: "Login Successful!",
        text: "You have successfully logged in.",
        confirmButtonText: "OK",
        confirmButtonColor: "#006400",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      setErrorMessage("Server error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="flex flex-col items-center p-8 max-w-lg w-full glassmorphism rounded-lg shadow-2xl mx-8">
        <img src={logo} alt="Logo" className="h-16 mb-5" />
        <div className="text-4xl mb-3 text-center font-serif">LOGIN</div>
        <hr className="shadow-lg mb-2 w-full bg-white" />
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <div>
            <Label value="Email :" className="text-white" />
            <TextInput
              type="email"
              placeholder="Enter Email Address"
              id="email"
              className="mt-1"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <Label value="Password :" className="text-white" />
            <TextInput
              type="password"
              placeholder="Enter Password"
              id="password"
              className="mt-1"
              required
              onChange={handleChange}
            />
          </div>
          <Button
            gradientDuoTone="greenToBlue"
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Log In"
            )}
          </Button>
        </form>
        <div className="flex gap-2 text-sm mt-5 font-serif text-white">
          <span>Do not have an account?</span>
          <Link to="/sign-up" className="text-blue-300">
            Sign Up
          </Link>
        </div>
        {errorMessage && (
          <Alert className="mt-5 w-full" color="failure">
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}
