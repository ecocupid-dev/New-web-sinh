import { Button } from "antd";
import { useSwiper } from "swiper/react";
import { Image } from "antd";
import React from "react";
const NavigationButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="navigation-buttons">
      <Button className="navigation-button" onClick={() => swiper.slidePrev()}>
        <Image
          src="/icon/arrow-pre.png"
          className="navigation-button-icon"
          alt="arrow-previous-button"
          preview={false}
        />
      </Button>
      <Button className="navigation-button" onClick={() => swiper.slideNext()}>
        <Image
          src="/icon/arrow-next.png"
          className="navigation-button-icon"
          alt="arrow-next-button"
          preview={false}
        />
      </Button>
    </div>
  );
};

export const NavigationButtonsMemo = React.memo(NavigationButtons);
