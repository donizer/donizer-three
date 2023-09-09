import React from "react";

type Props = {
  children: React.ReactNode;
  header: string;
  subHeader?: string;
};

const InfoBlock = ({ children, header, subHeader }: Props) => {
  return (
    <article className="row-span-1 mb-1 rounded-lg bg-black/[0.69] p-1 md:col-span-3 md:col-start-2">
      <h2 className="text-2xl uppercase">{header}</h2>
      {subHeader ? <h3>{subHeader}</h3> : ""}
      {children}
    </article>
  );
};

export default InfoBlock;
