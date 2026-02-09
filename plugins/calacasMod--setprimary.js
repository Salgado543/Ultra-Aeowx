import ws from 'ws'

async function before(m, { conn, chat, isAdmin, isOwner }) {

  if (!m.text) return

  const text = m.text.toLowerCase().trim()

  // 🔥 autodetección directa
  if (!text.startsWith('!setprimary') && !text.startsWith('.setprimary')) return

  // ⛔ SOLO ADMINS (o owner)
  if (!isAdmin && !isOwner) {
    //await conn.reply(m.chat, '⛔ Solo los administradores pueden usar este comando', m)
    return true
  }

  const subBots = [...new Set(
    global.conns
      .filter(c => c.user && c.ws?.socket && c.ws.socket.readyState !== ws.CLOSED)
      .map(c => c.user.jid)
  )]

  if (global.conn?.user?.jid && !subBots.includes(global.conn.user.jid)) {
    subBots.push(global.conn.user.jid)
  }
  
  const mentionedJid = await m.mentionedJid 

  const mentioned = mentionedJid[0] ? mentionedJid[0] : m.quoted ? await m.quoted.sender : false 

  if (!mentioned) return true 
  
  chat.primaryBot = mentioned

  await m.react('✔️') 

  return true // ⛔ corta otros plugins
}

// 👇 permite que funcione aunque no sea bot primario
before.allowWhenNotPrimary = true

export { before }