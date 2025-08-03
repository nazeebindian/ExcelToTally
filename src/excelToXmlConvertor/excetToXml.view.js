import { Button, Card, CardContent, Typography, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import ExcelToXmlViewModel from "./excelToXml.vm";
import { DataList } from "./dataList";
import dayjs from "dayjs";
import { JsonToExcel } from "react-json-to-excel";
import moment from "moment";
import PopupModel, { LookupTable } from "./popupModal";
import excelFile from "./excel-template.xlsx"
import { ExcelDropzone } from './COMPONENTS/components';

const downloadExcel = () => {
  const link = document.createElement('a');
  link.href = excelFile;
  link.download = 'report.xlsx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function ExcelToXml({ vm }) {
  return (
    <div style={{ maxWidth: '90%', margin: 'auto' }}>
      <Typography variant="h5" fontWeight={700} mb={4} textAlign="center">
        Excel to Tally XML Converter
      </Typography>

      {/* Step 1: Select Date */}
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            <CalendarTodayIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Step 1: Select Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD-MM-YYYY"
              value={vm?.date || null}
              onChange={(newValue) => vm?.setDate(newValue)}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </LocalizationProvider>
        </CardContent>
      </Card>

      {/* Step 2: Download Template */}
      {/* <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            <CloudDownloadIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Step 2: Download Template (Optional)
          </Typography>
          <Button
            variant="outlined"
            startIcon={<CloudDownloadIcon />}
            onClick={downloadExcel}
          >
            Download Excel Template
          </Button>
        </CardContent>
      </Card> */}

      {/* Step 3: Upload Excel */}
      {/* <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            <UploadFileIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Step 3: Upload Excel File
          </Typography>
          <ExcelDropzone onDrop={vm?.handleFileUpload} />

        </CardContent>
      </Card> */}

      {/* Step 4: Convert to XML */}
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" mb={2}>
            <FileDownloadDoneIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Step 4: Convert to XML
          </Typography>
          <Button
            variant="contained"
            fullWidth
            sx={{ mb: 2 }}
            disabled={vm?.jsonData?.length < 1}
            onClick={() => vm?.jsonToXml(vm?.jsonData)}
          >
            Convert to Tally XML
          </Button>

          {vm?.xmlOutPut && (
            <Button
              fullWidth
              variant="outlined"
              color="success"
              onClick={() => vm?.xmlOutPut?.click()}
              download="file.xml"
            >
              Download XML File
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Optional: Show parsed data */}
      <div style={{ width: '100%', overflow: 'auto' }}>
        <DataList vm={vm} /></div>
    </div>
  );
}
