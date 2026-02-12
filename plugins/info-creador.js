// Créditos: Modificado para Aeowxs Ultra (Gio)

async function handler(m, { conn }) {
    try {
        
        await m.react('🛡️')

        const messageText = `
*INFORMACIÓN DEL PROYECTO* 

*👤 Developer:* Aeowx Club
*🤖 Bot:* Aeowxs Ultra

> *Aeowxs Ultra* es un asistente virtual diseñado para potenciar tus grupos de WhatsApp con herramientas de administración y entretenimiento.

> Si encuentras algún error o tienes sugerencias, por favor contacta al desarrollador.
`.trim()

        
        let msgConfig = {
            video: { url: './owner/banner.mp4' }, 
            gifPlayback: true,
            caption: messageText,
            contextInfo: {
                externalAdReply: {
                    title: "Aeowxs Ultra | System",
                    body: "Powered by GIODEV",
                    thumbnailUrl: "https://qu.ax/Zgqq.jpg",
                    sourceUrl: "https://whatsapp.com/channel/0029Vb6Ys0q6xCSV5iyFfw1T",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }

       
        await conn.sendMessage(m.chat, msgConfig, { quoted: m })

        
        return true 

    } catch (error) {
        console.error('Error en el comando owner:', error)
       
        return true 
    }
}


handler.help = ['owner', 'creator']
handler.tags = ['info']
handler.command = ['owner', 'creator', 'creador', 'dueño', 'propietario', 'sc', 'script']

export default handler