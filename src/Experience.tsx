import { ExperienceType } from "./lib/profile";
import DateAndPlace from "./DateAndPlace";
import BubbleList from "./BubbleList";

const Experience: React.FC<{ json: ExperienceType }> = (prop) => {
  return (
    <div className="mb-2 rounded-lg border border-solid px-1">
      <h3>{prop.json.header}</h3>
      {prop.json.subHeader ? <h4>{prop.json.subHeader}</h4> : ""}

      <DateAndPlace
        date={prop.json.date}
        place={prop.json.place}
      ></DateAndPlace>
      {prop.json.tasks ? (
        <div>
          <p className="text-base italic text-gray-400">
            {prop.json.tasks.name}
          </p>
          <BubbleList prop={prop.json.tasks.list}></BubbleList>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Experience;
