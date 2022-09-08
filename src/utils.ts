export const commaSeparated = (value) => {
    if (value) {
      return value.toLocaleString("en-US", { minimumFractionDigits: 0 });
    }
    return value;
  };
  export function toMonthName(monthNumber) {
    console.log({ monthNumber });
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString("en-US", {
      month: "long",
    });
  }
  