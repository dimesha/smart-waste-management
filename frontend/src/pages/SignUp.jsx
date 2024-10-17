import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import background from "../assets/background.png";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.address ||
      !formData.email ||
      !formData.password
    ) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);

      Swal.fire({
        title: "Account Created!",
        text: "Your account has been successfully created.",
        confirmButtonText: "OK",
        confirmButtonColor: "#006400",
      }).then(() => {
        navigate("/sign-in");
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
      <div className="flex flex-col items-center p-8 max-w-lg w-full glassmorphism rounded-lg shadow-lg mx-8">
        <img src={logo} alt="Logo" className="h-16 mb-5" />
        <div className="text-4xl mb-3 text-center font-serif">
          CREATE ACCOUNT
        </div>
        <hr className="shadow-lg mb-2 w-full bg-white" />
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <div>
            <Label value="First Name :" className="text-white" />
            <TextInput
              type="text"
              placeholder="Enter First Name"
              id="firstName"
              className="mt-1"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <Label value="Address :" className="text-white" />
            <TextInput
              type="text"
              placeholder="Enter Address"
              id="address"
              className="mt-1"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <Label value="Email :" className="text-white" />
            <TextInput
              type="email"
              placeholder="Enter Email Address"
              id="email"
              className="mt-1"
              onChange={handleChange}
              required
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              title="Enter Valid Email Address"
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
              "Create Account"
            )}
          </Button>
        </form>
        <div className="flex gap-2 text-sm mt-5 text-white">
          <span>Have an account?</span>
          <Link to="/sign-in" className="text-blue-300">
            Sign In
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
