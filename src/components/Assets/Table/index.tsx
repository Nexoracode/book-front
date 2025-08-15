type TableHeader = {
  label: string;
  key: string;
};

type TableRow = {
  id: number;
  [key: string]: string | React.ReactNode;
};
type TableProps = {
  headers: TableHeader[];
  data: TableRow[];
};
export default function Table(props: TableProps) {
  const { headers, data } = props;
  return (
    <div className="maw-w-full overflow-x-scroll">
      <table className="table-auto min-w-[980px] w-full">
        <thead>
          <tr className="border-b border-hgray-300">
            {headers.map((item) => (
              <th
                className="text-sm text-hgray-600 font-semibold p-2 py-4"
                key={item.key}
              >
                {item.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr
              className="border-b odd:bg-hgray-200 border-hgray-350"
              key={row.id}
            >
              {headers.map((col) => (
                <td className="text-sm text-hgray-500 p-2" key={col.key}>
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
