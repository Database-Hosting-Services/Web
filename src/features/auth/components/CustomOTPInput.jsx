import OTPInput from "react-otp-input";
import { Form } from "react-router-dom";

const CustomOTPInput = ({ otp, setOtp, email }) => {
  return (
    <Form method="post" action="/verify-email">
      <input type="hidden" name="email" value={email} />
      <OTPInput
        value={otp}
        onChange={setOtp}
        containerStyle={{
          display: "flex",
          justifyContent: "space-around",
          margin: "0.5rem",
          padding: "0.75rem",
        }}
        inputStyle={{
          border: "1px solid #282939",
          borderRadius: "0.5rem",
          width: "4rem",
          height: "3.75rem",
          fontSize: "18px",
          color: "#FFFFFF",
          textAlign: "center",
          backgroundColor: "#191A30",
          marginBottom: "0.5rem",
          fontWeight: "300",
        }}
        numInputs={6}
        // inputType="tel"
        renderSeparator={<span></span>}
        renderInput={(props) => <input {...props} />}
        shouldAutoFocus={true}
        skipDefaultStyles={true}
      />
    </Form>
  );
};

export default CustomOTPInput;
