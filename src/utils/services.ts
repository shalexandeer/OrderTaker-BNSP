
export function getBearerHeader(token: string) {
  return { Authorization: `Bearer ${token}`, "ngrok-skip-browser-warning": "true" };
}

export function getBasicHeader(token: string) {
  return { Authorization: `Basic ${token}` };
}
