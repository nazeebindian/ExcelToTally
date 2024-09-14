import { Autocomplete, Table, TextField } from "@mui/material";
import Virtualize from "./autocompleteVirtualization";

export const DataList = (props) => {
  const { vm } = props;

  return (
    <Table style={{ borderCollapse: "collapse", border: "1px solid black" }}>
      <tr>
        {Object.keys(vm?.jsonData?.[0])?.map((col) => (
          <th style={{ borderCollapse: "collapse", border: "1px solid black" }}>
            {col}
          </th>
        ))}
      </tr>
      {vm?.jsonData?.map((row, i) => (
        <tr>
          {Object.keys(row)?.map((col) => (
            <td
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              {/* <Autocomplete value={row?.[col]} /> */}
              {col === "LEDGER" ? (
                <Virtualize
                  optionsArray={[...vm?.ledgerList]}
                  value={row?.[col] || ""}
                  onChange={(e) => {
                    const list = [...vm?.jsonData];
                    const listRow = { ...list?.[i] };
                    listRow[col] = e?.target?.textContent || "";
                    list[i] = listRow;
                    vm?.setJasonData(list);
                  }}
                />
              ) : (
                <TextField
                  size="small"
                  value={row?.[col] || ""}
                  onChange={(e) => {
                    const list = [...vm?.jsonData];
                    const listRow = { ...list?.[i] };
                    listRow[col] = e?.target?.value || "";
                    list[i] = listRow;
                    vm?.setJasonData(list);
                  }}
                />
              )}
            </td>
          ))}
        </tr>
      ))}
    </Table>
  );
};
