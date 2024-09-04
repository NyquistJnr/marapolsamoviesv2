import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  format,
} from "date-fns";

// Helper function to get abbreviated month name
export const getAbbreviatedMonth = (date) => {
  const options = { month: "short", year: "numeric" };
  return format(date, "MMM yyyy", options);
};

const getDateRange = (date = new Date()) => {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 }); // Start of week (Monday)
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 }); // End of week (Sunday)

  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);

  const yearStart = startOfYear(date);
  const yearEnd = endOfYear(date);

  return {
    week: {
      start: format(weekStart, "d MMM, yyyy"), // e.g., "5 Aug, 2024"
      end: format(weekEnd, "d MMM, yyyy"), // e.g., "11 Aug, 2024"
    },
    month: {
      start: format(monthStart, "d MMM yyyy"), // e.g., "1 Aug 2024"
      end: format(monthEnd, "d MMM yyyy"), // e.g., "31 Aug 2024"
    },
    year: {
      start: format(yearStart, "d MMM yyyy"), // e.g., "1 Jan 2024"
      end: format(yearEnd, "d MMM yyyy"), // e.g., "31 Dec 2024"
    },
  };
};

export default getDateRange;
