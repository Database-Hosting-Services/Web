import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";

// Define color palette
const colorPalette = {
  primary: "#06071A", // Dark Blue
  secondary: "#191A30",
  tertiary: "#282939",
  highlight: "#4C75FF", // Sign In/Up Circle
  gradientStart: "#682EC7", // Linear Gradient Start
  gradientEnd: "#5A12D3", // Linear Gradient End
  gradientHover: "#6D4DEF", // Hover Color
  radialStart: "#5505A4", // Radial Gradient Start
  radialMiddle: "#801AE5", // Radial Gradient Middle
  radialEnd: "#060714", // Radial Gradient End
  danger: "#FF0000", // Red
  dangerOpacity: "rgba(255, 0, 0, 0.8)", // 80% opacity red
  success: "#00E100", // Green
  warning: "#E1E100", // Yellow
};

// Define gradient styles
const gradientStyles = {
  linear: `linear-gradient(90deg, ${colorPalette.gradientStart} 0%, ${colorPalette.gradientEnd} 100%)`,
  radial: `radial-gradient(circle, ${colorPalette.radialStart} 0%, ${colorPalette.radialMiddle} 50%, ${colorPalette.radialEnd} 100%)`,
};

// Define typography settings
const typographySettings = {
  fontFamily: {
    roboto: ["Roboto", "sans-serif"],
  },
  fontSize: {
    xs: "11px",
    sm: "13px",
    base: "14px",
    lg: "15px",
    xl: "16px",
    "2xl": "18px",
    "3xl": "20px",
    "4xl": "24px",
    "5xl": "32px",
  },
  fontWeight: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
  },
};

// Define other theme extensions
const themeExtensions = {
  colors: colorPalette,
  backgroundImage: {
    "gradient-linear": gradientStyles.linear,
    "gradient-radial": gradientStyles.radial,
  },
  opacity: {
    10: "0.1",
    20: "0.2",
  },
  boxShadow: {
    "inner-md":
      "inset 0 4px 6px -1px rgba(0, 0, 0, 0.1), inset 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  ...typographySettings,
};

// Export the configuration
export default {
  content: ["./index.html", "./src/*/.{js,ts,jsx,tsx}"], // Define where Tailwind will be used
  theme: {
    extend: themeExtensions,
  },
  plugins: [typography, forms],
};
