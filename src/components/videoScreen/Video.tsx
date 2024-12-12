"use client";
import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

type TProps = {
  LinkYoutube: string;
};

export const Video = ({ LinkYoutube }: TProps) => {

  return (
    <ReactPlayer
      url={LinkYoutube}
      style={{
        borderRadius: "12px",
        overflow: "hidden",
      }}
      controls={true}
      width={"100%"}
      height={"100%"}
      // config={{
      //   youtube: {
      //     playerVars: {
      //       modestbranding: 1,
      //       rel: 0,
      //       showinfo: 0,
      //       controls: 0, // Ẩn điều khiển
      //     },
      //   },
      // }}
    />
  );
};
