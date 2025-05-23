import Image from "next/image";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { role } from "@/lib/data";
import FormModal from "@/components/FormModal";
import {
  Assignment,
  Prisma,
  Subject,
  Teacher,
  Class,
} from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";

type AssignmentList = Assignment & {
  lesson: Assignment & { subject: Subject } & { teacher: Teacher } & {
    class: Class;
  };
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Due Date",
    accessor: "duDate",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const renderRow = (item: AssignmentList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
    <td>{item.lesson.class.name}</td>
    <td className="hidden md:table-cell">{`${item.lesson.teacher.name} ${item.lesson.teacher.surname}`}</td>
    <td className="hidden md:table-cell">
      {item.dueDate.toLocaleDateString()}
    </td>
    <td className="">
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="assignment" type="update" data={item} />
            <FormModal table="assignment" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);
export default async function AssignmentsListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page, ...queryParams } = await searchParams;

  const queryPage = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.AssignmentWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lesson = { classId: parseInt(value) };
            break;
          case "teacherId":
            query.lesson = { teacherId: value };
            break;
          case "search": {
            query.OR = [
              {
                lesson: {
                  teacher: {
                    name: { contains: value, mode: "insensitive" },
                  },
                },
              },
              {
                lesson: {
                  teacher: {
                    surname: { contains: value, mode: "insensitive" },
                  },
                },
              },
              {
                lesson: {
                  subject: {
                    name: { contains: value, mode: "insensitive" },
                  },
                },
              },
            ];
          }
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            name: true,
            teacher: { select: { name: true, surname: true } },
            subject: { select: { name: true } },
            class: { select: { name: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (queryPage - 1),
    }),
    prisma.assignment.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold md:block">
          All Assignments
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4  w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow cursor-pointer hover:bg-lamaYellowLight active:scale-95">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow cursor-pointer hover:bg-lamaYellowLight active:scale-95">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="assignment" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={queryPage} count={count} />
    </div>
  );
}
