import path from 'node:path';
import fs from 'node:fs';
import { Buffer } from 'node:buffer';
import { fileURLToPath } from 'node:url';
import { v4 as uuidv4 } from 'uuid';

export async function processAndSaveImage(base64Image: string): Promise<string> {
  const mimeTypeMatch = base64Image.match(/data:([^;]+)/);
  const extension = mimeTypeMatch && mimeTypeMatch[1]
    ? mimeTypeMatch[1].split('/').pop()
    : 'jpg';

  const filename = `${uuidv4()}.${extension}`;
  const imagePath = path.join('uploads', filename).replace(/\\/g, '/');

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const uploadDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadDir))
    fs.mkdirSync(uploadDir, { recursive: true });

  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(path.join(uploadDir, filename), buffer);

  return imagePath;
}
