import yts from 'yt-search'
import fetch from 'node-fetch'

const isYTUrl = (url) => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i.test(url)

async function getVideoInfo(query, videoMatch) {
  const search = await yts(query)
  if (!search.all.length) return null
  const videoInfo = videoMatch ? search.videos.find(v => v.videoId === videoMatch[1]) || search.all[0] : search.all[0]
  return videoInfo || null
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
      if (!text.trim()) return conn.reply(m.chat, `❀ Por favor, ingresa el nombre de la música a descargar.`, m)

      await m.react('🕒')
      
      const videoMatch = text.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/|v\/))([a-zA-Z0-9_-]{11})/)
      const query = videoMatch ? 'https://youtu.be/' + videoMatch[1] : text
      let url = query, title = null, thumbBuffer = null
      
      try {
        const videoInfo = await getVideoInfo(query, videoMatch)
        if (videoInfo) {
          url = videoInfo.url
          title = videoInfo.title
          thumbBuffer = (await conn.getFile(videoInfo.image)).data
          const vistas = (videoInfo.views || 0).toLocaleString()
          const canal = videoInfo.author?.name || 'Desconocido'
          const infoMessage = `Youtube - Downland\n\n> ${title}\n\n≡ 🍥 𝖣𝗎𝗋𝖺𝖼𝗂𝗈́𝗇: *${videoInfo.timestamp || 'Desconocido'}*\n≡ 🍩 Vistas: *${vistas}*\n≡ 🍃 Link: *${url}*\n\n 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐀𝐞𝐨𝐰𝐱𝐬 𝐂𝐥𝐮𝐛`

          await conn.sendMessage(m.chat, { image: thumbBuffer, caption: infoMessage }, { quoted: m })
        }
      } catch (err) {
      } 
      
      const audio = await getAudioFromApis(url)

      if (!audio?.url) {
        return m.reply('《✧》 No se pudo descargar el *audio*, intenta más tarde.')
      }
      
      await conn.sendMessage(m.chat, { audio: { url: audio.url }, fileName: `${title || 'audio'}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m })
      await m.react('✔️') 
      
    } catch (e) {
      await m.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  } 
  
async function getAudioFromApis(url) {
  const apis = [    
    // Nueva API Sky Ultra Plus (POST) añadida como primera opción
    { 
      api: 'Sky Ultra Plus', 
      endpoint: 'https://api-sky.ultraplus.click/youtube-mp3', 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'sk_b7ab1153-b35e-496d-b245-290782abbe13'
      },
      body: { url: url }, // Enviamos la URL original en el body
      extractor: res => res.result?.media?.audio 
    },
    // Opciones de respaldo (GET)
    { api: 'Ootaizumi', endpoint: `${global.APIs.ootaizumi.url}/downloader/youtube/play?query=${encodeURIComponent(url)}`, extractor: res => res.result?.download },
    { api: 'Vreden', endpoint: `${global.APIs.vreden.url}/api/v1/download/youtube/audio?url=${encodeURIComponent(url)}&quality=256`, extractor: res => res.result?.download?.url },
    { api: 'Stellar', endpoint: `${global.APIs.stellar.url}/dl/ytmp3?url=${encodeURIComponent(url)}&quality=256&key=${global.APIs.stellar.key}`, extractor: res => res.data?.dl },
    { api: 'Ootaizumi v2', endpoint: `${global.APIs.ootaizumi.url}/downloader/youtube?url=${encodeURIComponent(url)}&format=mp3`, extractor: res => res.result?.download },
    { api: 'Vreden v2', endpoint: `${global.APIs.vreden.url}/api/v1/download/play/audio?query=${encodeURIComponent(url)}`, extractor: res => res.result?.download?.url },
    { api: 'Nekolabs', endpoint: `${global.APIs.nekolabs.url}/downloader/youtube/v1?url=${encodeURIComponent(url)}&format=mp3`, extractor: res => res.result?.downloadUrl },
    { api: 'Nekolabs v2', endpoint: `${global.APIs.nekolabs.url}/downloader/youtube/play/v1?q=${encodeURIComponent(url)}`, extractor: res => res.result?.downloadUrl }
  ]

  for (const { api, endpoint, method, headers, body, extractor } of apis) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)
      
      // Configuramos las opciones de fetch para soportar GET y POST
      const fetchOptions = {
        method: method || 'GET',
        signal: controller.signal
      }
      if (headers) fetchOptions.headers = headers
      if (body) fetchOptions.body = JSON.stringify(body)

      const res = await fetch(endpoint, fetchOptions).then(r => r.json())
      
      clearTimeout(timeout)
      const link = extractor(res)
      if (link) return { url: link, api }
    } catch (e) {
      // Si hay error en esta API, lo ignora y pasa a la siguiente
    }
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  return null
} 

handler.command = handler.help = ['play',  'ytmp3', 'ytaudio', 'playaudio']
handler.tags = ['descargas']
handler.group = true

export default handler