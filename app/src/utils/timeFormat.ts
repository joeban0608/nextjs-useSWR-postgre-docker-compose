// 获取当前时间
const now = new Date();

// 定义月份和星期的名称
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// 获取年、月、日、时、分
const year = now.getFullYear();
const month = months[now.getMonth()];
const day = now.getDate();
const weekday = weekdays[now.getDay()];
let hours = now.getHours();
const minutes = now.getMinutes();

// 将小时调整为 12 小时制，并确定是上午还是下午
const amPm = hours >= 12 ? "PM" : "AM";
hours = hours % 12 || 12; // 如果小时为 0，则转换为 12

// 将时间格式化为字符串
export const formattedTimeNow = `${weekday}, ${month} ${day}, ${year} at ${hours}:${
  minutes < 10 ? "0" : ""
}${minutes} ${amPm}`;
