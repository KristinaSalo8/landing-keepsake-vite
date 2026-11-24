import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = 'src/assets/images-src';
const OUTPUT_DIR = 'src/assets/images';
const WIDTHS = [400, 800];
const RATIOS = { work: 632 / 800, journal: 1 };

const FORMATS = [
  { ext: 'avif', format: 'avif', options: { quality: 50 } },
  { ext: 'webp', format: 'webp', options: { quality: 75 } },
  { ext: 'jpg', format: 'jpeg', options: { quality: 80, mozjpeg: true } },
];

await mkdir(OUTPUT_DIR, { recursive: true });

const files = (await readdir(SOURCE_DIR)).filter((file) =>
  file.endsWith('.jpg'),
);

for (const file of files) {
  const name = path.parse(file).name;
  const ratio = RATIOS[name.split('-')[0]];

  if (!ratio) {
    console.warn(`Пропущено ${file}: невідомий префікс назви`);
    continue;
  }

  for (const width of WIDTHS) {
    const height = Math.round(width * ratio);

    for (const { ext, format, options } of FORMATS) {
      await sharp(path.join(SOURCE_DIR, file))
        .resize(width, height, { fit: 'cover' })
        .toFormat(format, options)
        .toFile(path.join(OUTPUT_DIR, `${name}-${width}.${ext}`));
    }
  }
  console.log(`Готово: ${name}`);
}
