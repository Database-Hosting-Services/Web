import { toast } from "react-hot-toast";

// Shared toast settings
const baseOptions = {
  position: "top-center",
  duration: 2000,
  pauseOnHover: true,
};

// Success Toast Config
export const successToast = (message) => {
  toast.success(message, {
    ...baseOptions,
    iconTheme: {
      primary: "#6D4DEF",
      secondary: "#FFFFFF",
    },
    style: {
      background: "#191A30",
      color: "#FFFFFF",
      fontSize: "14px",
      padding: "10px 16px",
      borderRadius: "11px",
      fontFamily: "Roboto, sans-serif",
    },
  });
};

// Error Toast Config
export const errorToast = (message) => {
  toast.error(message, {
    ...baseOptions,
    iconTheme: {
      primary: "#FF5C5C",
      secondary: "#FFFFFF",
    },
    style: {
      background: "#2E0F12",
      color: "#FFBABA",
      fontSize: "14px",
      padding: "10px 16px",
      borderRadius: "11px",
      fontFamily: "Roboto, sans-serif",
    },
  });
};
