export function convertDateFormat(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const options = { timeZone: "Asia/Jakarta" };
  const hours = dateObj.toLocaleString("en-US", {
    ...options,
    hour: "2-digit",
    hour12: false,
  });
  const minutes = dateObj.toLocaleString("en-US", {
    ...options,
    minute: "2-digit",
  });
  const day = dateObj.toLocaleString("en-US", { ...options, day: "2-digit" });
  const month = dateObj.toLocaleString("en-US", {
    ...options,
    month: "2-digit",
  });
  const year = dateObj.toLocaleString("en-US", { ...options, year: "numeric" });
  if (parseInt(minutes) < 10) {
    return `${hours}.0${minutes} ${day}/${month}/${year}`;
  }

  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const day = dateObj.getUTCDate().toString().padStart(2, "0");
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export function formatTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const options = { timeZone: "Asia/Jakarta", hour12: false };
  const hours = dateObj.toLocaleString("en-US", {
    ...options,
    hour: "2-digit",
  });
  const minutes = dateObj.toLocaleString("en-US", {
    ...options,
    minute: "2-digit",
  });

  if (minutes === "0") {
    return `${hours}.00`;
  }
  return `${hours}.${minutes}`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
