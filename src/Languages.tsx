import React from "react";
import { Language } from "./lib/profile";

const Languages: React.FC<{ json: Language[] }> = (prop) => {
  return (
    <ul className="grid grid-cols-2">
      {prop.json.map((element, key) => {
        return (
          <li
            key={key}
            className="m-1 rounded-lg border p-1 shadow-cyan-500 duration-150 ease-in hover:border-custom-cyan hover:shadow-custom-cyan-shadow"
          >
            <p className="text-xl">{element.language}</p>
            <p className="text-sm">{element.level}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Languages;
