import LoginBanner from "../../assets/loginbanner.jpg";
import { useState } from "react";
import { FEHost, host } from "../../config.js";

const ForgottenPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Thêm trạng thái cho nút bấm

  const handleForgottenPassword = async (e) => {
    e.preventDefault();

    setIsSubmitting(true); // Disable nút bấm ngay khi yêu cầu bắt đầu
    const ForgottenPasswordData = { email };

    try {
      const response = await fetch(`${host}/auth/forgetPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ForgottenPasswordData),
      });

      if (response.ok) {
        alert("Password reset link sent successfully");
        window.location.href = `${FEHost}/login`;
      } else {
        const errorData = await response.json();
        alert(`Failed to reset password: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      alert(`An error has occurred: ${error.message}`);
    } finally {
      setIsSubmitting(false); // Kích hoạt lại nút bấm sau khi yêu cầu hoàn tất
    }
  };

  return (
     <div className="divide-y-2 divide-black">
          <div className="h-12"></div>
          <div className="w-full h-[calc(100vh-3rem)] flex flex-grow flex-row divide-black divide-x-2">
               <div className="flex-grow flex flex-col divide-y-2 divide-black">
                    <div>
                         <h1 className="text-6xl font-abeezee ml-10 mb-5 mt-5">Reset your password</h1>
                    </div>
                    <div className="flex-grow flex flex-col justify-center items-center">
                         <form className="w-5/12 flex flex-col" onSubmit={handleForgottenPassword}>
                         <div className="w-full flex flex-row">
                              <div className="bg-[#D9D9D9] w-full flex flex-col rounded-xl mb-5">
                              <input
                                   type="email"
                                   placeholder="Email"
                                   className="bg-transparent w-[calc(100%-1rem)] focus:outline-none ml-2 mr-2 mt-1 mb-1 font-abeezee placeholder:text-black"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   disabled={isSubmitting} // Disable input khi đang xử lý
                              />
                              </div>
                         </div>
                         <button
                              type="submit"
                              className={`bg-[#1F4DEF] w-8/12 font-abeezee text-white rounded-xl self-center mb-20 mt-2 ${
                              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                              }`} // Thay đổi giao diện nút khi bị disable
                              disabled={isSubmitting} // Disable nút bấm khi đang xử lý
                         >
                              {isSubmitting ? "Getting password..." : "Get new password"} {/* Hiển thị trạng thái */}
                         </button>
                         </form>
                    </div>
                    </div>
                         <div className="h-full aspect-[331/494]">
                    <img src={LoginBanner} alt="loginbanner" />
               </div>
          </div>
    </div>
  );
};

export default ForgottenPasswordForm;
