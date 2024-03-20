export const buildTodayDateFilter = (date: Date) => {
  const start = new Date(date?.getTime());
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date(date?.getTime());
  end.setUTCHours(23, 59, 59, 999);

  return {
    createdAt: {
      gte: start,
      lte: end,
    },
  };
};
