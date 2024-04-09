export interface TableColumn {
  header: string;
  key: string;
  width?: number;
}

export interface TableRow {
  [key: string]: string | number;
}

export function generateTable(
  doc: any,
  columns: TableColumn[],
  data: TableRow[],
  startX: number,
  startY: number
): void {
  const rowHeight = 20;

  // ESTILOS
  const cellStyles = {
    fill: "#ffffff", // Cor de fundo da célula
    textColor: "#000000", // Cor do texto
    bold: false, // Negrito
  };

  // HEADER
  let currentX = startX;
  columns.forEach((column) => {
    doc
      .font("Helvetica-Bold")
      .fillColor(cellStyles.textColor)
      .text(column.header, currentX, startY, {
        width: column.width || 100,
        align: "left",
      });
    currentX += column.width || 100;
  });
  startY += rowHeight;

  // BODY
  data.forEach((row) => {
    currentX = startX;
    columns.forEach((column) => {
      const value = row[column.key].toString();

      doc
        .font(cellStyles.bold ? "Helvetica-Bold" : "Helvetica")
        .fillColor(cellStyles.textColor)
        .text(value, currentX, startY, {
          width: column.width || 100,
          align: "left",
        });
      currentX += column.width || 100;
    });
    startY += rowHeight;
  });
}
