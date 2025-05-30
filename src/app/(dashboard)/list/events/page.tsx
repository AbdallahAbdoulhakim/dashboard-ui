import Image from "next/image";
import TableSearch from "@/components/TableSearch";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import FormModal from "@/components/FormModal";
import { Prisma, Event, Class } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { getRole, getUserId } from "@/lib/utils";

type EventList = Event & { class: Class };

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
      header: "Class",
      accessor: "class",
    },
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    {
      header: "Start Time",
      accessor: "startTime",
      className: "hidden md:table-cell",
    },
    {
      header: "End Time",
      accessor: "endTime",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "actions",
          },
        ]
      : []),
  ];

  const renderRow = (item: EventList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>{item?.class?.name || "-"}</td>
      <td className="hidden md:table-cell">
        {item.startTime.toLocaleDateString()}
      </td>
      <td className="hidden md:table-cell">
        {item.startTime.toLocaleTimeString()}
      </td>
      <td className="hidden md:table-cell">
        {item.endTime.toLocaleTimeString()}
      </td>
      <td className="">
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="event" type="update" data={item} />
              <FormModal table="event" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  // URL PARAMS CONDITION

  const query: Prisma.EventWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.classId = parseInt(value);
            break;

          case "search": {
            query.OR = [
              {
                class: {
                  name: { contains: value, mode: "insensitive" },
                },
              },
              {
                title: { contains: value, mode: "insensitive" },
              },
              {
                description: { contains: value, mode: "insensitive" },
              },
            ];
          }
        }
      }
    }
  }

  // ROLE CONDITIONS

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: currentUserId! } } },
    student: { students: { some: { id: currentUserId! } } },
    parent: { students: { some: { parentId: currentUserId! } } },
  };

  if (role !== "admin") {
    query.OR = [
      { classId: null },
      { class: roleConditions[role as keyof typeof roleConditions] || {} },
    ];
  }

  const [data, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: query,
      include: {
        class: {
          select: {
            name: true,
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (queryPage - 1),
    }),
    prisma.event.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden text-lg font-semibold md:block">All Events</h1>
        <div className="flex flex-col md:flex-row items-center gap-4  w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow cursor-pointer hover:bg-lamaYellowLight active:scale-95">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow cursor-pointer hover:bg-lamaYellowLight active:scale-95">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="event" type="create" />}
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
