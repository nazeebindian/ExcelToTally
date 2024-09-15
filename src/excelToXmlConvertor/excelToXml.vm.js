import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { partyList } from "./parties";
import dayjs from "dayjs";
import moment from "moment/moment";

const ExcelToXmlViewModel = () => {
  const [date, setDate] = useState(dayjs);
  const [xmlOutPut, setXmlOutput] = useState(null);
  const ledgerList = [...partyList?.map((ob) => ob?.DESC_ENG)];

  const jsonToXml = (jsonDataArray) => {
    const voucherXmlTag = () => {
      let xmlTag = "";
      jsonDataArray?.map((item) => {
        xmlTag = `${xmlTag}
                <TALLYMESSAGE xmlns:UDF="TallyUDF">
     <VOUCHER REMOTEID="${item?.REMOTEID || ""}" VCHKEY="${
          item?.VCHKEY || ""
        }" VCHTYPE="${
          item?.VCHTYPE || ""
        }" ACTION="Create" OBJVIEW="Accounting Voucher View">
      <OLDAUDITENTRYIDS.LIST TYPE="Number">
       <OLDAUDITENTRYIDS>-1</OLDAUDITENTRYIDS>
      </OLDAUDITENTRYIDS.LIST>
      <DATE>${item?.DATE || ""}</DATE>
      <GUID>${item?.REMOTEID || ""}</GUID>
      <NARRATION>${item?.NARRATION || ""}</NARRATION>
      <VOUCHERTYPENAME>${item?.VCHTYPE || ""}</VOUCHERTYPENAME>
      <VOUCHERNUMBER>${item?.VOUCHERNUMBER || ""}</VOUCHERNUMBER>
      <PARTYLEDGERNAME>${item?.LEDGER || ""}</PARTYLEDGERNAME>
      <CSTFORMISSUETYPE/>
      <CSTFORMRECVTYPE/>
      <FBTPAYMENTTYPE>Default</FBTPAYMENTTYPE>
      <PERSISTEDVIEW>Accounting Voucher View</PERSISTEDVIEW>
      <VCHGSTCLASS/>
      <ENTEREDBY>HASHIM</ENTEREDBY>
      <DIFFACTUALQTY>No</DIFFACTUALQTY>
      <AUDITED>No</AUDITED>
      <FORJOBCOSTING>No</FORJOBCOSTING>
      <ISOPTIONAL>No</ISOPTIONAL>
      <EFFECTIVEDATE>${item?.DATE || ""}</EFFECTIVEDATE>
      <ISFORJOBWORKIN>No</ISFORJOBWORKIN>
      <ALLOWCONSUMPTION>No</ALLOWCONSUMPTION>
      <USEFORINTEREST>No</USEFORINTEREST>
      <USEFORGAINLOSS>No</USEFORGAINLOSS>
      <USEFORGODOWNTRANSFER>No</USEFORGODOWNTRANSFER>
      <USEFORCOMPOUND>No</USEFORCOMPOUND>
      <ALTERID> ${item?.ALTERID || ""}</ALTERID>
      <EXCISEOPENING>No</EXCISEOPENING>
      <USEFORFINALPRODUCTION>No</USEFORFINALPRODUCTION>
      <ISCANCELLED>No</ISCANCELLED>
      <HASCASHFLOW>Yes</HASCASHFLOW>
      <ISPOSTDATED>No</ISPOSTDATED>
      <USETRACKINGNUMBER>No</USETRACKINGNUMBER>
      <ISINVOICE>No</ISINVOICE>
      <MFGJOURNAL>No</MFGJOURNAL>
      <HASDISCOUNTS>No</HASDISCOUNTS>
      <ASPAYSLIP>No</ASPAYSLIP>
      <ISCOSTCENTRE>No</ISCOSTCENTRE>
      <ISSTXNONREALIZEDVCH>No</ISSTXNONREALIZEDVCH>
      <ISEXCISEMANUFACTURERON>No</ISEXCISEMANUFACTURERON>
      <ISBLANKCHEQUE>No</ISBLANKCHEQUE>
      <ISVOID>No</ISVOID>
      <ISONHOLD>No</ISONHOLD>
      <ISDELETED>No</ISDELETED>
      <ASORIGINAL>No</ASORIGINAL>
      <VCHISFROMSYNC>No</VCHISFROMSYNC>
      <MASTERID> ${item?.MASTERID || ""}</MASTERID>
      <VOUCHERKEY>${item?.VOUCHERKEY || ""}</VOUCHERKEY>
      <OLDAUDITENTRIES.LIST>      </OLDAUDITENTRIES.LIST>
      <ACCOUNTAUDITENTRIES.LIST>      </ACCOUNTAUDITENTRIES.LIST>
      <AUDITENTRIES.LIST>      </AUDITENTRIES.LIST>
      <INVOICEDELNOTES.LIST>      </INVOICEDELNOTES.LIST>
      <INVOICEORDERLIST.LIST>      </INVOICEORDERLIST.LIST>
      <INVOICEINDENTLIST.LIST>      </INVOICEINDENTLIST.LIST>
      <ATTENDANCEENTRIES.LIST>      </ATTENDANCEENTRIES.LIST>
      <ORIGINVOICEDETAILS.LIST>      </ORIGINVOICEDETAILS.LIST>
      <INVOICEEXPORTLIST.LIST>      </INVOICEEXPORTLIST.LIST>
      <ALLLEDGERENTRIES.LIST>
       <OLDAUDITENTRYIDS.LIST TYPE="Number">
        <OLDAUDITENTRYIDS>-1</OLDAUDITENTRYIDS>
       </OLDAUDITENTRYIDS.LIST>
       <LEDGERNAME>${item?.LEDGER || ""}</LEDGERNAME>
       <GSTCLASS/>
       <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
       <LEDGERFROMITEM>No</LEDGERFROMITEM>
       <REMOVEZEROENTRIES>No</REMOVEZEROENTRIES>
       <ISPARTYLEDGER>Yes</ISPARTYLEDGER>
       <ISLASTDEEMEDPOSITIVE>${
         item?.VCHTYPE === "PAYMENT" ? "Yes" : "No"
       }</ISLASTDEEMEDPOSITIVE>
       <AMOUNT>${
         (item?.VCHTYPE === "PAYMENT" ? -1 : 1) * item?.AMOUNT || ""
       }</AMOUNT>
       <BANKALLOCATIONS.LIST>       </BANKALLOCATIONS.LIST>
       <BILLALLOCATIONS.LIST>       </BILLALLOCATIONS.LIST>
       <INTERESTCOLLECTION.LIST>       </INTERESTCOLLECTION.LIST>
       <OLDAUDITENTRIES.LIST>       </OLDAUDITENTRIES.LIST>
       <ACCOUNTAUDITENTRIES.LIST>       </ACCOUNTAUDITENTRIES.LIST>
       <AUDITENTRIES.LIST>       </AUDITENTRIES.LIST>
       <TAXBILLALLOCATIONS.LIST>       </TAXBILLALLOCATIONS.LIST>
       <TAXOBJECTALLOCATIONS.LIST>       </TAXOBJECTALLOCATIONS.LIST>
       <TDSEXPENSEALLOCATIONS.LIST>       </TDSEXPENSEALLOCATIONS.LIST>
       <VATSTATUTORYDETAILS.LIST>       </VATSTATUTORYDETAILS.LIST>
       <COSTTRACKALLOCATIONS.LIST>       </COSTTRACKALLOCATIONS.LIST>
      </ALLLEDGERENTRIES.LIST>
      <ALLLEDGERENTRIES.LIST>
       <OLDAUDITENTRYIDS.LIST TYPE="Number">
        <OLDAUDITENTRYIDS>-1</OLDAUDITENTRYIDS>
       </OLDAUDITENTRYIDS.LIST>
       <LEDGERNAME>${item?.LEDGER || ""}</LEDGERNAME>
       <GSTCLASS/>
       <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
       <LEDGERFROMITEM>No</LEDGERFROMITEM>
       <REMOVEZEROENTRIES>No</REMOVEZEROENTRIES>
       <ISPARTYLEDGER>Yes</ISPARTYLEDGER>
       <ISLASTDEEMEDPOSITIVE>Yes</ISLASTDEEMEDPOSITIVE>
       <AMOUNT>${
         (item?.VCHTYPE === "PAYMENT" ? 1 : -1) * item?.AMOUNT || ""
       }</AMOUNT>
${
  item?.CHEQUE_NO
    ? `       <BANKALLOCATIONS.LIST>
        <DATE>${item?.DATE || ""}</DATE>
        <INSTRUMENTDATE>${item?.CHEQUE_DATE || ""}</INSTRUMENTDATE>
        <NAME>b8dbf402-9248-4a71-9966-4fadeed3036f</NAME>
        <TRANSACTIONTYPE>Cheque/DD</TRANSACTIONTYPE>
        ${item?.BANKNAME && `<BANKNAME>${item?.BANKNAME || ""}</BANKNAME>`}
        ${
          item?.BANKBRANCHNAME &&
          `<BANKBRANCHNAME>${item?.BANKBRANCHNAME || ""}</BANKBRANCHNAME>`
        }
        <PAYMENTFAVOURING>${item?.LEDGER || ""}</PAYMENTFAVOURING>
        <INSTRUMENTNUMBER>${item?.CHEQUE_NO || ""}</INSTRUMENTNUMBER>
        <UNIQUEREFERENCENUMBER>${
          item?.UNIQUEREFERENCENUMBER || ""
        }</UNIQUEREFERENCENUMBER>
        <STATUS>No</STATUS>
        <PAYMENTMODE>Transacted</PAYMENTMODE>
        <BANKPARTYNAME>${item?.LEDGER || ""}</BANKPARTYNAME>
        <ISCONNECTEDPAYMENT>No</ISCONNECTEDPAYMENT>
        <ISSPLIT>No</ISSPLIT>
        <ISCONTRACTUSED>No</ISCONTRACTUSED>
        <AMOUNT>${
          (item?.VCHTYPE === "PAYMENT" ? 1 : -1) * item?.AMOUNT || ""
        }</AMOUNT>
        <CONTRACTDETAILS.LIST>        </CONTRACTDETAILS.LIST>
       </BANKALLOCATIONS.LIST>
`
    : `<BANKALLOCATIONS.LIST>       </BANKALLOCATIONS.LIST>`
}
       <BILLALLOCATIONS.LIST>       </BILLALLOCATIONS.LIST>
       <INTERESTCOLLECTION.LIST>       </INTERESTCOLLECTION.LIST>
       <OLDAUDITENTRIES.LIST>       </OLDAUDITENTRIES.LIST>
       <ACCOUNTAUDITENTRIES.LIST>       </ACCOUNTAUDITENTRIES.LIST>
       <AUDITENTRIES.LIST>       </AUDITENTRIES.LIST>
       <TAXBILLALLOCATIONS.LIST>       </TAXBILLALLOCATIONS.LIST>
       <TAXOBJECTALLOCATIONS.LIST>       </TAXOBJECTALLOCATIONS.LIST>
       <TDSEXPENSEALLOCATIONS.LIST>       </TDSEXPENSEALLOCATIONS.LIST>
       <VATSTATUTORYDETAILS.LIST>       </VATSTATUTORYDETAILS.LIST>
       <COSTTRACKALLOCATIONS.LIST>       </COSTTRACKALLOCATIONS.LIST>
      </ALLLEDGERENTRIES.LIST>
      <PAYROLLMODEOFPAYMENT.LIST>      </PAYROLLMODEOFPAYMENT.LIST>
      <ATTDRECORDS.LIST>      </ATTDRECORDS.LIST>
     </VOUCHER>
    </TALLYMESSAGE>`;
        return "";
      });
      return xmlTag;
    };
    const elementXML = `<ENVELOPE>
 <HEADER>
  <TALLYREQUEST>Import Data</TALLYREQUEST>
 </HEADER>
 <BODY>
  <IMPORTDATA>
   <REQUESTDESC>
    <REPORTNAME>All Masters</REPORTNAME>
    <STATICVARIABLES>
     <SVCURRENTCOMPANY>HASHIM CON - (2021-22)</SVCURRENTCOMPANY>
    </STATICVARIABLES>
   </REQUESTDESC>
   <REQUESTDATA>
   ${voucherXmlTag()}
      </REQUESTDATA>
  </IMPORTDATA>
 </BODY>
</ENVELOPE>`;

    const filename = `${moment(new Date(date))?.format("YYYYMMDD")}.xml`;
    const pom = document.createElement("a");
    const bb = new Blob([elementXML], { type: "text/plain" });

    pom.setAttribute("href", window.URL.createObjectURL(bb));
    pom.setAttribute("download", filename);

    pom.dataset.downloadurl = ["text/plain", pom.download, pom.href].join(":");
    pom.draggable = true;
    pom.classList.add("dragout");
    setXmlOutput(pom);
  };

  const [jsonData, setJasonData] = useState([
    {
      DATE: "",
      NARRATION: "",
      LEDGER: "",
      AMOUNT: "",
      VCHTYPE: "",
      CHEQUE_NO: "",
      CHEQUE_DATE: "",
      BANKNAME: "",
      BANKBRANCHNAME: "",
      NAME: "b8dbf402-9248-4a71-9966-4fadeed3036f", // encoded ? not mandatory?
      // REMOTEID: "", "c91b8fc0-df86-11db-aec0-001111bb672d-0002d29e" not mandatory?
      // VCHKEY: "", "c91b8fc0-df86-11db-aec0-001111bb672d-0000acfe:00000178" not mandatory?
      // VOUCHERNUMBER: "", 1 // not mandatory?
      // ALTERID: "",// 197785  // not mandatory ?
      // MASTERID: "", // 184990 not mandatory
      // VOUCHERKEY: "", // 190206921671032  not mandatory
      // UNIQUEREFERENCENUMBER: "", 5vbgkYN0hxqpMDfN // not mandatory
    },
  ]);
  const [selectedFile, setSelectedFile] = useState();

  const handleFileUpload = async (e) => {
    setSelectedFile(e?.target?.files?.[0]);
    const file = new Blob([e?.target?.files?.[0]], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,",
    });
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(new Uint8Array(buffer), { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const sheetData = XLSX.utils.sheet_to_json(sheet);
    setJasonData([
      ...sheetData?.map((item, i) => ({
        "#": i + 1,
        DATE: item?.DATE || null,
        NARRATION: item?.NARRATION || "",
        LEDGER: item?.LEDGER || "",
        AMOUNT: item?.AMOUNT || "",
        VCHTYPE: item?.VCHTYPE || "",
        CHEQUE_NO: item?.CHEQUE_NO || "",
        CHEQUE_DATE: item?.CHEQUE_DATE || "",
        BANKNAME: item?.BANKNAME || "",
        BANKBRANCHNAME: item?.BANKBRANCHNAME || "",
      })),
    ]);
  };

  return {
    jsonToXml,
    xmlOutPut,
    date,
    setDate,
    handleFileUpload,
    selectedFile,
    setSelectedFile,
    jsonData,
    setJasonData,
    ledgerList,
  };
};
export default ExcelToXmlViewModel;

// import { useEffect, useState } from "react";
// import { xmlFile } from "./datafiles";
// import xmlFileOE from "./test.xml";

// const AppViewModel = () => {
//   const string =
//     "<VOUCHER><REMOTECMPNAME>HASHIM</REMOTECMPNAME><REMOTECMPNAME>HASHIM</REMOTECMPNAME></VOUCHER>";

//   const [run, setRun] = useState(true);
//   const xmlConvertor = (xmlString) => {
//     const splitArray = xmlString?.split("<")?.filter((item) => item !== "");
//     const groupedArray = [];
//     const grouper = () => {
//       let parentClaimed;
//       let index = 0;
//       let parentTag;
//       splitArray?.map((item, i) => {
//         parentClaimed = !parentClaimed && i;
//         parentTag = splitArray?.[parentClaimed]?.replace(">");
//         if (!item === `/${parentTag}`) {
//           if (i !== parentClaimed) {
//             groupedArray?.[index]?.[parentTag]?.push(item);
//           } else if (i === parentClaimed) {
//             groupedArray?.push({ [item?.replace(">")]: [] });
//           }
//         } else {
//           index = index + 1;
//           parentClaimed = i + 1;
//           parentTag = splitArray?.[parentClaimed]?.replace(">");
//         }
//         return "";
//       });
//     };
//     grouper();

//     const arrayWithoutClosingTag = splitArray?.filter(
//       (item) => item.split("")?.[0] !== "/"
//     );

//     const keyValueConstructor = (tags) => {
//       let resultObj = {};
//       tags?.map((item1, i) => {
//         const keyValuePair = {
//           [i]: { [item1?.split(">")?.[0]]: item1?.split(">")?.[1] },
//         };
//         resultObj = { ...resultObj, ...keyValuePair };
//         return "";
//       });
//       return resultObj;
//     };

//     console.log("===groupedArray", groupedArray);
//     setRun(false);
//   };

//   useEffect(() => {
//     run && xmlConvertor(string);
//   }, [run]);

//   return {};
// };

// export default AppViewModel;
