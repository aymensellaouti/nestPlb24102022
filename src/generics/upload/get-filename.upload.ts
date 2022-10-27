import { Request } from "express";
import { v4 as uuidv4 } from "uuid";

export function filename (
  request: Request,
  file: Express.Multer.File,
  callback
) {
  const newFileName = uuidv4()+file.originalname.replace(
    /\s/g, ""
  );
  callback(null, newFileName);
}
