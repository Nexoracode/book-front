type AnyObject = Record<string, any>;

export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined || value === "") return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (
    typeof value === "object" &&
    value !== null &&
    Object.keys(value).length === 0
  )
    return true;
  return false;
};

export const cleanObject = (obj: AnyObject): AnyObject => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => !isEmpty(value)),
  );
};

export const toLocalDate = (date: string | Date) => {
  const dateObject = date instanceof Date ? date : new Date(Date.parse(date));
  return dateObject.toLocaleString("fa-IR", {
    timeZone: "UTC",
  });
};
