import { Image } from "antd";

type TProps = {
  text?: string;
};

export const NotFound = ({ text = "Not found Page" }: TProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 my-10">
      <div className="w-1/2 h-1/2">
        <Image
          src="/image/404.avif"
          alt=""
          width={"100%"}
          height={"100%"}
          preview={false}
        />
      </div>
      <h1 className="font-bold text-[#004737] text-[3.6rem]">{text}</h1>
    </div>
  );
};
