import fetch from 'node-fetch'
import path from 'path' 
import fs from "fs"

let handler = async (m, { conn, args }) => {
let mentionedJid = await m.mentionedJid
let userId = mentionedJid && mentionedJid[0] ? mentionedJid[0] : m.sender
let totalreg = Object.keys(global.db.data.users).length
let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length 

let txt = `̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮
✨ *¡HOLA @${userId.split('@')[0]}! SOY ${botname}* ✨
Aquí tienes la lista completa de comandos disponible. 
> 
🤖 *ESTADO DEL SISTEMA*
┌ 🛠️ Tipo: ${(conn.user.jid == global.conn.user.jid ? 'Principal' : 'Sub-Bot')}
│ 👥 Usuarios: ${totalreg.toLocaleString()}
│ 🚀 Versión: ${vs} 
└ 📦 Plugins: ${totalCommands}

💰 *ECONOMY (Sistema Monetario)*
• #w • #work • #trabajar ⮕ Trabajar por coins.
• #slut • #prostituirse ⮕ Ganar coins de forma turbia.
• #crime • #crimen ⮕ Ganar coins rápido.
• #miming • #minar • #mine ⮕ Trabajos de minería.
• #daily • #diario ⮕ Recompensa diaria.
• #cofre • #coffer ⮕ Reclamar tu cofre.
• #weekly • #monthly ⮕ Premios semanales/mensuales.
• #balance • #bal • #bank ⮕ Ver tus coins.
• #deposit • #dep • #d ⮕ Depositar al banco.
• #withdraw • #with • #retirar ⮕ Retirar del banco.
• #givecoins • #pay ⮕ Dar coins a otro usuario.
• #steal • #robar • #rob ⮕ Intentar robar coins.
• #coinflip • #cf ⮕ Apostar a cara o cruz.
• #roulette • #rt ⮕ Apostar en la ruleta.
• #casino • #slot ⮕ Apostar en el casino.
• #economyinfo • #einfo ⮕ Tu info económica.
• #eboard • #baltop ⮕ Ranking de economía.
• #aventura • #adventure ⮕ Ir de aventura.
• #curar • #heal ⮕ Curar salud.
• #cazar • #hunt ⮕ Cazar animales.
• #fish • #pescar ⮕ Ir de pesca.
• #mazmorra • #dungeon ⮕ Explorar mazmorras.
📥 *DOWNLOAD (Descargas & Búsqueda)*
• #tiktok • #tt ⮕ Descargar video de TikTok.
• #play • #ytmp3 • #ytmp4 ⮕ Música o video de YouTube.
• #ytsearch • #search ⮕ Buscar videos en YouTube.
• #facebook • #fb ⮕ Video de Facebook.
• #twitter • #x ⮕ Video de X/Twitter.
• #ig • #instagram ⮕ Reels de Instagram.
• #pinterest • #pin ⮕ Imagen de Pinterest.
• #image • #imagen ⮕ Buscar imagen en Google.
• #apk • #modapk ⮕ App de Aptoide.
• #mediafire • #mf ⮕ Archivo de MediaFire.
• #mega • #mg ⮕ Archivo de MEGA.
• #game ⮕ Buscar juego de PC o PSP.
• #wagroups • #wpgroups ⮕ Buscar grupos de WhatsApp.
🎭 *GACHA (Colección de Personajes)*
• #roll • #rw ⮕ Waifu/Husbando aleatorio.
• #claim • #c ⮕ Reclamar un personaje.
• #harem • #waifus ⮕ Tu colección personal.
• #buycharacter • #buyc ⮕ Comprar personaje.
• #sell • #vender ⮕ Poner en venta.
• #trade • #intercambiar ⮕ Trade con otros.
• #charinfo • #winfo ⮕ Info de un personaje.
• #charimage • #wimage ⮕ Imagen del personaje.
• #deletewaifu • #delchar ⮕ Eliminar personaje.
• #givechar • #regalar ⮕ Dar personaje a otro.
• #robwaifu ⮕ Robar personaje a alguien.
• #haremshop • #wshop ⮕ Tienda de personajes.
• #removesale ⮕ Quitar de la venta.
• #favoritetop • #favtop ⮕ Ranking de favoritos.
• #waifustop • #wtop ⮕ Top personajes valiosos.
• #vote • #votar ⮕ Subir valor de un personaje.
• #serieinfo • #ainfo ⮕ Información de un anime.
• #serielist • #slist ⮕ Lista de series del bot.
• #gachainfo • #ginfo ⮕ Tu estado en Gacha.
• #setclaimmsg ⮕ Cambiar mensaje al reclamar.
• #delclaimmsg ⮕ Reset mensaje de reclamo.
• #giveallharem ⮕ Regalar todo tu harem.
🔌 *SOCKETS (Gestión de Bots)*
• #qr • #code ⮕ Crear tu propio Sub-Bot.
• #bots • #botlist ⮕ Ver bots activos.
• #status • #estado ⮕ Estado del sistema.
• #p • #ping ⮕ Velocidad de respuesta.
• #join ⮕ Unir bot a un grupo.
• #leave • #salir ⮕ Sacar bot del grupo.
• #logout ⮕ Cerrar sesión del bot.
• #setpfp ⮕ Cambiar foto de perfil.
• #setstatus ⮕ Cambiar estado del bot.
• #setusername ⮕ Cambiar nombre del bot.
🛠️ *UTILITIES (Herramientas & IA)*
• #help • #menu ⮕ Ver este menú.
• #ia • #gemini ⮕ Hablar con ChatGPT.
• #iavoz • #aivoz ⮕ ChatGPT modo voz mexicana.
• #dalle • #flux ⮕ Crear imágenes con IA.
• #sticker • #s ⮕ Imagen/Video a Sticker.
• #toimg • #img ⮕ Sticker a Imagen.
• #brat • #qc • #emojimix ⮕ Stickers con texto.
• #setmeta | #delmeta ⮕ Pack y autor de stickers.
• #enhance • #hd ⮕ Mejorar calidad de imagen.
• #tourl • #catbox ⮕ Convertir a enlace URL.
• #traducir • #trad ⮕ Traductor de idiomas.
• #google ⮕ Búsqueda en Google.
• #wiki ⮕ Buscar en Wikipedia.
• #calcular • #cal ⮕ Resolver ecuaciones.
• #letra • #style ⮕ Fuentes de texto.
• #getpic • #pfp ⮕ Ver foto de perfil de alguien.
• #read • #readviewonce ⮕ Ver fotos de una sola vez.
• #ss • #ssweb ⮕ Captura de pantalla web.
• #say ⮕ Repetir un mensaje.
• #gitclone ⮕ Clonar repo de Github.
• #npmdl ⮕ Descargar paquetes NPMJS.
• #reporte ⮕ Informar fallas.
• #sug ⮕ Sugerir funciones.
• #sc • #script ⮕ Repositorio del Bot.
👤 *PROFILES (Tu Perfil)*
• #profile ⮕ Ver tu perfil personal.
• #level • #lvl ⮕ Ver nivel y experiencia.
• #leaderboard • #top ⮕ Top de experiencia.
• #marry • #casarse ⮕ Casarte con alguien.
• #divorce ⮕ Divorciarte.
• #setdescription • #setdesc ⮕ Tu bio.
• #deldesc ⮕ Borrar biografía.
• #setgenre | #delgenre ⮕ Género (H/M).
• #setbirth | #delbirth ⮕ Fecha de cumple.
• #setfav ⮕ Poner personaje favorito.
• #prem • #vip ⮕ Comprar membresía.
🛡️ *GROUPS (Administración)*
• #tagall • #invocar ⮕ Mencionar a todos.
• #admins ⮕ Llamar a los administradores.
• #promote | #demote ⮕ Dar/Quitar admin.
• #kick | #add ⮕ Expulsar o añadir miembros.
• #open | #close ⮕ Abrir o cerrar el chat.
• #bot [on/off] ⮕ Activar/Desactivar bot.
• #antilink [on/off] ⮕ Bloquear enlaces.
• #nsfw [on/off] ⮕ Contenido adulto.
• #welcome [on/off] ⮕ Bienvenidas.
• #setwelcome | #setbye ⮕ Mensajes personalizados.
• #economy [on/off] ⮕ Activar economía.
• #gacha [on/off] ⮕ Activar juegos.
• #onlyadmin [on/off] ⮕ Comandos solo admins.
• #detect • #alertas ⮕ Avisos de cambios.
• #warn | #unwarn ⮕ Dar/Quitar advertencia.
• #advlist ⮕ Lista de advertidos.
• #inactivos • #kickinactivos ⮕ Limpiar grupo.
• #kicknum ⮕ Expulsar por prefijo de país.
• #gpname | #gpdesc | #groupimg ⮕ Editar grupo.
• #del • #delete ⮕ Borrar mensajes de otros.
• #link ⮕ Enlace del grupo.
• #revoke ⮕ Cambiar enlace del grupo.
• #infogrupo ⮕ Información técnica.
• #listonline ⮕ Ver quién está activo.
• #setprimary ⮕ Definir bot principal.
🌸 *ANIME (Acciones & Reacciones)*
• #angry • #bath • #bite • #bleh • #blush
• #bored • #clap • #coffee • #cry • #cuddle
• #dance • #dramatic • #drunk • #eat • #facepalm
• #happy • #hug • #impregnate • #kill • #kiss
• #kisscheek • #laugh • #lick • #love • #pat
• #poke • #pout • #punch • #run • #sad
• #scared • #seduce • #shy • #slap • #sleep
• #smoke • #spit • #step • #think • #walk
• #wink • #cringe • #smug • #smile • #highfive
• #bully • #handhold • #wave • #waifu
• #ppcouple ⮕ Fotos de perfil compartidas.
🔞 *NSFW (Solo Chats Permitidos)*
• #r34 • #danbooru • #gelbooru
• #xvideos • #xnxx (Descargas) 
̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮   ̮
`.trim() 

const caption = txt; 

await conn.sendMessage(m.chat, { 
video: { url: './owner/banner.mp4' }, gifPlayback: true, caption : txt,
contextInfo: {
mentionedJid: [userId],
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterJid: channelRD.id,
serverMessageId: '',
newsletterName: botname
},
externalAdReply: {
title: botname,
body: textbot,
mediaType: 1,
mediaUrl: redes,
sourceUrl: redes,
thumbnail: icono,
thumbnailUrl: redes,
showAdAttribution: false,
previewType: 0,
containsAutoReply: true,
renderLargerThumbnail: false
}

}}, { quoted: m }) 

} 


handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']

export default handler 


