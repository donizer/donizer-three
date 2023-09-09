const DateAndPlace = (prop: { date: string; place: string }) => {
  return (
    <div className="flex justify-between">
      <p className="text-base italic text-gray-400">{prop.date}</p>
      <p className="text-base italic text-gray-400">{prop.place}</p>
    </div>
  );
};

export default DateAndPlace;
