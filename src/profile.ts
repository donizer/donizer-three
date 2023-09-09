import { propType } from "./BubbleList.tsx";

import mailIco from "./assets/icons/icons8-mail-48.png";
import earthIco from "./assets/icons/icons8-google-earth.svg";
import GitHubIco from "./assets/icons/github-mark-white.svg";
import LinkedInIco from "./assets/icons/LI-In-Bug.png";

export const contactJson: propType[] = [
  {
    name: "bogdan.ua45@gmail.com",
    url: "mailto:bogdan.ua45@gmail.com",
    iconUrl: mailIco,
  },
  {
    name: "Sumy, Ukraine",
    url: "https://goo.gl/maps/Ripy6AqZmeaqzobi7",
    iconUrl: earthIco,
  },
  {
    name: "github.com/donizer",
    url: "https://github.com/donizer",
    iconUrl: GitHubIco,
  },
  {
    name: "linkedin.com/in/bohdan-sheiko",
    url: "https://www.linkedin.com/in/bohdan-sheiko/",
    iconUrl: LinkedInIco,
  },
];

export const skillsJson: propType[] = [
  {
    name: "HTML/CSS/JS",
  },
  {
    name: "TypeScript",
  },
  {
    name: "React",
  },
  {
    name: "Vite",
  },
  {
    name: "BEM",
  },
  {
    name: "GIT",
  },
  {
    name: "CSS",
  },
  {
    name: "Preprocessors",
  },
];

const educationCoursesJson: propType[] = [
  {
    name: "English for Studying, Working, and Living Abroad (B2.2)",
  },
  {
    name: "Preparatory Technical English B1/B2",
  },
  {
    name: "Informatics & Programming",
  },
];

export const germanyCourseJson: ExperienceType = {
  header: "BIOPROCESS INFORMATICS",
  subHeader: "WEIHENSTEPHAN-TRIESDORF UNIVERSITY OF APPLIED SCIENCES",
  date: "09/2022 - 12/2022",
  place: "Germany (Online)",
  tasks: {
    name: "courses",
    list: educationCoursesJson,
  },
};

export const snauCourseJson: ExperienceType = {
  header: "ANIMAL SCIENCE, BACHELOR'S DEGREE",
  subHeader: "SUMY NATIONAL AGRARIAN UNIVERSITY",
  date: "09/2018 - 06/2022",
  place: "Sumy, Ukraine",
};

export const languagesJson: Language[] = [
  {
    language: "Ukrainian",
    level: "Native Proficiency",
  },
  {
    language: "English",
    level: "Professional Working Proficiency",
  },
];

export type Language = {
  language: string;
  level: string;
};

export type ExperienceType = {
  header: string;
  subHeader?: string;
  date: string;
  place: string;
  tasks?: {
    name: string;
    list: propType[];
  };
};
