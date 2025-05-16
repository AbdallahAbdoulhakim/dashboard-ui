import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import Performance from "@/components/Performance";
import Image from "next/image";
import Link from "next/link";
import FormModal from "@/components/FormModal";

export default function SingleStudentPage() {
  return (
    <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="">
          {/* TOP */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* USER INFO CARD */}
            <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
              <div className="w-1/3">
                <Image
                  className="w-36 h-36 rounded-full object-cover"
                  src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt=""
                  width={144}
                  height={144}
                />
              </div>
              <div className="w-2/3 flex flex-col justify-between gap-4">
                <div className="flex items-center gap-4">
                  <h1 className="text-xl font-semibold">Cameron Moran</h1>
                  <FormModal
                    table="student"
                    type="update"
                    data={{
                      id: 1,
                      username: "deanguerrero",
                      email: "deanguerrero@gmail.com",
                      password: "password",
                      firstName: "Dean",
                      lastName: "Guerrero",
                      phone: "+1 234 567 89",
                      address: "1234 Main St, Antown, USA",
                      bloodType: "A+",
                      birthDate: "2000-01-01",
                      sex: "male",
                      img: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1200",
                    }}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Minus, nam.
                </p>
                <div className="flex items-center justify-between gap-2 2xl:gap-1 flex-wrap text-xs font-medium">
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 2xl:text-[10px] flex items-center gap-2">
                    <Image src="/blood.png" alt="" width={14} height={14} />
                    <span>A+</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 2xl:text-[10px] flex items-center gap-2">
                    <Image src="/date.png" alt="" width={14} height={14} />
                    <span>Jan 2025</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 2xl:text-[10px] flex items-center gap-2">
                    <Image src="/mail.png" alt="" width={14} height={14} />
                    <span>user@gmail.com</span>
                  </div>
                  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 2xl:text-[10px] flex items-center gap-2">
                    <Image src="/phone.png" alt="" width={14} height={14} />
                    <span>+1 234 567</span>
                  </div>
                </div>
              </div>
            </div>
            {/* SMALL CARDS */}
            <div className="flex-1 flex gap-4 justify-between flex-wrap">
              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%]  lg:w-[45%]">
                <Image
                  className="w-6 h-6"
                  src="/singleAttendance.png"
                  alt=""
                  width={24}
                  height={24}
                />
                <div className="">
                  <h1 className="text-xl font-semibold">94%</h1>
                  <span className="text-sm text-gray-400">Attendance</span>
                </div>
              </div>

              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%]  lg:w-[45%]">
                <Image
                  className="w-6 h-6"
                  src="/singleBranch.png"
                  alt=""
                  width={24}
                  height={24}
                />
                <div className="">
                  <h1 className="text-xl font-semibold">6th</h1>
                  <span className="text-sm text-gray-400">Grade</span>
                </div>
              </div>

              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%]  lg:w-[45%]">
                <Image
                  className="w-6 h-6"
                  src="/singleLesson.png"
                  alt=""
                  width={24}
                  height={24}
                />
                <div className="">
                  <h1 className="text-xl font-semibold">18</h1>
                  <span className="text-sm text-gray-400">Lessons</span>
                </div>
              </div>

              {/* CARD */}
              <div className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%]  lg:w-[45%]">
                <Image
                  className="w-6 h-6"
                  src="/singleClass.png"
                  alt=""
                  width={24}
                  height={24}
                />
                <div className="">
                  <h1 className="text-xl font-semibold">6A</h1>
                  <span className="text-sm text-gray-400">Class Name</span>
                </div>
              </div>
            </div>
          </div>
          {/* BOTTOM */}
          <div className="mt-4 bg-white rounded-md p-4 g-[800px]">
            <h1 className="">Student&apos;s Schedule</h1>
            <BigCalendar />
          </div>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-2 flex-wrap text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-lamaSkyLight" href="/">
              Lessons
            </Link>
            <Link className="p-3 rounded-md bg-lamaPurpleLight" href="/">
              Teachers
            </Link>
            <Link className="p-3 rounded-md bg-lamaYellowLight" href="/">
              Results
            </Link>
            <Link className="p-3 rounded-md bg-pink-50" href="/">
              Exams
            </Link>
            <Link className="p-3 rounded-md bg-lamaSkyLight" href="/">
              Assignments
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
}
