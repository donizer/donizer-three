import React from "react";
import { Language } from "./profile";

const Languages: React.FC<{ json: Language[] }> = (prop) => {
  return (
    <ul className="grid grid-cols-2">
      {prop.json.map((element) => {
        return (
          <li className="hover:border-custom-cyan hover:shadow-custom-cyan-shadow m-1 rounded-lg border p-1 shadow-cyan-500 duration-150 ease-in">
            <p className="text-xl">{element.language}</p>
            <p className="text-sm">{element.level}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Languages;
