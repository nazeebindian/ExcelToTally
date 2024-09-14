import { Button } from "@mui/material";
import ExcelToXmlViewModel from "./excelToXml.vm";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
    <div style={{ display: "grid" }}>
      <h1>Excel to xml</h1>
      <Button
        variant="contained"
        sx={{ m: 5 }}
        // onClick={() => {
        //   FileUpload();
        // }}
      >
        Upload excel file
      </Button>
      <input
        type="file"
        onChange={(e) => {
          vm?.handleFileUpload(e);
        }}
      />
      {vm?.selectedFile && <p>Selected file: {vm?.selectedFile.name}</p>}
      <Button
        variant="contained"
        sx={{ m: 5 }}
        disabled={vm?.jsonData?.length < 2}
        onClick={() => {
          vm?.jsonToXml(vm?.jsonData);
        }}
      >
        Convert to tally xml file
      </Button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Controlled picker"
          value={vm?.date}
          onChange={(newValue) => vm?.setDate(newValue)}
        />
      </LocalizationProvider>
      {vm?.xmlOutPut && (
        <Button onClick={() => vm?.xmlOutPut?.click()} download="file.xml">
          Download
        </Button>
      )}
    </div>
  );
};
export default ExcelToXml;
