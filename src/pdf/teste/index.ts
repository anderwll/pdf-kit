import { BLACK, DEFAULT_PADDING } from "..";

interface TextTitle {
  doc: any;
  title: string;
  text: string;
  x?: number;
  y?: number;
  continued?: boolean;
}

export function textTitle({
  doc,
  title,
  text,
  x = doc.x,
  y = doc.y,
  continued,
}: TextTitle) {
  doc
    .fillColor(BLACK)
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(`${title}: `, x, y, {
      width: doc.page.width - DEFAULT_PADDING,
      wordSpacing: 1,
      continued: true,
    })
    .font("Helvetica")
    .text(text, {
      width: doc.page.width - DEFAULT_PADDING,
      wordSpacing: 1,
      lineGap: 10,
      continued: continued ?? true,
    });
}
