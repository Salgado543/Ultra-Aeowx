import fetch from 'node-fetch'

let handler = async (m, { conn, args }) => {
let mentionedJid = await m.mentionedJid
let userId = mentionedJid && mentionedJid[0] ? mentionedJid[0] : m.sender
let totalreg = Object.keys(global.db.data.users).length

// MENÚ DETALLADO (ESTILO ORIGINAL)
let txt = `꒰  ✿ ᪲    ׄ    𝗪𝗲𝗹𝗰𝗼𝗺𝗲 🌑⃨᪲    稜
    🦦ᩖ ¿Cómo está todo?
> 𓂃ෆ˚ Feliz día ✦

🌴 \`Tipo:\` ${(conn.user.jid == global.conn.user.jid ? 'Principal' : 'Sub-Bot')}
🥥 \`𝖴𝗌𝖾𝗋𝗌:\` ${totalreg.toLocaleString()}

> 𝖫𝗂𝗌𝗍𝖺 𝖽𝖾 comandos 𝖽𝗂𝗌𝗉𝗈𝗇𝗂𝖻𝗅𝖾𝗌.

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

🌸 *ANIME (Acciones & Reacciones)*
• #angry • #bath ⮕ Enojado / Bañarse
• #bite • #bleh ⮕ Morder / Lengua
• #blush • #bored ⮕ Sonrojarse / Aburrido
• #clap • #coffee ⮕ Aplaudir / Café
• #cry • #cuddle ⮕ Llorar / Acurrucarse
• #dance • #dramatic ⮕ Bailar / Drama
• #drunk • #eat ⮕ Borracho / Comer
• #facepalm • #happy ⮕ Palmada / Feliz
• #hug • #impregnate ⮕ Abrazar / Embarazar
• #kill • #kiss ⮕ Matar / Besar
• #kisscheek • #laugh ⮕ Beso mejilla / Reír
• #lick • #love ⮕ Lamer / Amor
• #pat • #poke ⮕ Acariciar / Picar
• #pout • #punch ⮕ Puchero / Golpear
• #run • #sad ⮕ Correr / Triste
• #scared • #seduce ⮕ Asustado / Seducir
• #shy • #slap ⮕ Tímido / Bofetada
• #sleep • #smoke ⮕ Dormir / Fumar
• #spit • #step ⮕ Escupir / Pisar
• #think • #walk ⮕ Pensar / Caminar
• #wink • #cringe ⮕ Guiñar / Cringe
• #smug • #smile ⮕ Presumir / Sonreír
• #highfive • #bully ⮕ Chocar 5 / Bullying
• #handhold • #wave ⮕ Tomar mano / Saludar
• #waifu • #ppcouple ⮕ Waifu Random / Parejas

🔞 *NSFW (Solo Chats Permitidos)*
• #r34 • #danbooru • #gelbooru ⮕ Buscadores H
• #xvideos • #xnxx ⮕ Descargas +18

🧩 *FUN & GAMES (Diversión)*
• #pokedex ⮕ Info Pokémon
• #top ⮕ Rankings varios
• #sorteo ⮕ Realizar sorteo
• #ship • #shippear ⮕ Parejas random
• #personalidad ⮕ Test personalidad
• #formarpareja ⮕ Casamentero
• #gay • #lesbiana ⮕ Medidor LGBT
• #doxear • #doxeo ⮕ Broma hack

👑 *OWNER (Solo Dueño)*
• #listonline ⮕ Ver sub-bots online
• #addcoin • #addxp ⮕ Añadir recursos
• #addprem • #delprem ⮕ Gestionar Premium
• #autoadmin ⮕ Auto-Admin
• #backup ⮕ Copia de seguridad
• #resetuser ⮕ Reiniciar usuario
• #cleartmp ⮕ Limpiar caché
• #restart ⮕ Reiniciar bot
• #saveplugin ⮕ Guardar plugin
• #getplugin ⮕ Descargar plugin

> Aeowxs Club
`.trim()

const caption = txt;

await conn.sendMessage(m.chat, { 
video: { url: './owner/banner.mp4' }, 
gifPlayback: true, 
caption : txt,
contextInfo: {
    mentionedJid: [userId]
}}, { quoted: m })

}


handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help', 'commands']

export default handler