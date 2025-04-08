import db from "../../../app/db";
import { advocates } from "../../../app/db/schema";
import { advocateData } from "../../../app/db/seed/advocates";

export async function POST() {
  const sanitizedData = advocateData.map(({ id, ...rest }) => rest);
  const records = await db.insert(advocates).values(sanitizedData).returning();

  return Response.json({ advocates: records });
}
