import { advocates } from "../../../app/db/schema";
import db from "../../../app/db";
import { NextApiResponse } from "next";

export async function getAll(res: NextApiResponse) {
  const data = await db.select().from(advocates);
  try {
    res.status(200).json({
      message: "Advocates fetched successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching advocates",
    });
  }
}
