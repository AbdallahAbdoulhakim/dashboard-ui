"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  name: z.string().min(2, {
    message: "Subject name must be at least 2 characters long!",
  }),
  teachers: z.string().min(2, {
    message: "Teachers name must be at least 2 characters long!",
  }),
});

type Inputs = z.infer<typeof schema>;

export default function SubjectForm({
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
        {type === "create" ? "Create a new Subject" : "Update Subject"}
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
          label="Teachers"
          name="teachers"
          defaultValue={data?.teachers?.join(",")}
          register={register}
          error={errors.teachers}
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
