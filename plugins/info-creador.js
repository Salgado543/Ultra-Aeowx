// créditos by xzzys26 Para Gaara-Ultra-MD 

async function handler(m, { conn, usedPrefix }) {
  try {
    await m.react('👨🏻‍💻')

    const imageUrl = icono 

let messageText = `
🤖 *𝘼𝙚𝙤𝙬𝙭 𝙐𝙡𝙩𝙧𝙖*
👤 *Creador:* El Calacas 
🌐 *Canal:* https://whatsapp.com/channel/0029Vb6Ys0q6xCSV5iyFfw1T` 

    await conn.sendMessage(m.chat, {
      video: { url: './owner/banner.mp4' }, 
      caption: messageText,
      footer: '*⚡ Somos Calidad*',
      buttons: [
        {
          buttonId: `${usedPrefix}code`,
          buttonText: { displayText: "🤖 𝗖𝗼𝗱𝗲" },
          type: 1,
        },
        {
          buttonId: `${usedPrefix}menu`,
          buttonText: { displayText: "📜 𝗠𝗲𝗻𝘂" },
          type: 1,
        },
      ],
      headerType: 4
    }, { quoted: m })

  } catch (error) {
    console.error('Error:', error) 
  }
}

handler.help = ['creador']
handler.tags = ['info']
handler.command = ['owner', 'creator', 'creador', 'dueño', 'sc', 'script']

export default handler