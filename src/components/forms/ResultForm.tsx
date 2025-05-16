"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  subject: z.string().min(2, {
    message: "Subject title must be at least 2 characters long!",
  }),
  class: z
    .string()
    .min(2, { message: "Class must be at least 2 characters long! " })
    .regex(/^[1-9]{1,3}[A-Z]{1}$/, {
      message: "Invalid class format! ",
    }),
  teacher: z.string().min(2, {
    message: "Teacher name must be at least 2 characters long!",
  }),
  student: z.string().min(2, {
    message: "Student name must be at least 2 characters long!",
  }),
  date: z.string().regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/, {
    message: "Incorrect date format!",
  }),
  type: z.enum(["exam", "continuous assessment", "lab work"], {
    message: "Type is required!",
  }),
});

type Inputs = z.infer<typeof schema>;

export default function ResultForm({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new Result" : "Update Result"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Subject"
          name="subject"
          defaultValue={data?.subject}
          register={register}
          error={errors.subject}
        />

        <InputField
          label="Class"
          name="class"
          defaultValue={data?.class}
          register={register}
          error={errors.class}
        />

        <InputField
          label="Teacher Name"
          name="teacher"
          defaultValue={data?.teacher}
          register={register}
          error={errors.teacher}
        />

        <InputField
          label="Student Name"
          name="teacher"
          defaultValue={data?.student}
          register={register}
          error={errors.student}
        />

        <InputField
          label="Date"
          name="date"
          type="date"
          defaultValue={data?.date}
          register={register}
          error={errors.date}
        />

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500" htmlFor="">
            Type
          </label>

          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("type")}
            defaultValue={data?.type}
          >
            <option value="exam">Exam</option>
            <option value="continuous assessment">Continuous Assessment</option>
            <option value="lab work">Lab Work</option>
          </select>
          {errors.type?.message && (
            <p className="text-xs text-red-400">
              {errors.type?.message.toString()}
            </p>
          )}
        </div>
      </div>

      <button
        className="bg-blue-400 text-white p rounded-md cursor-pointer p-2"
        type="submit"
      >
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}
