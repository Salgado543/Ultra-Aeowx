import yts from 'yt-search'
import fetch from 'node-fetch'

const isYTUrl = (url) => /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/i.test(url)

const handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text.trim()) return conn.reply(m.chat, `❀ Por favor, ingresa el nombre de la música a descargar.`, m)

        await m.react('🕒')
      
        const videoMatch = text.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/|v\/))([a-zA-Z0-9_-]{11})/)
        const query = videoMatch ? 'https://youtu.be/' + videoMatch[1] : text
        let url = query, title = null, thumbBuffer = null
      
        try {
            const search = await yts(query)
            if (search.all.length) {
                const videoInfo = videoMatch ? search.videos.find(v => v.videoId === videoMatch[1]) || search.all[0] : search.all[0]
                if (videoInfo) {
                    url = videoInfo.url
                    title = videoInfo.title
                    
                    // BLINDAJE 1: A veces yt-search usa .thumbnail y a veces .image
                    const imageUrl = videoInfo.thumbnail || videoInfo.image || ''
                    if (imageUrl) {
                        try {
                            thumbBuffer = (await conn.getFile(imageUrl)).data
                        } catch (e) {
                            console.log('Error al descargar miniatura:', e)
                        }
                    }

                    const vistas = (videoInfo.views || 0).toLocaleString()
                    const canal = videoInfo.author?.name || 'Desconocido'
                    const infoMessage = `Youtube - Downland\n\n> ${title}\n\n≡ 🍥 𝖣𝗎𝗋𝖺𝖼𝗂𝗈́𝗇: *${videoInfo.timestamp || 'Desconocido'}*\n≡ 🍩 Vistas: *${vistas}*\n≡ 🍃 Link: *${url}*\n\n 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐀𝐞𝐨𝐰𝐱𝐬 𝐂𝐥𝐮𝐛`
                    
                    if (thumbBuffer) {
                        await conn.sendMessage(m.chat, { image: thumbBuffer, caption: infoMessage }, { quoted: m })
                    } else {
                        await conn.reply(m.chat, infoMessage, m)
                    }
                }
            }
        } catch (err) {
            console.log("Fallo en búsqueda:", err)
        } 
      
        const video = await getVideoFromApis(url) 
      
        if (!video?.url) {
            let errorMsg = '《✧》 No se pudo descargar el *video*, intenta más tarde.'
            if (video?.debugMsg) {
                errorMsg = `⚠️ *Reporte de Error Sky API:*\n> ${video.debugMsg}\n\n${errorMsg}`
            }
            return m.reply(errorMsg)
        }

        // BLINDAJE 2: Verificamos qué demonios nos devolvió la API
        if (typeof video.url !== 'string') {
            return m.reply(`⚠️ *Error de formato de API:*\nLa API no devolvió un enlace de texto. Devolvió esto:\n> ${JSON.stringify(video.url)}`)
        }

        // BLINDAJE 3: Atrapamos el error "Result is not a buffer" sin crashear el bot
        try {
            await conn.sendFile(m.chat, video.url, `${title || 'video'}.mp4`, `> ❀ ${title || 'video'}`, m)
            await m.react('✔️') 
        } catch (sendError) {
            await m.react('✖️')
            await m.reply(`⚠️ *Error al enviar el archivo a WhatsApp:*\n> La API de Sky Ultra Plus nos dio este enlace: \n${video.url}\n\n> Pero WhatsApp no pudo leerlo como video. Es posible que el enlace esté expirado o bloqueado.`)
        }
      
    } catch (e) {
        await m.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
} 
  
async function getVideoFromApis(url) {
    const apis = [    
        { 
            api: 'Sky Ultra Plus', 
            endpoint: 'https://api-sky.ultraplus.click/youtube-mp4/resolve', 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': 'sk_b7ab1153-b35e-496d-b245-290782abbe13'
            },
            body: { url: url, type: "video", quality: "360" }, 
            // Añadí res.result?.url por si acaso la estructura es ligeramente distinta
            extractor: res => res.media?.dl_download || res.result?.media?.dl_download || res.media?.dl_inline || res.result?.media?.dl_inline || res.result?.url || res.url
        },
        { api: 'Vreden', endpoint: `${global.APIs.vreden.url}/api/v1/download/youtube/video?url=${encodeURIComponent(url)}&quality=360`, extractor: res => res.result?.download?.url },
        { api: 'Stellar v2', endpoint: `${global.APIs.stellar.url}/dl/ytmp4v2?url=${encodeURIComponent(url)}&key=${global.APIs.stellar.key}`, extractor: res => res.vidinfo?.url },
        { api: 'Stellar', endpoint: `${global.APIs.stellar.url}/dl/ytmp4?url=${encodeURIComponent(url)}&quality=360&key=${global.APIs.stellar.key}`, extractor: res => res.data?.dl },
        { api: 'Nekolabs', endpoint: `${global.APIs.nekolabs.url}/downloader/youtube/v1?url=${encodeURIComponent(url)}&format=360`, extractor: res => res.result?.downloadUrl },
        { api: 'Vreden v2', endpoint: `${global.APIs.vreden.url}/api/v1/download/play/video?query=${encodeURIComponent(url)}`, extractor: res => res.result?.download?.url }
    ]

    let mensajeDebug = ""

    for (const { api, endpoint, method, headers, body, extractor } of apis) {
        try {
            const controller = new AbortController()
            const timeout = setTimeout(() => controller.abort(), 10000)
            
            const fetchOptions = {
                method: method || 'GET',
                signal: controller.signal
            }
            if (headers) fetchOptions.headers = headers
            if (body) fetchOptions.body = JSON.stringify(body)

            const rawResponse = await fetch(endpoint, fetchOptions)
            const textResponse = await rawResponse.text() 
            clearTimeout(timeout)
            
            try {
                const jsonResponse = JSON.parse(textResponse)
                const link = extractor(jsonResponse)
                
                if (link) return { url: link, api }
                
                if (api === 'Sky Ultra Plus') {
                    mensajeDebug = `La API respondió sin error, pero no encontré el enlace en: ${JSON.stringify(jsonResponse).substring(0, 150)}`
                }
            } catch (e) {
                if (api === 'Sky Ultra Plus') {
                    mensajeDebug = `La API no dio JSON válido. Respuesta cruda: ${textResponse.substring(0, 150)}`
                }
            }
        } catch (e) {
            if (api === 'Sky Ultra Plus') {
                mensajeDebug = `Fallo de red al conectar a Sky: ${e.message}`
            }
        }
        await new Promise(resolve => setTimeout(resolve, 500))
    }
    return { url: null, debugMsg: mensajeDebug }
}

handler.command = handler.help = ['play2',  'ytmp4', 'ytvideo', 'playvideo', 'mp4']
handler.tags = ['descargas']
handler.group = true

export default handler