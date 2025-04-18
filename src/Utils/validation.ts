import { BookinginfoType } from "../pages/Payment/Payment";
import { userAddress } from "../slices/user";

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

const validateChangePassword = ({ newPassword,
  currentPassword,
  confirmPassword, }: { newPassword: string, currentPassword: string, confirmPassword: string }) => {

  if (!currentPassword) {
    throw new Error("Please Enter the Current password")
  }

  if (currentPassword.length < 8) {
    throw new Error("Please enter password with atleast 8 length")
  }

  if (!newPassword) {
    throw new Error("Please Enter the New password")
  }


  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!strongPasswordRegex.test(newPassword)) {
    throw new Error(
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
    );
  }

  if (newPassword !== confirmPassword) {
    throw new Error("new Password and Confirm password should be same")
  }
}

const validateDeliveryDetails = (name: keyof BookinginfoType, value: string) => {
  if (["username", "doorno", "street", "state", "district", "pincode", "landmark"].includes(name)) {
    if (!value.trim()) {
      throw new Error(`${name} is required`);
    }
  }

  // Validate email field separately
  if (name === "email") {
    if (!value.trim()) {
      throw new Error("Email is required");
    }
    if (!value.includes("@")) {
      throw new Error("Invalid email format");
    }
  }

  // Validate phone number separately
  if (name === "phonenumber") {
    if (!value.trim()) {
      throw new Error("Phone number is required");
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(value.trim())) {
      throw new Error("Please enter a valid 10-digit phone number");
    }
  }

  if (name === "pincode") {
    if (/[a-zA-Z]/.test(value.trim())) {
      throw new Error(`${name} should not contain alphabets`)
    }
  }


  if(["state", "district"].includes(name)){
    if(/[0-9]/.test(value.trim())){
      throw new Error(`${name} should not contain Numbers`)
    }
  }
};


const validateAddress = (name: keyof userAddress, value: string) => {
  if (["doorno", "street", "state", "district", "pincode", "landmark"].includes(name)) {
    if (!value?.trim()) {
      throw new Error(`${name} is required`);
    }
  }

  if (name === "pincode") {
    if (/[a-zA-Z]/.test(value.trim())) {
      throw new Error(`${name} should not contain alphabets`)
    }
  }


  if(["state", "district"].includes(name)){
    if(/[0-9]/.test(value.trim())){
      throw new Error(`${name} should not contain Numbers`)
    }
  }
}


export { validateLogin, validateRegister, validateChangePassword, validateDeliveryDetails, validateAddress };