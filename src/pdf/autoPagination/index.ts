export function autoPagination(
  doc: any,
  margin: { top: number; bottom: number }
): void {
  // Get the current y position
  let currentY = doc.y;

  // Check if there's enough space for content on the current page
  if (currentY + margin.bottom > doc.page.height) {
    // Start a new page
    doc.addPage();
    // Reset the cursor position to the top of the page
    currentY = margin.top;
  } else {
    // Move the cursor down to leave space between content
    doc.moveDown();
  }
}
