import { IconButton, InputAdornment, Table, TextField } from "@mui/material";
import Virtualize from "./autocompleteVirtualization";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { LookupTable } from "./popupModal";

export const DataList = (props) => {
  const { vm } = props;
  const columns = [
    { header: "Ledger", accessorKey: "DESC_ENG" },
    { header: "Balance", accessorKey: "BALANCE" },
  ];
  return (
    <Table style={{ borderCollapse: "collapse", border: "1px solid black" }}>
      <tr>
        {Object.keys(vm?.jsonData?.[0])
          ?.filter((item) => item === "LEDGER" || item === "AMOUNT")
          ?.map((col) => (
            <th
              style={{ borderCollapse: "collapse", border: "1px solid black" }}
            >
              {col}
            </th>
          ))}
      </tr>
      {vm?.jsonData?.map((row, i) => (
        <tr>
          {Object.keys(row)?.map((col, ind) => (
            <>
              {col === "LEDGER" && (
                <td
                  style={{
                    borderCollapse: "collapse",
                    border: "1px solid black",
                    minWidth: "500px",
                  }}
                >
                  <Virtualize
                    id={`ID-${col}${i}`}
                    optionsArray={[...vm?.ledgerList]}
                    value={row?.[col] || ""}
                    onChange={(e) => {
                      const list = [...vm?.jsonData];
                      const listRow = { ...list?.[i] };
                      listRow[col] =
                        e?.target?.textContent?.split("- ")?.[1] || "";
                      list[i] = listRow;
                      vm?.setJasonData(list);
                    }}
                    onKeyUp={(e) => {
                      if (e?.code === "Enter") {
                        const list = [...vm?.jsonData];
                        const listRow = { ...list?.[i] };
                        listRow[col] = e?.target?.value || "";
                        list[i] = listRow;
                        vm?.setJasonData(list);
                        if (i !== vm?.jsonData?.length - 1) {
                          document.getElementById(`ID-${col}${i + 1}`).focus();
                        }
                      } else if (e?.code === "ShiftRight" && i !== 0) {
                        document.getElementById(`ID-${col}${i - 1}`).focus();
                      } else if (e?.code === "ArrowLeft" && ind !== 0) {
                        document
                          .getElementById(
                            `ID-${Object.keys(row)?.[ind - 1]}${i}`
                          )
                          .focus();
                      } else if (
                        e?.code === "ArrowRight" &&
                        ind !== Object.keys(row)?.length - 1
                      ) {
                        document
                          .getElementById(
                            `ID-${Object.keys(row)?.[ind + 1]}${i}`
                          )
                          .focus();
                      }
                    }}
                  />
                  {/* <TextField
                    fullWidth
                    value={row?.[col] || ""}
                    onKeyUp={(e) => {
                      if (e?.code === "Enter") {
                        const list = [...vm?.jsonData];
                        const listRow = { ...list?.[i] };
                        listRow[col] = e?.target?.value || "";
                        list[i] = listRow;
                        vm?.setJasonData(list);
                        if (i !== vm?.jsonData?.length - 1) {
                          document.getElementById(`ID-${col}${i + 1}`).focus();
                        }
                      } else if (e?.code === "ShiftRight" && i !== 0) {
                        document.getElementById(`ID-${col}${i - 1}`).focus();
                      } else if (e?.code === "ArrowLeft" && ind !== 0) {
                        document
                          .getElementById(
                            `ID-${Object.keys(row)?.[ind - 1]}${i}`
                          )
                          .focus();
                      } else if (
                        e?.code === "ArrowRight" &&
                        ind !== Object.keys(row)?.length - 1
                      ) {
                        document
                          .getElementById(
                            `ID-${Object.keys(row)?.[ind + 1]}${i}`
                          )
                          .focus();
                      }
                    }}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => {
                                vm?.setLookupOpen(true);
                              }}
                            >
                              <UnfoldMoreIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  <LookupTable
                    columns={columns}
                    open={vm?.lookupOpen}
                    onClose={() => {
                      vm?.setLookupOpen(false);
                    }}
                    onSelect={(row, index) => {
                      const list = [...vm?.jsonData];
                      const listRow = { ...list?.[i] };
                      listRow[col] = row?.DESC_ENG;

                      list[i] = listRow;
                      vm?.setJasonData(list);
                      console.log("===", row);
                      vm?.setLookupOpen(false);
                    }}
                    data={vm?.trialBalances}
                  /> */}
                </td>
              )}
              {col === "AMOUNT" && (
                <td
                  style={{
                    borderCollapse: "collapse",
                    border: "1px solid black",
                  }}
                >
                  <TextField
                    fullWidth
                    id={`ID-${col}${i}`}
                    size="small"
                    value={row?.[col] || ""}
                    onKeyUp={(e) => {
                      if (
                        e?.code === "Enter" &&
                        i !== vm?.jsonData?.length - 1
                      ) {
                        document.getElementById(`ID-${col}${i + 1}`).focus();
                      } else if (e?.code === "ArrowUp" && i !== 0) {
                        document.getElementById(`ID-${col}${i - 1}`).focus();
                      } else if (
                        e?.code === "ArrowDown" &&
                        i !== vm?.jsonData?.length - 1
                      ) {
                        document.getElementById(`ID-${col}${i + 1}`).focus();
                      } else if (e?.code === "ArrowLeft" && ind !== 0) {
                        document
                          .getElementById(
                            `ID-${Object.keys(row)?.[ind - 1]}${i}`
                          )
                          .focus();
                      } else if (
                        e?.code === "ArrowRight" &&
                        ind !== Object.keys(row)?.length - 1
                      ) {
                        document
                          .getElementById(
                            `ID-${Object.keys(row)?.[ind + 1]}${i}`
                          )
                          .focus();
                      }
                    }}
                    onChange={(e) => {
                      const list = [...vm?.jsonData];
                      const listRow = { ...list?.[i] };
                      listRow[col] = e?.target?.value || "";
                      list[i] = listRow;
                      vm?.setJasonData(list);
                    }}
                  />
                </td>
              )}
            </>
          ))}
        </tr>
      ))}
    </Table>
  );
};
