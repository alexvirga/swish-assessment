import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "./styles.css";
import { CombinedData } from "../interfaces";

interface Props {
  combinedData: CombinedData[];
  toggleLock: (row: CombinedData) => void;
}

const TanTable = ({ combinedData, toggleLock }: Props) => {
  const columnHelper = createColumnHelper<CombinedData>();
  const columns = [
    columnHelper.accessor("playerName", {
      cell: (info) => info.getValue(),
      header: () => <span>Player Name</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("teamNickname", {
      id: "teamNickname",
      cell: (info) => info.getValue(),
      header: () => <span>Team</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("position", {
      id: "position",
      cell: (info) => info.getValue(),
      header: () => <span>Position</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("statType", {
      id: "statType",
      cell: (info) => info.getValue(),
      header: () => <span>Stat</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("line", {
      cell: (info) => info.getValue(),
      header: () => <span>Line</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("lowLine", {
      cell: (info) => info.getValue(),
      header: () => <span>Low Line</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("highLine", {
      cell: (info) => info.getValue(),
      header: () => <span>High Line</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("marketSuspended", {
      cell: (info) => (info.getValue() === 1 ? "Yes" : "No"),
      header: () => <span>Market Suspended</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("alternateOverOdds", {
      cell: (info) => info.getValue(),
      header: () => <span>Over</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("alternateUnderOdds", {
      cell: (info) => info.getValue(),
      header: () => <span>Under</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("alternatePushOdds", {
      cell: (info) => info.getValue(),
      header: () => <span>Push</span>,
      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    data: combinedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={"table-header"}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={row.original.marketSuspended ? "suspended-row" : "row"}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td>
                {row.original.marketSuspended ? (
                  <button
                    onClick={() => toggleLock(row.original)}
                    className="toggleButton"
                  >
                    Unlock
                  </button>
                ) : (
                  <button
                    onClick={() => toggleLock(row.original)}
                    className="toggleButton"
                  >
                    Lock
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TanTable;
