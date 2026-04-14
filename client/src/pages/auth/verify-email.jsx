import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Mail } from "lucide-react";
import { verifyEmail } from "@/store/auth-slice";

function AuthVerifyEmail() {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setMessage("Invalid verification link. Please check your email and try again.");
      setIsVerifying(false);
      setIsSuccess(false);
      return;
    }

    // Call real verification API
    dispatch(verifyEmail(token))
      .then((response) => {
        setIsVerifying(false);
        
        if (response?.payload?.success) {
          setIsSuccess(true);
          setMessage(response?.payload?.message || "Your email has been successfully verified! You can now login to your account.");
          
          toast({
            title: "Email Verified Successfully!",
            description: "Your account is now active. You can login.",
            duration: 5000,
          });
        } else {
          setIsSuccess(false);
          setMessage(response?.payload?.message || "Email verification failed. Please try again or request a new verification email.");
          
          toast({
            title: "Verification Failed",
            description: response?.payload?.message || "Email verification failed. Please try again.",
            variant: "destructive",
            duration: 5000,
          });
        }
      })
      .catch((error) => {
        setIsVerifying(false);
        setIsSuccess(false);
        setMessage("An error occurred during verification. Please try again.");
        
        toast({
          title: "Verification Error",
          description: "An error occurred during email verification. Please try again.",
          variant: "destructive",
          duration: 5000,
        });
        
        console.error('Email verification error:', error);
      });
  }, [searchParams, toast, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {isVerifying ? (
              <Mail className="w-16 h-16 text-blue-500 animate-pulse" />
            ) : isSuccess ? (
              <CheckCircle className="w-16 h-16 text-green-500" />
            ) : (
              <XCircle className="w-16 h-16 text-red-500" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {isVerifying ? "Verifying Email..." : isSuccess ? "Email Verified!" : "Verification Failed"}
          </CardTitle>
          <CardDescription>
            {isVerifying 
              ? "Please wait while we verify your email address..."
              : message
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {!isVerifying && (
            <p className="text-sm text-gray-600">
              {isSuccess 
                ? "You can now login to your account and start shopping."
                : "Please check your email for the correct verification link or request a new one."
              }
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {!isVerifying && (
            <Button 
              onClick={() => navigate("/auth/login")}
              className="w-full"
            >
              {isSuccess ? "Go to Login" : "Back to Login"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default AuthVerifyEmail;
