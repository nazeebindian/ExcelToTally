import { Button } from "@mui/material";
import ExcelToXmlViewModel from "./excelToXml.vm";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DataList } from "./dataList";
import dayjs from "dayjs";
import { JsonToExcel } from "react-json-to-excel";
import moment from "moment";

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
        <JsonToExcel
          title="Download as Excel"
          data={[
            {
              DATE: moment(new Date(vm?.date))?.format("YYYYMMDD"),
              VCHTYPE: "",
              ACCOUNT:"",
              LEDGER: "",
              AMOUNT: "",
              CHEQUE_NO: "",
              CHEQUE_DATE: "",
              BANKNAME: "",
              BANKBRANCHNAME: "",
              NARRATION: "",
            },
          ]}
          fileName={`${moment(new Date(vm?.date))?.format("YYYYMMDD")}`}
          btnClassName="custom-classname"
        />
        <div style={{ height: "20px" }} />
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
