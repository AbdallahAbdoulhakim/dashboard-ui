import EventCalendar from "./EventCalendar";
import EventList from "./EventList";

export default async function EventCalendarContainer({
  dateParam,
}: {
  dateParam: string;
}) {
  return (
    <div className="bg-white p-4 rounded-md">
      <EventCalendar />
      <EventList dateParam={dateParam} />
    </div>
  );
}
