"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  title: z.string().min(10, {
    message: "Announcement title must be at least 10 characters long!",
  }),
  class: z
    .string()
    .min(2, { message: "Class must be at least 2 characters long! " })
    .regex(/^[1-9]{1,3}[A-Z]{1}$/, {
      message: "Invalid class format! ",
    }),
  date: z.string().regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/, {
    message: "Incorrect date format!",
  }),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Incorrect date format!",
  }),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Incorrect date format!",
  }),
});

type Inputs = z.infer<typeof schema>;

export default function AnnouncementForm({
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
        {type === "create"
          ? "Create a new Announcement"
          : "Update Announcement"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors.title}
        />

        <InputField
          label="Class"
          name="class"
          defaultValue={data?.class}
          register={register}
          error={errors.class}
        />

        <InputField
          label="Date"
          name="date"
          type="date"
          defaultValue={data?.date}
          register={register}
          error={errors.date}
        />

        <InputField
          label="Start Time"
          name="startTime"
          type="time"
          defaultValue={data?.startTime}
          register={register}
          error={errors.startTime}
        />
        <InputField
          label="End Time"
          name="endTime"
          type="time"
          defaultValue={data?.endTime}
          register={register}
          error={errors.endTime}
        />
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
