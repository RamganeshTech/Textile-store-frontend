// Validate login payload
const validateLogin = (payload: { email?: string; password?: string }): void => {
    const { email, password } = payload;
  
    if (!email) {
      throw new Error("Enter the Email");
    }
    if (!email.includes("@")) {
        throw new Error("Invalid Email format: missing '@'");
      }
    if (!password) {
      throw new Error("Enter the Password");
    }
  };
  
  // Validate registration payload
  // Validate registration payload
const validateRegister = (payload: {
    userName?: string;
    email?: string;
    password?: string;
    address?: string;
    pincode?: string;
    state?: string;
    phoneNumber?: string;
  }): void => {
    const { userName, email, password } = payload;
  
    if (!userName) {
      throw new Error("Enter your Name");
    }
    if (!email) {
      throw new Error("Enter the Email");
    }
    if (!email.includes("@")) {
      throw new Error("Invalid Email format: missing '@'");
    }
    if (!password) {
      throw new Error("Enter the Password");
    }
    
    // Regex for strong password:
    // - Minimum eight characters
    // - At least one uppercase letter, one lowercase letter, one number, and one special character
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!strongPasswordRegex.test(password)) {
      throw new Error(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
      );
    }
  };

  const validateChangePassword = ({newPassword,
    currentPassword,
    confirmPassword,}:{newPassword:string, currentPassword:string, confirmPassword:string})=>{

      if(!currentPassword){
        throw new Error("Please Enter the Current password form")
      }

      if(currentPassword.length < 8){
        throw new Error("Please enter password with atleast 8 length")
      }

      if(!newPassword){
        throw new Error("Please Enter the New password form")
      }


      const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!strongPasswordRegex.test(newPassword)) {
      throw new Error(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
      );
    }

      if(newPassword !== confirmPassword){
        throw new Error("new Password and Confirm password should be same")
      }
  }  
  export { validateLogin, validateRegister , validateChangePassword};