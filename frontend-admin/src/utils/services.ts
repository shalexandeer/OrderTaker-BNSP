export function getBearerHeader(token: string) {
  return { Authorization: `Bearer ${token}` };
}

export function getBasicHeader(token?: string) {
  return {
    Authorization: `Basic ${token}`,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };
}
