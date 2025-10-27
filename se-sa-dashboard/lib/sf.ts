export type SfAuth = {
  access_token: string;
  instance_url: string;
  refresh_token?: string;
};

export async function exchangeCodeForToken(code: string): Promise<SfAuth> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: process.env.SALESFORCE_CLIENT_ID!,
    client_secret: process.env.SALESFORCE_CLIENT_SECRET!,
    redirect_uri: process.env.SALESFORCE_REDIRECT_URI!,
  });
  const res = await fetch(`${process.env.SALESFORCE_LOGIN_URL}/services/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Salesforce token exchange failed");
  return res.json();
}

export async function soql<T>(auth: SfAuth, query: string): Promise<T[]> {
  const q = encodeURIComponent(query);
  const res = await fetch(`${auth.instance_url}/services/data/v57.0/query?q=${q}`, {
    headers: { Authorization: `Bearer ${auth.access_token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("SOQL failed");
  const data = await res.json();
  return data.records as T[];
}

// Placeholder: implement secure storage for auth on your platform
export async function getSfAuth(): Promise<SfAuth> {
  throw new Error("getSfAuth() not implemented. Store and return OAuth tokens here.");
}
