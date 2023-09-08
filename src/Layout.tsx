import "./Layout.scss";

const Layout = () => {
  return (
    <div className="wrapper">
      <header>
        <h1>Bohdan Sheiko</h1>
        <h2>Front-end Developer</h2>
      </header>
      <article className="first">
        <h2>Contact</h2>
        <ul>
          <li>
            <a href="mailto:bogdan.ua45@gmail.com">bogdan.ua45@gmail.com </a>{" "}
          </li>
          <li>
            <a href="https://goo.gl/maps/Ripy6AqZmeaqzobi7">Sumy, Ukraine</a>
          </li>
          <li>
            <a href="https://github.com/donizer">github.com/donizer</a>{" "}
          </li>
          <li>
            <a href="https://www.linkedin.com/in/bohdan-sheiko/">
              linkedin.com/in/bohdan-sheiko/
            </a>
          </li>
        </ul>
      </article>
      <article>
        <h2>SKILLS</h2>

        <ul>
          <li>HTML/CSS/JS </li>
          <li>TypeScript </li>
          <li>React </li>
          <li>Vite</li>
          <li>BEM </li>
          <li>GIT</li>
          <li>CSS</li>
          <li>Preprocessors</li>
        </ul>
      </article>
      <article>
        <h2>EDUCATION</h2>
        <div className="experience">
          <h3>Bioprocess Informatics</h3>
          <h4>Weihenstephan-Triesdorf University of Applied Sciences</h4>
          <div className="justify ">
            <p className="subtext">09/2022 - 12/2022</p>
            <p className="subtext">Germany (Online)</p>
          </div>
          <div className="content">
            <p className="subtext">courses</p>
            <ul>
              <li>English for Studying, Working, and Living Abroad (B2.2)</li>
              <li>Preparatory Technical English B1/B2</li>
              <li>Informatics & Programming</li>
            </ul>
          </div>
        </div>
        <div className="experience">
          <h3>Animal Science, Bachelor's degree</h3>
          <h4>Sumy National Agrarian University</h4>
          <div className="justify">
            <p className="subtext">09/2018 - 06/2022</p>
            <p className="subtext">Sumy, Ukraine</p>
          </div>
        </div>
      </article>
      <article>
        <h2>LANGUAGES</h2>
        <div className="justify">
            <div>
              <p>Ukrainian</p>
              <p className="subtext">Native or Bilingual Proficiency</p>
            </div>
            <div>
              <p>English</p>
              <p className="subtext">Professional Working Proficiency</p>
            </div>
          </div>
      </article>
      {/* <footer>Footer</footer> */}
    </div>
  );
};

export default Layout;
