import React, { useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export const LookupTable = ({ open, onClose, onSelect, data, columns }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleSelect = () => {
    onSelect(selectedRow);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select a Row</DialogTitle>
      <DialogContent>
        <MaterialReactTable
          columns={columns}
          data={data}
          enableRowSelection={false} // Disable checkboxes
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => {
              onSelect(row.original, row.id);
            },
            sx: {
              cursor: "pointer", //you might want to change the cursor too when adding an onClick
            },
          })}
          initialState={{
            showGlobalFilter: true, //show the global filter by default
          }}
          positionGlobalFilter="left" //show the global filter on the left side of the top toolbar
          muiSearchTextFieldProps={{
            size: "small",
            autoFocus: true,
            autoComplete: "off",
            onKeyDown: (e) => {
              if ((e.key === "Tab" && !e.shiftKey) || e.key === "ArrowDown") {
                e.preventDefault();
                if (document.querySelector(`[id='0']`)) {
                  document.querySelector(`[id='0']`).focus();
                }
              }
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSelect} color="primary" disabled={!selectedRow}>
          Select
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const PopupModel = () => {
  const [lookupOpen, setLookupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const data = [
    { id: 1, name: "Item A", category: "Category 1" },
    { id: 2, name: "Item B", category: "Category 2" },
    { id: 3, name: "Item C", category: "Category 3" },
    { id: 4, name: "Item D", category: "Category 1" },
  ];

  const handleOpenLookup = () => {
    setLookupOpen(true);
  };

  const handleCloseLookup = () => {
    setLookupOpen(false);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setLookupOpen(false);
  };

  return (
    <div>
      <TextField
        label="Selected Item"
        value={
          selectedItem ? `${selectedItem.name} (${selectedItem.category})` : ""
        }
        fullWidth
        disabled
      />
      <Button onClick={handleOpenLookup} variant="contained">
        Open Lookup
      </Button>

      <LookupTable
        open={lookupOpen}
        onClose={handleCloseLookup}
        onSelect={handleSelectItem}
        data={data}
      />
    </div>
  );
};

// export default PopupModel;
