import React from "react";
import hideImage from "./assets/hide_image_FILL0_wght400_GRAD0_opsz24.svg";
import showIcon from "./assets/image_FILL0_wght400_GRAD0_opsz24.svg";

const HUDSwitch = (prop: {
  isHudEnabled: boolean;
  setIsHud: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClick = () => {
    prop.setIsHud((prev) => !prev);
  };
  return (
    <button
      type="button"
      className={`text-white absolute bottom-4 right-4 ${
        !prop.isHudEnabled ? "bg-blue-500/80" : "bg-red-500/80"
      } cursor-pointer z-50 m-4 p-4  rounded-full`}
      onClick={handleClick}
    >
      <img src={`${prop.isHudEnabled ? hideImage : showIcon}`} alt="" />
    </button>
  );
};

export default HUDSwitch;
