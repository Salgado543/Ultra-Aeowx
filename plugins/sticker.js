import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'
import sharp from 'sharp' // Usamos lo que instalaste

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false
  try {
    // 1. Validar qué nos enviaron (Imagen, Video o URL)
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''

    if (!/image|video/g.test(mime) && !args[0]) return m.reply(`⚠️ Responde a una imagen o video.`)

    // 2. Descargar el archivo
    let img = await q.download?.()
    if (!img) return m.reply(`⚠️ Error descargando la media.`)

    // 3. PROCESAMIENTO (Aquí está la corrección)
    
    if (/image/g.test(mime)) {
      // OPCIÓN A: Usar SHARP directo (Más rápido y seguro para imágenes)
      try {
        stiker = await sharp(img)
          .resize(512, 512, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .webp({ quality: 70 })
          .toBuffer()
      } catch (e) {
        console.error('Falló Sharp, intentando método alternativo...')
        // Si Sharp falla, usamos el backup
        stiker = await sticker(img, false, global.packname, global.author)
      }

    } else if (/video/g.test(mime)) {
      // OPCIÓN B: Video (Requiere ffmpeg, usamos la lib interna)
      if ((q.msg || q).seconds > 10) return m.reply('⚠️ Máximo 10 segundos para video.')
      stiker = await sticker(img, false, global.packname, global.author)
    
    } else if (args[0]) {
      // OPCIÓN C: URL
      stiker = await sticker(false, args[0], global.packname, global.author)
    }

  } catch (e) {
    console.error(e)
    stiker = false
  }

  // 4. ENVIAR STICKER FINAL
  if (stiker) {
    // Solo enviamos el objeto sticker, sin caption, sin footer, sin contextInfo
    await conn.sendMessage(m.chat, { sticker: stiker }, { quoted: m })
  } else {
    m.reply('❌ Error: No se pudo crear el sticker. Intenta con otra imagen.')
  }
}

handler.help = ['sticker', 's']
handler.tags = ['sticker']
handler.command = /^s(tic?ker)?(gif)?$/i

export default handler