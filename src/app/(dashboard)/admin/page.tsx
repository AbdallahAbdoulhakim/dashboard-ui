import Announcements from "@/components/Announcements";
import CountCharContainer from "@/components/CountCharContainer";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [keys: string]: string }>;
}) {
  const params = await searchParams;

  const dateParam = params?.date;
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="admin" />
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountCharContainer />
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChartContainer />
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendarContainer dateParam={dateParam} />
        <Announcements />
      </div>
    </div>
  );
}
