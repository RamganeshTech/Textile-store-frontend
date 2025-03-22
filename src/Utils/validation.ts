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
  
  export { validateLogin, validateRegister };