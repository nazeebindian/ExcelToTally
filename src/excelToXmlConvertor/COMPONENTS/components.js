import { JsonToExcel } from "react-json-to-excel";
import moment from "moment";
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Box, Typography } from '@mui/material';

export function ExcelDropzone({ onDrop }) {
    const handleDrop = useCallback(
        (acceptedFiles) => {
            if (onDrop && acceptedFiles.length > 0) {
                const fakeEvent = { target: { files: acceptedFiles } };
                onDrop(fakeEvent);
            }
        },
        [onDrop]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-excel': ['.xls'],
        },
        multiple: false,
    });

    return (
        <Box
            {...getRootProps()}
            sx={{
                border: '2px dashed #ccc',
                padding: 3,
                textAlign: 'center',
                borderRadius: 2,
                cursor: 'pointer',
                backgroundColor: isDragActive ? '#f0f8ff' : '#fafafa',
                transition: 'background-color 0.2s ease-in-out',
            }}
        >
            <input {...getInputProps()} />
            <UploadFileIcon fontSize="large" color="action" />
            <Typography variant="body1" mt={1}>
                {isDragActive
                    ? 'Drop the file here...'
                    : 'Drag & drop an Excel file here, or click to select'}
            </Typography>
        </Box>
    );
}


export const jsonToEx = () => <JsonToExcel
    title="Download as Excel"
    data={[
        {
            DATE: "", // moment(new Date(vm?.date))?.format("YYYYMMDD"),
            NARRATION: "",
            LEDGER: "",
            AMOUNT: "",
            VCHTYPE: "",
            CHEQUE_NO: "",
            CHEQUE_DATE: "",
            BANKNAME: "",
            BANKBRANCHNAME: "",
            ACCOUNT: ""
        },
    ]}
    fileName='TEST' // {`${moment(new Date(vm?.date))?.format("YYYYMMDD")}`}
    btnClassName="custom-classname"
/>