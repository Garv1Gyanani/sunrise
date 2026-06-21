import sharp from 'sharp';
import { readdirSync } from 'fs';
import { join, parse } from 'path';

const publicDir = join(import.meta.dirname, '..', 'public');

const files = readdirSync(publicDir).filter(f => /\.(png|jpe?g)$/i.test(f));

for (const file of files) {
  const { name } = parse(file);
  const input = join(publicDir, file);
  const output = join(publicDir, `${name}.webp`);
  await sharp(input).webp({ quality: 80 }).toFile(output);
  console.log(`${file} → ${name}.webp`);
}
