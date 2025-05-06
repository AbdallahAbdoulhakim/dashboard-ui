export default function Pagination() {
  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled
        className="py-2 px-4 cursor-pointer rounded-md bg-slate-200 hover:bg-slate-400 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        <button className="px-2 cursor-pointer rounded-sm hover:bg-lamaSkyLight bg-lamaSky active:scale-95">
          1
        </button>
        <button className="px-2 cursor-pointer rounded-sm hover:bg-lamaSkyLight active:scale-95">
          2
        </button>
        <button className="px-2 cursor-pointer rounded-sm hover:bg-lamaSkyLight active:scale-95">
          3
        </button>
        ...
        <button className="px-2 cursor-pointer rounded-sm hover:bg-lamaSkyLight active:scale-95">
          10
        </button>
      </div>
      <button className="py-2 px-4 cursor-pointer rounded-md bg-slate-200 hover:bg-slate-400 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed active:scale-95">
        Next
      </button>
    </div>
  );
}
