"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  subject: z.string().min(2, {
    message: "Subject name must be at least 2 characters long!",
  }),
  class: z
    .string()
    .min(2, { message: "Class must be at least 2 characters long! " })
    .regex(/^[1-9]{1,3}[A-Z]{1}$/, {
      message: "Invalid class format! ",
    }),
  teacher: z.string().min(2, {
    message: "Teacher name is required!",
  }),
  dueDate: z
    .string()
    .regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/, {
      message: "Incorrect date format!",
    }),
});

type Inputs = z.infer<typeof schema>;

export default function AssignmentForm({
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
        {type === "create" ? "Create a new Assignment" : "Update Assignment"}
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
          label="Teacher"
          name="teacher"
          defaultValue={data?.teacher}
          register={register}
          error={errors.teacher}
        />

        <InputField
          label="Due Date"
          name="dueDate"
          type="date"
          defaultValue={data?.dueDate}
          register={register}
          error={errors.dueDate}
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
