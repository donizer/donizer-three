const Header = (prop: { heading: string; subHeading: string }) => {
  return (
    <header className="row-start-1 mb-1 bg-red-500/[0.65] p-1 md:col-span-4 md:col-start-7 md:self-baseline lg:col-span-3 lg:col-start-8">
      <h1 className="text-4xl lg:text-4xl xl:text-5xl">{prop.heading}</h1>
      <h2 className="text-sm sm:text-lg md:text-xl">{prop.subHeading}</h2>
    </header>
  );
};

export default Header;
