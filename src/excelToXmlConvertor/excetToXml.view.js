import { Button } from "@mui/material";
import ExcelToXmlViewModel from "./excelToXml.vm";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DataList } from "./dataList";

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
        <input
          type="file"
          onChange={(e) => {
            vm?.handleFileUpload(e);
          }}
        />
        {/* {vm?.selectedFile && <p>Selected file: {vm?.selectedFile.name}</p>} */}
        <Button
          variant="contained"
          sx={{ my: 5 }}
          fullWidth
          disabled={vm?.jsonData?.length < 2}
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
