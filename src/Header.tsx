const Header = (prop: { heading: string; subHeading: string }) => {
  return (
    <header className="row-start-1 mb-1 flex justify-center md:col-span-4 md:col-start-1 md:self-baseline lg:col-span-3 lg:col-start-8">
      <div className="w-fit bg-red-500/[0.65] p-3 px-5">
        <h1 className="text-4xl lg:text-4xl 2xl:text-5xl">{prop.heading}</h1>
        <h2 className="text-xl">{prop.subHeading}</h2>
      </div>
    </header>
  );
};

export default Header;
