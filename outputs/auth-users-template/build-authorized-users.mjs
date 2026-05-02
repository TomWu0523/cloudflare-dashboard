import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = new URL(".", import.meta.url).pathname;
const workbook = Workbook.create();
const sheet = workbook.worksheets.add("授权用户");
sheet.showGridLines = false;

sheet.getRange("A1:E1").values = [["序号", "名称", "职位", "用户名", "密码"]];
sheet.getRange("A2:E21").values = [
  [1, "系统管理员", "系统管理员", "", ""],
  ...Array.from({ length: 19 }, (_, index) => [index + 2, "", "", "", ""])
];

sheet.getRange("A1:E1").format = {
  fill: "#18274A",
  font: { bold: true, color: "#FFFFFF" },
  horizontalAlignment: "Center",
  verticalAlignment: "Center"
};
sheet.getRange("A2:E21").format = {
  fill: "#FAF8F7",
  font: { color: "#10203D" },
  verticalAlignment: "Center"
};
sheet.getRange("A2:A21").format = {
  horizontalAlignment: "Center"
};
sheet.getRange("D2:E21").format = {
  numberFormat: "@"
};
sheet.getRange("A1:E21").format.borders = {
  insideHorizontal: { style: "Continuous", color: "#D4CAC8", weight: "Thin" },
  insideVertical: { style: "Continuous", color: "#D4CAC8", weight: "Thin" },
  edgeBottom: { style: "Continuous", color: "#D4CAC8", weight: "Thin" },
  edgeLeft: { style: "Continuous", color: "#D4CAC8", weight: "Thin" },
  edgeRight: { style: "Continuous", color: "#D4CAC8", weight: "Thin" },
  edgeTop: { style: "Continuous", color: "#D4CAC8", weight: "Thin" }
};

sheet.getRange("A1:E21").format.rowHeightPx = 30;
sheet.getRange("A:A").format.columnWidthPx = 70;
sheet.getRange("B:B").format.columnWidthPx = 150;
sheet.getRange("C:C").format.columnWidthPx = 150;
sheet.getRange("D:D").format.columnWidthPx = 150;
sheet.getRange("E:E").format.columnWidthPx = 150;
sheet.freezePanes.freezeRows(1);

const table = sheet.tables.add("A1:E21", true, "AuthorizedUsers");
table.style = "TableStyleMedium2";
table.showFilterButton = true;

sheet.getRange("A23:E23").merge();
sheet.getRange("A24:E24").merge();
sheet.getRange("A25:E25").merge();
sheet.getRange("A23:A25").values = [
  ["使用说明：新增或修改授权用户时，请保留表头“序号、名称、职位、用户名、密码”。登录页导入本文件后，会按“用户名”和“密码”更新本机授权用户。"],
  ["安全提醒：请妥善保管此文件，不要放在公开目录或通过非授权渠道分享。"],
  [""]
];
const note = sheet.getRange("A23:E25");
note.format = {
  fill: "#E9E4E3",
  font: { color: "#495A6B" },
  wrapText: true,
  verticalAlignment: "Top"
};
sheet.getRange("A23:E24").format.rowHeightPx = 42;

const inspect = await workbook.inspect({
  kind: "table",
  range: "授权用户!A1:E6",
  include: "values",
  tableMaxRows: 6,
  tableMaxCols: 5
});
console.log(inspect.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 50 },
  summary: "formula error scan"
});
console.log(errors.ndjson);

try {
  const preview = await workbook.render({
    sheetName: "授权用户",
    autoCrop: "all",
    scale: 1,
    format: "png"
  });
  await fs.writeFile(`${outputDir}/authorized-users-template-preview.png`, new Uint8Array(await preview.arrayBuffer()));
} catch (error) {
  console.warn(`Preview render skipped: ${error.message}`);
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(`${outputDir}/authorized-users-template.xlsx`);
