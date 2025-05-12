export const formatDate = (date) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);
  const thisWeek = new Date(today.getTime() - today.getDay() * 86400000);
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const thisYear = new Date(today.getFullYear(), 0, 1);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  const months = [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ];
  const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  if (date >= today) {
    return `Сегодня, ${formattedTime}`;
  } else if (date >= yesterday) {
    return `Вчера, ${formattedTime}`;
  } else if (date >= thisWeek) {
    const dayName = days[date.getDay()];
    return `${dayName} ${date.getDate()} ${
      date.getMonth() + 1
    }, ${formattedTime}`;
  } else if (date >= thisMonth) {
    return `${date.getDate()} ${months[date.getMonth() + 1]}`;
  } else if (date >= thisYear) {
    return `${date.getDate()} ${months[date.getMonth() + 1]}`;
  } else {
    return `${date.getDate()} ${
      months[date.getMonth() + 1]
    } ${date.getFullYear()}`;
  }
};
