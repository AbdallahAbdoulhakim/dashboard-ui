"use client";
import Image from "next/image";
import { useState } from "react";
import TeacherForm from "./forms/TeacherForm";

export default function FormModal({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}) {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" && id ? (
      <form className="p-4 flex flex-col gap-4" action="">
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table} ?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center cursor-pointer active:scale-95 hover:bg-red-600">
          Yes, Delete
        </button>
      </form>
    ) : (
      <TeacherForm type="create" />
    );
  };

  return (
    <>
      <button
        className={`${size} ${bgColor} flex items-center justify-center rounded-full cursor-pointer active:scale-95`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>

      {open && (
        <div className="w-screen h-screen overflow-y-auto overflow-x-hidden absolute left-0 top-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative opacity-100 w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image
                className=""
                src="/close.png"
                alt=""
                width={14}
                height={14}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
