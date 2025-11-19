export const apiBase = process.env.NEXT_PUBLIC_API_URL || '';

export async function apiGet(path: string) {
  const url = `${apiBase}${path}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}
