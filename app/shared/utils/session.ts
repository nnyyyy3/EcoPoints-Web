import { getSession } from "../session.server";

export async function getVendorIDFromSession(request: Request): Promise<string | null> {
  const session = await getSession(request.headers.get("Cookie"));
  return session.get("vendorID");
}
