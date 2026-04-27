import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
  phone: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/shop/home");
    }
  }, [isAuthenticated, navigate]);

  function onSubmit(event) {
    event.preventDefault();

    if (isLoading) return; // Prevent multiple submissions

    dispatch(registerUser(formData)).then((data) => {
      
      if (data?.payload?.success) {
        toast({
          title: "Registration successful!",
          description: data?.payload?.message,
        });
        
        // Show verification info
        if (data?.payload?.requiresEmailVerification) {
          toast({
            title: "Email Verification Required",
            description: "Please check your email for verification link. For development, check the server console for the verification URL.",
            duration: 10000,
          });
        }
        
        if (data?.payload?.requiresPhoneVerification) {
          toast({
            title: "Phone Verification Required",
            description: "Please check your phone for SMS verification code. For development, check the server console for the verification code.",
            duration: 10000,
          });
        }
        
        navigate("/auth/login");
      } else {
        toast({
          title: "Registration failed",
          description: data?.payload?.message,
          variant: "destructive",
        });
      }
    }).catch((error) => {
      toast({
        title: "Registration failed",
        variant: "destructive",
      });
    });
  }


  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Create new account
        </h1>
        <p className="mt-2 text-zinc-400">
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary hover:text-primary/80 transition-colors"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
