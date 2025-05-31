import { prisma } from "@/lib/prisma";
import AttendanceChart from "./AttendanceChart";
import Image from "next/image";

export default async function AttendanceChartContainer() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 7 : dayOfWeek;

  const lastSunday = new Date();
  lastSunday.setDate(today.getDate() - daysSinceMonday);

  const respData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastSunday,
      },
    },
    select: {
      date: true,
      present: true,
    },
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const attendanceMap: { [key: string]: { present: number; absent: number } } =
    {
      Mon: {
        present: 0,
        absent: 0,
      },
      Tue: {
        present: 0,
        absent: 0,
      },
      Wed: {
        present: 0,
        absent: 0,
      },
      Thu: {
        present: 0,
        absent: 0,
      },
      Fri: {
        present: 0,
        absent: 0,
      },
    };

  respData.forEach((item) => {
    const itemDate = new Date(item.date);
    const dOfWeek = itemDate.getDay();

    if (dOfWeek >= 1 && dOfWeek <= 5) {
      const dayName = daysOfWeek[dOfWeek - 1];

      if (item.present) {
        attendanceMap[dayName].present += 1;
      } else {
        attendanceMap[dayName].absent += 1;
      }
    }
  });

  const data = daysOfWeek.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));

  return (
    <div className="bg-white rounded-lg p-4 h-full">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* CHART */}
      <AttendanceChart data={data} />
    </div>
  );
}
