import { Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DataList } from "./dataList";
import excelFile from "./excel-template.xlsx"

const downloadExcel = () => {
  const link = document.createElement('a');
  link.href = excelFile;
  link.download = 'report.xlsx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const ExcelToXml = (props) => {
  const { vm } = props;
  const FileUpload = () => (
    <div style={{ position: "absolute" }}>
      <input
        type="file"
        onChange={() => {
          vm?.handleFileUpload();
        }}
      />
    </div>
  );
  return (
    <div>
      <div
        style={{
          width: "30%",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <h1>Excel to xml</h1>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            format="DD-MM-YYYY"
            value={vm?.date || null}
            onChange={(newValue) => vm?.setDate(newValue)}
          />
        </LocalizationProvider>
        <div style={{ height: "20px" }} />
        <Button
          variant="contained"
          onClick={downloadExcel}>Download Excel</Button>

        <div style={{ height: "20px" }} />
        <input
          type="file"
          onChange={(e) => {
            vm?.handleFileUpload(e);
          }}
        />
        <Button
          variant="contained"
          sx={{ my: 5 }}
          fullWidth
          disabled={vm?.jsonData?.length < 1}
          onClick={() => {
            vm?.jsonToXml(vm?.jsonData);
          }}
        >
          Convert to tally xml file
        </Button>
        {vm?.xmlOutPut && (
          <Button onClick={() => vm?.xmlOutPut?.click()} download="file.xml">
            Download
          </Button>
        )}
      </div>
      <DataList vm={vm} />

    </div>
  );
};
export default ExcelToXml;
