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