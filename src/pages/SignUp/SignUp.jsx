import { useState } from "react";
import Person from "@/assets/person.svg";
import Email from "@/assets/email.svg";
import Dperson from "@/assets/doublePerson.svg";
import Security from "@/assets/security.svg";
import Verified from "@/assets/verified.svg";
import lock from "@/assets/lock.svg";
import eye from "@/assets/eye.svg";
import { useTheme } from "@/components/ThemeProvider";
import clsx from "clsx";
import { Input, Button } from "@/components";
import logoLight from "@/assets/logoLight.svg";
import logoBlack from "@/assets/logoBlack.svg";
import { Link, useNavigate } from "react-router-dom";
import xNeon from "@/assets/xNeon.svg";
import xNeonBlack from "@/assets/xNeonBlack.svg";
import EnterpriseDetail from "./EnterpriseDetail";
import IndividualDetail from "./IndividualDetail";
import { Tabs } from "@/components";
import { MdOutlineEmail } from "react-icons/md";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const data = [
  {
    id: 1,
    image: Dperson,
    title: "Lorem Ipsum person",
    description:
      "Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet",
  },
  {
    id: 2,
    image: Verified,
    title: "Lorem Ipsum verified",
    description:
      "Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet",
  },
  {
    id: 3,
    image: Security,
    title: "lorem ipsum security",
    description:
      "Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet",
  },
];

let xtabs = [
  { id: "enterprise", label: "Enterprise" },
  { id: "individual", label: "Individual" },
];
const SignUp = () => {
  const { theme } = useTheme();
  const [tabVisible, setTabVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("enterprise");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  let parentClasses = clsx(
    theme === "dark" ? "bg-dark-bg" : "bg-light-bg",
    theme
  );

  let logo = theme === "dark" ? logoLight : logoBlack;
  let tabsContainerLogo = theme === "dark" ? xNeon : logoBlack;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement your signup logic here
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated API call
      setTabVisible(true);
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handltTabChange = (key) => {
    setActiveTab(key);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter";
    }
    if (!hasNumbers) {
      return "Password must contain at least one number";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div
      className={`h-screen overflow-auto text-tbase bg-no-repeat bg-cover bg-top ${parentClasses}`}
    >
      <div
        className={clsx(
          "md:container mx-3  h-full flex flex-col md:flex-row items-center sm:gap-5 md:gap-20",
          { hidden: tabVisible }
        )}
      >
        <div>
          <div>
            <img
              src={logo}
              className={clsx("w-fit h-fit pl-7 md:scale-125")}
              alt="X Carbon Logo"
            />
          </div>
          <div className="hidden md:block">
            <div className="text-2xl tracking-wider">
              <p>The Worlds First Quantum Secure Carbon Market</p>
            </div>
            <div>
              {data.map((item) => (
                <div key={item.id} className="mt-[25px]">
                  <div className="mt-3">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="grid grid-cols-1 gap-y-2 mt-3">
                    <h2 className="text-[16px]">{item.title}</h2>
                    <p className="text-gray-400 text-[14px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          {/* <img src={dots} alt="logo" className="absolute bottom-0 left-0 right-0 z-[1]"/> */}
          <div className="bg-secondary p-7  rounded-lg drop-shadow">
            <form
              className=" grid grid-cols-1 md:grid-cols-2 gap-4"
              onSubmit={handleSubmit}
            >
              <div className="space-y-2 col-span-2 md:col-span-1">
                <label>First Name</label>
                {/* Input Img */}
                {/* <img
                      src={Person}
                      alt="person"
                      className="absolute text-[30px] z-5 mt-6 ml-3 "
                    /> */}
                {/* inputbar */}
                <Input
                  type="text"
                  id="Fname"
                  name="Fname"
                  placeholder="First Name"
                  prefix={<img src={Person} alt="person" />}
                  required
                />
              </div>

              <div className="space-y-2 col-span-2 md:col-span-1">
                <label>Last Name</label>
                {/* Input Img */}
                {/* <img
                      src={Person}
                      alt="person"
                      className="absolute z-5 mt-6 ml-3 "
                    /> */}
                <Input
                  type="text"
                  id="Lname"
                  name="Lname"
                  placeholder=" Last Name"
                  prefix={<img src={Person} alt="person" />}
                />
              </div>

              <div className="space-y-2 col-span-2">
                <label>Email</label>

                {/* Email img */}
                {/* <img
                    src={Email}
                    alt="email"
                    className="absolute  z-5 mt-7 ml-3"
                  /> */}
                {/* Email input */}
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  prefix={<MdOutlineEmail className="h-6 w-6" />}
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2 col-span-2">
                <label>Password</label>
                {/* Password Images */}
                {/* <img
                    src={lock}
                    alt="lock"
                    className="absolute z-10 mt-6 ml-3"
                  /> */}
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  prefix={<img src={lock} alt="Lock" />}
                  suffix={
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <MdVisibilityOff className="h-5 w-5" />
                      ) : (
                        <MdVisibility className="h-5 w-5" />
                      )}
                    </button>
                  }
                  required
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {/* <img
                      src={eye}
                      alt="eye"
                      className="absolute  -mt-8 transform -translate-x-1/2 "
                      id="eye"
                    /> */}
              </div>

              <div className="space-y-2 col-span-2">
                <label>Confirm Password</label>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  suffix={
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showConfirmPassword ? (
                        <MdVisibilityOff className="h-5 w-5" />
                      ) : (
                        <MdVisibility className="h-5 w-5" />
                      )}
                    </button>
                  }
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="col-span-2 mt-3">
                <Button
                  type="submit"
                  disabled={isLoading}
                  size="lg"
                  className={`group relative w-full flex justify-center border border-transparent bg-btn ${
                    isLoading ? "bg-indigo-400" : " hover:bg-btn-500"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : null}
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </div>
              <div className="col-span-2">
                <p>
                  By creating an account, you agree to the
                  <Link to="" className="underline font-semibold px-2">
                    Terms of Service.
                  </Link>
                  We'll occasionally send you account-related emails.
                </p>
              </div>

              <div className="col-span-2 text-center text-[14px]">
                <p>
                  Already have an Account?
                  <span className="font-semibold ">
                    <Link to="/login" className="ml-1">
                      Login
                    </Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "md:container mx-2 flex flex-col md:flex-row items-center justify-center mb-3",
          { hidden: !tabVisible }
        )}
      >
        <div className="w-full md:w-1/2 mb-3">
          <div className={`w-fit h-fit mx-auto`}>
            <img
              src={tabsContainerLogo}
              className="w-full"
              alt="X Carbon Logo"
            />
          </div>
          <div className="p-4  bg-secondary rounded-xl drop-shadow space-y-7">
            {/* <div className="grid grid-cols-2 gap-4 "> */}
            <Tabs
              tabs={xtabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              containerClassName="border-b-0"
              tabClassName={"w-full border-input border h-16"}
            />
            {/* {xtabs.map((tab, key) => (
                <button
                  key={key}
                  onClick={() => handltTabChange(tab.key)}
                  className={clsx(
                    "rounded-t-xl py-5  border text-2xl text-center transition-all duration-500",
                    { "bg-tertiary": activeTab === tab.key },
                    { "text-tbase": theme === "dark" },
                    { "text-text": theme === "light" && activeTab == tab.key },
                    { "text-black": (theme === "light" && activeTab !== tab.key) },
                  )}
                >
                  {tab.label}
                </button>
              ))} */}
            {/* </div> */}
            {activeTab === "enterprise" ? (
              <EnterpriseDetail />
            ) : (
              <IndividualDetail />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
