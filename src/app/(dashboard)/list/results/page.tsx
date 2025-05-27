import Image from "next/image";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import FormModal from "@/components/FormModal";
import { Prisma } from "@/generated/prisma";

import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getRole, getUserId } from "@/lib/utils";

type ResultList = {
  id: number;
  title: string;
  studentName: string;
  studentSurname: string;
  teacherName: string;
  teacherSurname: string;
  score: number;
  className: string;
  startTime: Date;
};

export default async function LessonsListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { page, ...queryParams } = await searchParams;

  const queryPage = page ? parseInt(page) : 1;

  const role = await getRole();
  const currentUserId = await getUserId();

  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Student",
      accessor: "student",
    },
    {
      header: "Score",
      accessor: "score",
      className: "hidden md:table-cell",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    {
      header: "Class",
      accessor: "class",
      className: "hidden md:table-cell",
    },
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    ...(role === "admin" || role === "teacher"
      ? [
          {
            header: "Actions",
            accessor: "actions",
          },
        ]
      : []),
  ];

  const renderRow = (item: ResultList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>{`${item.studentName} ${item.studentSurname}`}</td>
      <td className="hidden md:table-cell">{item.score}</td>
      <td className="hidden md:table-cell">
        {`${item.teacherName} ${item.teacherSurname}`}
      </td>
      <td className="hidden md:table-cell">{item.className}</td>
      <td className="hidden md:table-cell">
        {item.startTime.toLocaleDateString()}
      </td>
      <td className="">
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormModal table="result" type="update" data={item} />
              <FormModal table="result" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  // URL PARAMS CONDITION

  const query: Prisma.ResultWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "studentId":
            query.studentId = value;
            break;

          case "search":
            {
              query.OR = [
                {
                  assignment: {
                    lesson: {
                      teacher: {
                        name: { contains: value, mode: "insensitive" },
                      },
                    },
                  },
                },
                {
                  assignment: {
                    lesson: {
                      teacher: {
                        surname: { contains: value, mode: "insensitive" },
                      },
                    },
                  },
                },
                {
                  exam: {
                    lesson: {
                      teacher: {
                        name: { contains: value, mode: "insensitive" },
                      },
                    },
                  },
                },
                {
                  exam: {
                    lesson: {
                      teacher: {
                        surname: { contains: value, mode: "insensitive" },
                      },
                    },
                  },
                },
                {
                  exam: {
                    title: {
                      contains: value,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  assignment: {
                    title: {
                      contains: value,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  student: {
                    name: { contains: value, mode: "insensitive" },
                  },
                },
                {
                  student: {
                    surname: { contains: value, mode: "insensitive" },
                  },
                },
              ];
            }
            break;
          default:
            break;
        }
      }
    }
  }

  // ROLE CONDITIONS

  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.OR = [
        { assignment: { lesson: { teacherId: currentUserId! } } },
        { exam: { lesson: { teacherId: currentUserId! } } },
      ];
      break;
    case "parent":
      query.student = {
        parentId: currentUserId!,
      };
      break;
    case "student":
      query.studentId = currentUserId!;
      break;

    default:
      break;
  }

  const [dataResp, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      include: {
        assignment: {
          include: {
            lesson: {
              select: {
                teacher: { select: { name: true, surname: true } },
                class: { select: { name: true } },
              },
            },
          },
        },
        exam: {
          include: {
            lesson: {
              select: {
                teacher: { select: { name: true, surname: true } },
                class: { select: { name: true } },
              },
            },
          },
        },
        student: { select: { name: true, surname: true } },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (queryPage - 1),
    }),
    prisma.result.count({ where: query }),
  ]);

  const data = dataResp.map((item) => {
    const assessment = item.exam || item.assignment;

    if (!assessment) return null;
    const isExam = "startTime" in assessment;

    return {
      id: item.id,
      title: assessment.title,
      studentName: item.student.name,
      studentSurname: item.student.surname,
      teacherName: assessment.lesson.teacher.name,
      teacherSurname: assessment.lesson.teacher.surname,
      score: item.score,
      className: assessment.lesson.class.name,
      startTime: isExam ? assessment.startTime : assessment.startDate,
    };
  });

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold md:block">All Results</h1>
        <div className="flex flex-col md:flex-row items-center gap-4  w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow cursor-pointer hover:bg-lamaYellowLight active:scale-95">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow cursor-pointer hover:bg-lamaYellowLight active:scale-95">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {(role === "admin" || role === "teacher") && (
              <FormModal table="result" type="create" />
            )}
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
