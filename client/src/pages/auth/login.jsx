import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/shop/home");
    }
  }, [isAuthenticated, navigate]);

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      
      if (data?.payload?.success) {
        toast({
          title: "Login successful!",
          description: "Welcome back! Redirecting to home page...",
        });
        navigate("/shop/home");
      } else {
        const message = data?.payload?.message;
        const requiresEmailVerification = data?.payload?.requiresEmailVerification;
        
        if (requiresEmailVerification) {
          toast({
            title: "Email Verification Required",
            description: "Please verify your email before logging in. For development, check the server console for verification instructions.",
            variant: "destructive",
            duration: 8000,
          });
        } else {
          toast({
            title: "Login failed",
            description: message || "Please check your credentials and try again",
            variant: "destructive",
          });
        }
      }
    }).catch((error) => {
      toast({
        title: "Login failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Sign in to your account
        </h1>
        <p className="mt-2 text-zinc-400">
          Don't have an account?
          <Link
            className="font-medium ml-2 text-primary hover:text-primary/80 transition-colors"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <div className="text-center">
        <Link
          className="text-sm text-primary hover:underline"
          to="/auth/forgot-password"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}

export default AuthLogin;
