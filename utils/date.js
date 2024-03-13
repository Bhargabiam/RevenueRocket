import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

const currentDate = dayjs().tz("Asia/Kolkata");

// console.log(currentDateInTimeZone.subtract(7, "day").format("YYYY-MM-DD"));

const beforeDate = (days) => {
  const [n, type] = days;
  const result = [];
  let startDate, endDate;

  if (type === "y") {
    startDate = dayjs().subtract(n, "year").startOf("year");
    endDate = dayjs().subtract(n, "year").endOf("year");
  } else if (type === "m") {
    startDate = dayjs().subtract(n, "month").startOf("month");
    endDate = dayjs().subtract(n, "month").endOf("month");
  } else {
    startDate = dayjs().subtract(n, "day");
    endDate = dayjs();
  }

  result.push(startDate.format("YYYY-MM-DD"));
  result.push(endDate.format("YYYY-MM-DD"));

  return result;
};

export { beforeDate };
