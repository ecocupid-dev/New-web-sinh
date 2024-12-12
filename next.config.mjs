/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecocupid.s3.ap-southeast-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh7-us.googleusercontent.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "lh7-us.googleusercontent.com/docs",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "ecocupid-asean.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "ecocupid-asean.com/wp-content",
        port: "",
        pathname: "/**"
      },
    ],
  },
  // compiler: {
  //   removeConsole: {
  //     exclude: ['warning']
  //   }
  // }
};

// https://lh7-us.googleusercontent.com/docsz/AD_4nXfTAdy3jIJx79T6J3GnoJUp1WyAiPBPAr8O7ourt2m0FcQD8A9hUDyiFucnuUxz7aTos1BwA3hoQb95U4gxL2VxmBLzkO9Ci0SMpcPQ98uiVrG48L996-XxFCiYX3tlCqATctoqBYR0UPYgys425oKayA?key=k96y_OlEKleU_NdhHVZPog
// https://ecocupid-asean.com/wp-content/uploads/2023/08/vlcsnap-2023-08-28-14h08m08s583.png

export default nextConfig;
