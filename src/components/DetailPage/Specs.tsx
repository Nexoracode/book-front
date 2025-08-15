import Paper from "../Assets/Paper";

const items = [
  {
    label: "رده سنی",
    value: "عمومی",
  },
  {
    label: "صفحات",
    value: "۲۱۶",
  },
  {
    label: "قالب",
    value: "داستان",
  },
  {
    label: "وزن",
    value: "۲۱۰ گرم",
  },
  {
    label: "نوع جلد",
    value: "شومیز",
  },
  {
    label: "شابک",
    value: "9786228127590",
  },
];
export default function Specs({
  bookItems,
}: {
  bookItems?: Array<{ label: string; value: string }>;
}) {
  return (
    <div>
      <Paper className="max-w-md">
        <div className="flex gap-3 flex-wrap">
          {(bookItems ?? items).map((item) => (
            <p className="w-full md:w-[calc(50%-6px)] p-1 flex justify-between">
              <span className="inline-block text-neutral-800 text-sm font-semibold">
                {item.label}
              </span>
              <span className="inline-block text-neutral-500 text-sm font-light">
                {item.value}
              </span>
            </p>
          ))}
        </div>
      </Paper>
    </div>
  );
}
