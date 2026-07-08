import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginEmployee, registerEmployee } from "../state/auth/authAction";
import { removeEmployee } from "../state/auth/authSlice";
import { toast } from "react-hot-toast";

export let useAuth = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  const onRegisterSubmit = async (data) => {
    try {
      await dispatch(registerEmployee(data)).unwrap();
      toast.success("Account created successfully!", { id: "auth-toast" });
      reset();
      navigate("/home");
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error || "Registration failed. Please try again.", { id: "auth-toast" });
      setError("root", {
        type: "manual",
        message: error || "Registration failed. Please try again."
      });
    }
  };

  const onLoginSubmit = async (data) => {
    try {
      await dispatch(loginEmployee(data)).unwrap();
      toast.success("Welcome back!", { id: "auth-toast" });
      reset();
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error || "Login failed. Please try again.", { id: "auth-toast" });
    }
  };

  const onLogout = () => {
    dispatch(removeEmployee());
    toast.success("Logged out successfully!", { id: "auth-toast" });
    navigate("/auth/login");
  };

  return {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    errors,
    isLoading,
    onRegisterSubmit,
    onLoginSubmit,
    onLogout,
    navigate,
  };
};