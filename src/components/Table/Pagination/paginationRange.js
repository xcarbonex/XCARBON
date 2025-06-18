export function getPaginationRange(currentPage, totalPages) {
  const range = [];

  // Always add the first page
  range.push(1);

  // If currentPage is 1, include up to the next 3 pages (e.g., 2, 3, 4)
  if (currentPage === 1) {
    for (let i = 2; i <= Math.min(4, totalPages); i++) {
      range.push(i);
    }
    // Add ellipsis if there are more pages before the last
    if (totalPages > 4) {
      range.push('...');
    }
  }
  // If currentPage is near the start (2 or 3), adjust the range
  else if (currentPage <= 3) {
    for (let i = 2; i <= Math.min(4, totalPages); i++) {
      range.push(i);
    }
    if (totalPages > 4) {
      range.push('...');
    }
  }
  // If currentPage is in the middle, show one page before and after
  else if (currentPage <= totalPages - 3) {
    range.push('...');
    range.push(currentPage - 1);
    range.push(currentPage);
    range.push(currentPage + 1);
    if (currentPage + 1 < totalPages - 1) {
      range.push('...');
    }
  }
  // If currentPage is near the end, show pages up to the last
  else {
    range.push('...');
    for (let i = Math.max(2, totalPages - 3); i <= totalPages - 1; i++) {
      range.push(i);
    }
  }

  // Add the last page if totalPages > 1 and not already included
  if (totalPages > 1 && range[range.length - 1] !== totalPages) {
    range.push(totalPages);
  }

  return range;
}