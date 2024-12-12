import { Lato } from "next/font/google";
import localFont from "next/font/local";

export const lator = Lato({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  adjustFontFallback: false
});

export const gereralSans = localFont({
  src: [
    {
      path: "../../assets/fonts/GerneralSans/GeneralSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../assets/fonts/GerneralSans/GeneralSans-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../assets/fonts/GerneralSans/GeneralSans-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../assets/fonts/GerneralSans/GeneralSans-ExtralightItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../assets/fonts/GerneralSans/GeneralSans-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../assets/fonts/GerneralSans/GeneralSans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../assets/fonts/GerneralSans/GeneralSans-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../assets/fonts/GerneralSans/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../assets/fonts/GerneralSans/GeneralSans-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../assets/fonts/GerneralSans/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/GerneralSans/GeneralSans-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../assets/fonts/GerneralSans/GeneralSans-SemiboldItalic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-gereralSans",
});

export const sfProDisplay = localFont({
  src: [
    {
      path: "../../assets/fonts/SFProDisplay/SF-Pro-Display-Ultralight.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../assets/fonts/SFProDisplay/SF-Pro-Display-UltralightItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../../assets/fonts/SFProDisplay/SF-Pro-Display-Thin.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../assets/fonts/SFProDisplay/SF-Pro-Display-ThinItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../assets/fonts/SFProDisplay/SF-Pro-Display-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../assets/fonts/SFProDisplay/SF-Pro-Display-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../assets/fonts/SFProDisplay/SF-Pro-Display-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/SFProDisplay/SF-Pro-Display-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../assets/fonts/SFProDisplay/SF-Pro-Display-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../assets/fonts/SFProDisplay/SF-Pro-Display-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../assets/fonts/SFProDisplay/SF-Pro-Display-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../assets/fonts/SFProDisplay/SF-Pro-Display-SemiboldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../assets/fonts/SFProDisplay/SF-Pro-Display-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../assets/fonts/SFProDisplay/SF-Pro-Display-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-sfProDisplay"
})

// export const lator = localFont({
//   src: []
// })
