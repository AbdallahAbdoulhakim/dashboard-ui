"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  name: z
    .string()
    .min(2, { message: "Class must be at least 2 characters long! " })
    .regex(/^[1-9]{1,3}[A-Z]{1}$/, {
      message: "Invalid class format! ",
    }),
  capacity: z
    .string()
    .regex(/^\d{1,2}$/, { message: "Incorrect capacity format!" }),

  grade: z.string().regex(/^\d{1,2}$/, { message: "Incorrect grade format!" }),

  supervisor: z.string().min(5, { message: "Supervisor name is required!" }),
});

type Inputs = z.infer<typeof schema>;

export default function ClassForm({
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
        {type === "create" ? "Create a new Class" : "Update Class"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />

        <InputField
          label="Capacity"
          name="capacity"
          type="number"
          defaultValue={data?.capacity}
          register={register}
          error={errors.capacity}
        />

        <InputField
          label="grade"
          name="grade"
          type="number"
          defaultValue={data?.grade}
          register={register}
          error={errors.grade}
        />

        <InputField
          label="Supervisor"
          name="supervisor"
          defaultValue={data?.supervisor}
          register={register}
          error={errors.supervisor}
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
