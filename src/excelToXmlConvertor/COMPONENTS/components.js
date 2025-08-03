import { JsonToExcel } from "react-json-to-excel";
import moment from "moment";

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