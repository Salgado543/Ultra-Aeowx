import axios from 'axios';
import { exec as execChild } from "node:child_process";
import fetch from 'node-fetch'; 
import fs from "node:fs";
import path from "node:path";
import { writeFile } from "fs/promises";
import ffmpeg from 'fluent-ffmpeg'
import cheerio from "cheerio";
import { lookup } from 'mime-types' 
import { File } from "megajs" 

let data = 0; 
let urlMega = 0; 
let urlM = 0; 

function formatBytes(bytes) {
if (bytes === 0) return '0 Bytes'
const k = 1024
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
const i = Math.floor(Math.log(bytes) / Math.log(k))
return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
} 

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const react = emoji => m.react(emoji);

  if (!text) return conn.reply(m.chat, `⚡️ Uso: ${usedPrefix}${command} <nombre del juego de psp>`, m); 

  await react('🎮');

  try {
    


// Prueba
(async () => {
  const resultado = await primerResultadoGamezfull(
    text
  );
  console.log(resultado);
  data = await extraerV(
    resultado.link
  ); 
  console.log(data); 
  try{urlM = await obtenerLinkMediafire(data.v);}catch{} 
  try{urlMega = await obtenerLinkMega(data.v); 
  }catch{}


const res3 = await fetch("https://files.catbox.moe/wfd0ze.jpg")
    const thumb3 = Buffer.from(await res3.arrayBuffer())

    const fkontak = {
      key: { fromMe: false, participant: "0@s.whatsapp.net" },
      message: {
        documentMessage: {
          title: `『 ${resultado.title} 』`,
          fileName: global.botname || "Shadow Bot",
          jpegThumbnail: thumb3
        }
      }
    }

    const caption = `
✧━───『 info del juego 』───━✧

🎼 𝑻𝒊́𝒕𝒖𝒍𝒐: ${resultado.title}

✧━───『 ChuchoBot 』───━✧
💀El calacas Mod💀
`

    const thumb = (await conn.getFile(resultado.image)).data
    await conn.sendMessage(
      m.chat,
      {
        image: thumb,
        caption,
        footer: "⚡ Games ⚡",
        buttons: [
          { buttonId: `mega ${urlMega}`, buttonText: { displayText: "🔻Mega" }, type: 1 },
          { buttonId: `mediafire ${urlM}`, buttonText: { displayText: "⬇️Mediafire" }, type: 1 }
        ],
        headerType: 4
      },
      { quoted: fkontak }
      
       
      
    ) 
    
    })(); 

    await react('✅'); 
    
  } catch (e) {
    await react('❌'); 
    
    return m.reply(`📌 *ERROR:* ${e.message}`);
  }
}; 

handler.before = async (m, { conn, text, usedPrefix}) => {
  const selected = m?.message?.buttonsResponseMessage?.selectedButtonId
  if (!selected) return 

  const parts = selected.split(" ")
  const cmd = parts.shift()
  const url = parts.join(" ") 

  if (['mega', 'mediafire'].includes(cmd)) {
  
  // Prueba
(async () => {
  const pass = await extraerPasswordGratispaste(
    data.v
  );

  if (pass) {
    console.log("🔐 Contraseña: ", pass);
    return sendPass(conn, m, url, pass) 
  } else {
    console.log("✅ No hay contraseña");
  }
})(); 
  }
  
  if(cmd === 'mega'){
  
  try {
await m.react('🕒')
const file = File.fromURL(url)
await file.loadAttributes()
let maxSize = 300 * 1024 * 1024;
if (file.size >= maxSize) {
return conn.reply(m.chat, `ꕥ El archivo es demasiado pesado (Peso máximo: 3009MB).`, m)
}
let cap = `*乂 ¡MEGA - DOWNLOADER! 乂*

≡ Nombre : ${file.name}
≡ Tamaño : ${formatBytes(file.size)}
≡ URL: ${url}`
m.reply(cap)
const data = await file.downloadBuffer()
const fileExtension = path.extname(file.name).toLowerCase()
const mimeTypes = {
".mp4": "video/mp4",
".pdf": "application/pdf",
".zip": "application/zip",
".rar": "application/x-rar-compressed",
".7z": "application/x-7z-compressed",
".jpg": "image/jpeg",
".jpeg": "image/jpeg",
".png": "image/png",
}
let mimetype = mimeTypes[fileExtension] || "application/octet-stream"
await conn.sendFile(m.chat, data, file.name, "", m, null, { mimetype, asDocument: true })
await m.react('✔️')
} catch (e) {
await m.react('✖️')
return conn.reply(m.chat, `⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${e.message}`, m)
} 
  
  }
  
  if(cmd === 'mediafire'){
  
  try {
await m.react('🕒')
const res = await fetch(`${global.APIs.delirius.url}/download/mediafire?url=${encodeURIComponent(url)}`)
const json = await res.json()
const data = json.data
if (!json.status || !data?.filename || !data?.link) { throw 'ꕥ No se pudo obtener el archivo desde Delirius.' }
const filename = data.filename
const filesize = data.size || 'desconocido'
const mimetype = data.mime || lookup(data.extension?.toLowerCase()) || 'application/octet-stream'
const dl_url = data.link.includes('u=') ? decodeURIComponent(data.link.split('u=')[1]) : data.link
const caption = `乂 MEDIAFIRE - DESCARGA 乂\n\n✩ Nombre » ${filename}\n✩ Peso » ${filesize}\n✩ MimeType » ${mimetype}\n✩ Enlace » ${url}`
await conn.sendMessage(m.chat, { document: { url: dl_url }, fileName: filename, mimetype, caption }, { quoted: m })
await m.react('✔️')
} catch (e) {
await m.react('✖️')
return conn.reply(m.chat, `⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${e.message}`, m)
} 
} 
  
} 

const sendPass = async (conn, m, url, pass) => {
  try {
      const sent = await conn.sendMessage(m.chat, { text: '🔐 Contraseña: ' + pass }, { quoted: m })
    
  } catch (e) {
    
  }
} 

async function extraerPasswordGratispaste(v) {
const url = 'https://www.gratispaste.com/?v=' + v; 
  const res = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0"
    }
  });

  const html = await res.text();
  const $ = cheerio.load(html);

  let password = null;

  $("span").each((_, el) => {
    const text = $(el).text().trim();

    if (/contrase/i.test(text)) {
      // Ej: "Contraseña: www.gamezfull.com"
      password = text
        .replace(/contraseñ?a\s*:/i, "")
        .trim();
      return false; // salir del loop
    }
  });

  return password; // null si no existe
} 

async function extraerV(urlJuego) {
  const res = await fetch(urlJuego, {
    headers: {
      "user-agent": "Mozilla/5.0"
    }
  });

  const html = await res.text();
  const $ = cheerio.load(html);

  // Botón MediaFire
  const exitLink = $("a.download-button-green").attr("href");

  if (!exitLink) {
    throw new Error("No se encontró el botón MediaFire");
  }

  // Parsear URL exit.php
  const exitUrl = new URL(exitLink);
  const encodedUrl = exitUrl.searchParams.get("url");

  // Decodificar
  const decodedUrl = decodeURIComponent(encodedUrl);

  // Obtener el parámetro v
  const finalUrl = new URL(decodedUrl);
  const v = finalUrl.searchParams.get("v");

  return {
    exitLink,
    decodedUrl,
    v
  };
}

async function obtenerLinkMediafire(v) {
  const url = 'https://www.gratispaste.com/?v=' + v; 

  const res = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0"
    }
  });

  const html = await res.text();
  const $ = cheerio.load(html);

  let mediafireLink = null;

  // Buscar cualquier enlace que apunte a mediafire
  $("a").each((_, el) => {
    const href = $(el).attr("href");
    if (href && href.includes("mediafire.com")) {
      mediafireLink = href;
      return false; // salir del loop
    }
  });

  if (!mediafireLink) {
    throw new Error("No se encontró link MediaFire");
  }

  console.log("MediaFire:", mediafireLink);
  return mediafireLink;
} 

async function obtenerLinkMega(v) {
  const url = 'https://www.gratispaste.com/?v=' + v; 

  const res = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0"
    }
  });

  const html = await res.text();
  const $ = cheerio.load(html);

  let mediafireLink = null;

  // Buscar cualquier enlace que apunte a mediafire
  $("a").each((_, el) => {
    const href = $(el).attr("href");
    if (href && href.includes("mega.nz")) {
      mediafireLink = href;
      return false; // salir del loop
    }
  });

  if (!mediafireLink) {
    throw new Error("No se encontró link MediaFire");
  }

  console.log("Mega:", mediafireLink);
  return mediafireLink;
} 

async function primerResultadoGamezfull(busqueda) {
  const url = `https://www.gamezfull.com/?s=${encodeURIComponent(busqueda)}`;

  const res = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0"
    }
  });

  const html = await res.text();
  const $ = cheerio.load(html);

  // Primer resultado real
  const firstCard = $("#search-results .gaming-card").first();

  if (!firstCard.length) {
    return null;
  }

  const title = firstCard.find(".gaming-title").text().trim();
  const link = firstCard.find(".gaming-title").attr("href");

  // Imagen real (lazy load)
  const img =
    firstCard.find("img").attr("data-lazy-src") ||
    firstCard.find("img").attr("src");

  return {
    title,
    link,
    image: img
  };
}

handler.help = ['ytmp4 <url>', 'ytaudio <url>'];
handler.tags = ['descargas'];
handler.command = ['game'];
handler.group = true
handler.premium = false 

export default handler;