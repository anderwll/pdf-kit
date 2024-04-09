import PDFDocument from "pdfkit";
import fs from "fs";
import { TableColumn, TableRow, generateTable } from "./table";
import { textTitle } from "./teste";
import { autoPagination } from "./autoPagination";

const path = `${__dirname}/logo.jpg`;
const logo = fs.readFileSync(path);
export const DEFAULT_PADDING = 15 + 20;
const DARK_RED = "#8b0000";
export const BLACK = "#000000";
const GRAY = "#808080";
const WHITE = "#ffffff";

export const doc = new PDFDocument({
  size: "A4",
  margin: 20,
  font: "Helvetica",
  layout: "portrait",
});

doc.pipe(fs.createWriteStream("output.pdf"));

doc.image(logo, 30, 10, { width: 120 });

doc
  .fillColor(BLACK)
  .fontSize(10)
  .font("Helvetica-Bold")
  .text("Emissão: 23/04/24", doc.x, 20, {
    align: "right",
    width: doc.page.width - DEFAULT_PADDING,
    lineGap: 5,
  })
  .text("Validade: 23/04/24", {
    align: "right",
    width: doc.page.width - DEFAULT_PADDING,
  });

doc
  .fillColor(GRAY)
  .fontSize(8)
  .font("Helvetica-BoldOblique")
  .text("CRIANDO EMOÇÕES & MOMENTOS", doc.x, doc.y);

doc
  .fillColor(DARK_RED)
  .rect(0, doc.y + 5, 700, 20)
  .fill()
  .fontSize(12)
  .font("Helvetica-Bold")
  .fillColor(WHITE)
  .text("ORÇAMENTO 0345-24", doc.x, doc.y + 10, {
    align: "right",
    width: doc.page.width - DEFAULT_PADDING,
    characterSpacing: 1,
  });

doc.moveDown(1);

textTitle({ doc, title: "VENDEDOR", text: "João vendedor", x: doc.x });
textTitle({ doc, title: "E-MAIL", text: "joão@email.com", x: doc.x + 50 });
textTitle({
  doc,
  title: "TELEFONE",
  text: "(11) 99999-9988",
  x: doc.x + 50,
  continued: false,
});
textTitle({
  doc,
  title: "A/C",
  text: "Pedro Responsavel",
  x: doc.x,
  y: doc.y,
  continued: false,
});

doc
  .fillColor(DARK_RED)
  .fontSize(18)
  .font("Helvetica-Bold")
  .text("Dados do serviço", doc.x, doc.y + 10)
  .rect(
    doc.widthOfString("Dados do serviço") + 25,
    doc.y - 13,
    doc.page.width,
    1
  )
  .fill()
  .moveDown(0.5);

textTitle({ doc, title: "Cliente", text: "Maria de La Bairro", x: doc.x });
textTitle({ doc, title: "E-mail", text: "maria@gmail.com", x: doc.x + 50 });
textTitle({
  doc,
  title: "Fone",
  text: "(51) 99988-4321",
  x: doc.x + 50,
  continued: false,
});

textTitle({ doc, title: "Evento", text: "Formatura Maria", x: doc.x });
textTitle({ doc, title: "Tipo", text: "Formatura", x: doc.x + 50 });
textTitle({
  doc,
  title: "Grupo",
  text: "Social",
  x: doc.x + 50,
  continued: true,
});
textTitle({
  doc,
  title: "Nome Local",
  text: "Local X",
  x: doc.x + 50,
  continued: false,
});

textTitle({
  doc,
  title: "Endereço",
  text: "Rua das Flores, 123  -  Bairro das Flores, Centro - SP",
  x: doc.x,
  continued: false,
});

// --------------------------------------------------

doc
  .fillColor(DARK_RED)
  .fontSize(11)
  .font("Helvetica-Bold")
  .text("CALENDÁRIO DO EVENTO", doc.x, doc.y + 10)
  .moveDown(0.5);

// -----------------------------

doc
  .fillColor(DARK_RED)
  .fontSize(18)
  .font("Helvetica-Bold")
  .text("Equipamentos", doc.x, doc.y + 10)
  .rect(doc.widthOfString("Equipamentos") + 25, doc.y - 13, doc.page.width, 1)
  .fill();

// --------------------------------------
const columns: TableColumn[] = [
  { header: "Cód.:", key: "code", width: 100 },
  { header: "Nome:", key: "name", width: 250 },
  { header: "Unid.:", key: "unid", width: 80 },
  { header: "Quant.:", key: "quant", width: 80 },
  { header: "Valor.:", key: "value", width: 80 },
];
const data: TableRow[] = [
  { code: "001", name: "Item 1", unid: "pc", quant: 5, value: 10 },
  { code: "002", name: "Item 2", unid: "kg", quant: 2, value: 20 },
  { code: "003", name: "Item 3", unid: "m", quant: 3, value: 30 },
  { code: "004", name: "Item 4", unid: "pc", quant: 4, value: 40 },
];

const startX = doc.x;

doc.fillColor(BLACK).fontSize(10);

generateTable(doc, columns, data, startX, doc.y + 20);

// ------------------------------------------------------

const DEFAULT_FOOTER = doc.page.height - 80;

doc.fillColor(DARK_RED).rect(0, DEFAULT_FOOTER, 700, 10).fill();

doc.text("Footer", doc.x, DEFAULT_FOOTER + 20, { align: "center" });

doc.end();
