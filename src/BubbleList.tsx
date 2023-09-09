import React from "react";

export type propType = {
  url?: string;
  name: string;
  iconUrl?: string;
};

const BubbleList: React.FC<{ prop: propType[] }> = (json) => {
  return (
    <ul className="flex flex-wrap">
      {}
      {json.prop.map((listItem, key) => {
        return (
          <li
            key={key}
            className="hover:border-custom-cyan hover:shadow-custom-cyan-shadow m-1 flex rounded-xl border p-1 shadow-cyan-500 duration-150 ease-in"
          >
            {listItem.iconUrl ? (
              <>
                <img
                  src={listItem.iconUrl}
                  alt="icon"
                  style={{ display: "inline" }}
                  width={24}
                  className="rounded-xl"
                />
              </>
            ) : (
              ""
            )}
            {listItem.url ? (
              <a href={listItem.url}>{listItem.name}</a>
            ) : (
              <>{listItem.name}</>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default BubbleList;
