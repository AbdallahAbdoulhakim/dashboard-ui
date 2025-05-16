"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at maximum 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long! " })
    .max(32, "The password must be a maximum 32 characters long!")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/,
      {
        message:
          "Password must contains uppercase, lowercase, number and numeric characters! ",
      }
    ),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthDate: z
    .string()
    .regex(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/, {
      message: "Incorrect date format!",
    }),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  img: z.instanceof(File, { message: "Image is required!" }),
});

type Inputs = z.infer<typeof schema>;

export default function StudentForm({
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
        {type === "create" ? "Create a new student" : "Update Student"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors.username}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          defaultValue={data?.email}
          register={register}
          error={errors.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors.password}
        />
      </div>

      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          name="firstName"
          defaultValue={data?.firstName}
          register={register}
          error={errors.firstName}
        />

        <InputField
          label="Last Name"
          name="lastName"
          defaultValue={data?.lastName}
          register={register}
          error={errors.lastName}
        />

        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />

        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />

        <InputField
          label="Blood Type"
          name="bloodType"
          defaultValue={data?.bloodType}
          register={register}
          error={errors.bloodType}
        />

        <InputField
          label="Birth Date"
          name="birthDate"
          type="date"
          defaultValue={data?.birthDate}
          register={register}
          error={errors.birthDate}
        />

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500" htmlFor="">
            Sex
          </label>

          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            type={type}
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex?.message.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" width={28} height={28} alt="" />
            <span>Upload a photo</span>
          </label>

          <input className="hidden" id="img" type="file" />

          {errors.img?.message && (
            <p className="text-xs text-red-400">
              {errors.img?.message.toString()}
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
