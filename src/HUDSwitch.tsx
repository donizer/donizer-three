import React from "react";
import hideImage from "./assets/icons/hide_image_FILL0_wght400_GRAD0_opsz24.svg";
import showIco from "./assets/icons/image_FILL0_wght400_GRAD0_opsz24.svg";

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
      className={`fixed bottom-4 right-4 text-white ${
        !prop.isHudEnabled ? "bg-blue-500/80" : "bg-red-500/80"
      } z-50 m-4 cursor-pointer rounded-full  p-4`}
      onClick={handleClick}
    >
      <img src={`${prop.isHudEnabled ? hideImage : showIco}`} alt="" />
    </button>
  );
};

export default HUDSwitch;
