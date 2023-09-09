import React from "react";
// import "./Layout.scss";
import HUDSwitch from "./HUDSwitch.tsx";

import {
  contactJson,
  skillsJson,
  germanyCourseJson,
  snauCourseJson,
  languagesJson,
} from "./profile.ts";

import InfoBlock from "./InfoBlock.tsx";
import BubbleList from "./BubbleList.tsx";
import Experience from "./Experience.tsx";
import Languages from "./Languages.tsx";
import Header from "./Header.tsx";

const Layout = () => {
  const [isHudEnabled, setIsHud] = React.useState(true);

  return (
    <>
      <HUDSwitch isHudEnabled={isHudEnabled} setIsHud={setIsHud} />
      <div
        className={`wrapper ${
          isHudEnabled ? "" : "hidden"
        } ${"w-screen"} auto-rows-80pxAuto absolute z-10 m-auto mb-0 mt-0 grid  cursor-default grid-cols-1 overflow-auto p-1  text-white md:grid-cols-12  md:pt-[100px]`}
      >
        <Header
          heading="Bohdan Sheiko"
          subHeading="Front-End Developer"
        ></Header>
        <InfoBlock header="Contact">
          <BubbleList prop={contactJson}></BubbleList>
        </InfoBlock>
        <InfoBlock header="skills">
          <BubbleList prop={skillsJson}></BubbleList>
        </InfoBlock>
        <InfoBlock header="education">
          <Experience json={germanyCourseJson}></Experience>
          <Experience json={snauCourseJson}></Experience>
        </InfoBlock>
        <InfoBlock header="languages">
          <Languages json={languagesJson}></Languages>
        </InfoBlock>
        {/* <footer>Footer</footer> */}
      </div>
    </>
  );
};

export default Layout;
