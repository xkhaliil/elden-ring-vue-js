import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function optimizeImages() {
  const assetsDir = path.join(__dirname, '../src/assets')

  // Convert navbar-logo.png to WebP (120x180px max, 80% quality)
  try {
    await sharp(path.join(assetsDir, 'navbar-logo.png'))
      .resize(120, 180, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toFile(path.join(assetsDir, 'navbar-logo.webp'))

    console.log('✅ navbar-logo.png → navbar-logo.webp (120x180px, 80% quality)')
  } catch (error) {
    console.error('❌ Failed to optimize navbar-logo.png:', error.message)
  }

  // Convert eldenring_transparent.png to WebP (400x700px max, 80% quality)
  try {
    await sharp(path.join(assetsDir, 'eldenring_transparent.png'))
      .resize(400, 700, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toFile(path.join(assetsDir, 'eldenring_transparent.webp'))

    console.log(
      '✅ eldenring_transparent.png → eldenring_transparent.webp (400x700px, 80% quality)',
    )
  } catch (error) {
    console.error('❌ Failed to optimize eldenring_transparent.png:', error.message)
  }

  // Convert other images to WebP for additional optimization
  const images = ['bosses.jpg', 'weapons.jpg', 'items.jpg']

  for (const image of images) {
    try {
      const inputPath = path.join(assetsDir, image)
      const outputPath = path.join(assetsDir, image.replace(/\.(jpg|jpeg|png)$/i, '.webp'))

      if (fs.existsSync(inputPath)) {
        await sharp(inputPath).webp({ quality: 85 }).toFile(outputPath)

        console.log(`✅ ${image} → ${path.basename(outputPath)}`)
      }
    } catch (error) {
      console.error(`❌ Failed to optimize ${image}:`, error.message)
    }
  }
}

optimizeImages().catch(console.error)
