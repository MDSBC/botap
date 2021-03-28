  const
{
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   GroupSettingChange,
   waChatKey,
   mentionedJid,
   processTime,
} = require("@adiwajshing/baileys")


const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const kagApi = require('@kagchi/kag-api')
const fetch = require('node-fetch')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const imgbb = require('imgbb-uploader')
const speed = require('performance-now')
const cd = 4.32e+7
const crypto = require('crypto')
const qrcode = require("qrcode-terminal")
const axios = require('axios')

// Load Js File
const { color, bgcolor } = require('./lib/color')
const { gpessoa } = require('./src/gpessoa')
const { chentai } = require('./src/chentai')
const { destrava } = require('./src/destrava')
const { gbin } = require('./src/gbin')
const { ind } = require('./language')
const { gcpf } = require('./src/gcpf')
const { hackfb } = require('./temporal/hackfb')
const { pack } = require('./src/pack')
const { modapk } = require('./src/modapk')
const { help } = require('./lib/help')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')

// Load Json File
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const antiracismo = JSON.parse(fs.readFileSync('./src/antiracismo.json'))
const antilink = JSON.parse(fs.readFileSync('./src/antilink.json'))
const antifake = JSON.parse(fs.readFileSync('./src/antifake.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
const setiker = JSON.parse(fs.readFileSync('./temp/stik.json'))
const videonye = JSON.parse(fs.readFileSync('./temp/vid.json'))
const audionye = JSON.parse(fs.readFileSync('./temp/vn.json'))
const imagenye = JSON.parse(fs.readFileSync('./temp/image.json'))

const vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + 'FN:Temporal\n' 
            + 'ORG: Pengembang XBot;\n' 
            + 'TEL;type=CELL;type=VOICE;waid=552169706404:+55 21 6970-6404\n' 
            + 'END:VCARD' 
prefix = '!'
blocked = []      
ban = []

/********** LOAD FILE **************/
/********** END FILE ***************/
  
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const arrayBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const bulan = arrayBulan[moment().format('MM') - 1]
const config = {
    XBOT: 'ᏴϴͲ ᎠႮ ᏦᎬᏦᎬ', 
    instagram: 'https://www.instagram.com/kaic_de_paula?r=nametag', 
    nomer: 'wa.me/5511973027044',
    youtube: 'https://youtube.com/channel/UC2a7N-vZ5xrDF-0nfcaUspw', 
    whatsapp: 'Comming soon', 
    tanggal: `TANGGAL: ${moment().format('DD')} ${bulan} ${moment().format('YYYY')}`,
    waktu: time
}

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}


const { tanggal, waktu, instagram, whatsapp, youtube, nomer, ontime } = config



const client = new WAConnection()

client.on('qr', qr => {
   qrcode.generate(qr, { small: true })
   console.log(`[ ${time} ] QR code is ready, subrek dulu yak ambipi team`)
})

client.on('credentials-updated', () => {
   const authInfo = client.base64EncodedAuthInfo()
   console.log(`credentials updated!`)

   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t'))
})

fs.existsSync('./session.json') && client.loadAuthInfo('./session.json')

client.connect();

// client.on('user-presence-update', json => console.log(json.id + ' presence is => ' + json.type)) || console.log(`${time}: Bot by ig:@affis_saputro123`)

client.on('group-participants-update', async (anu) => {
  const mdata = await client.groupMetadata(anu.jid)
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Olá @${num.split('@')[0]}\ Seja bem vindo ao grupo *${mdata.subject}* Não seja um ghost e evite banimentos 🌹`
				let buff = Buffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Vai pela sombra👉 @${num.split('@')[0]} pq bosta no sol seca 😂`
				let buff = Buffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
	client.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})
	client.on('message-new', async (mek) => {
		try {
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)

			mess = {
				wait: 'AGUARDE ESTOU PROCESSANDO❬❗❭',
				success: '️❬ ❗ ❭ PRONTO',
				error: {
					stick: 'Eu falhei :( desculpa',
					Iv: 'Desculpe, o link está inválido☹️'
				},
				only: {
					group: 'COMANDO SÓ PODE SER EXECUTADO EM GRUPOS❬❗❭ ',
					benned: '*Você foi banido, trouxa.*',
					ownerG: 'COMANDO EXCLUSIVO PARA O PROPRIETÁRIO DO BOT.❬❗❭ ',
					ownerB: 'COMANDO EXCLUSIVO PARA O PROPRIETÁRIO DO BOT.❬❗❭  ',
					admin: ' COMANDO PERMITIDO SOMENTE PARA ADMS ❬ ⚠️ ❭ ',
					Badmin: 'O BOT PRECISA SER ADM PARA EXECUTAR ESSE COMANDO! ;3 '
				}
			}

			const botNumber = client.user.jid
			const ownerNumber = ["5511985409645@s.whatsapp.net"] 
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			pushname = client.contacts[sender] != undefined ? client.contacts[sender].vname || client.contacts[sender].notify : undefined
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
            const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
      const isAntiLink = isGroup ? antilink.includes(from) : false
const isAntiFake = isGroup ? antifake.includes(from) : false
      const isAntiRacismo = isGroup ? antiracismo.includes(from) : false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isBanned = ban.includes(sender)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
			
			
			
			//--MessageType

const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')



			if (text.includes("ip"))
  { const aris = text.replace(/!ip /, "") 
  axios.get(`https://mnazria.herokuapp.com/api/check?ip=${aris}`).then((res) =>{ 
  let hasil = ` *🔍CONSULTA REALIZADA🔍* \n\n ➸ *CIDADE:*  ${res.data.city}\n ➸ *Latitude* : ${res.data.latitude}\n ➸ *Longtitude* : ${res.data.longitude}\n ➸ *REGIÃO* : ${res.data.region_name}\n ➸ *UF* : ${res.data.region_code}\n ➸ *IP* : ${res.data.ip}\n ➸ *TIPO* : ${res.data.type}\n ➸ *CEP* : ${res.data.zip}\n ➸ *LOCALIDADE* : ${res.data.location.geoname_id}\n ➸ *CAPITAL* : ${res.data.location.capital}\n ➸ *DDD* : ${res.data.location.calling_code}\n ➸ *PAÍS* : ${res.data.location.country_flag_emoji}\n *📌BY:May Bot*` 
  conn.sendMessage(id, hasil, MessageType.text); 
 })
 }

if (text.includes("cpf")){
const aris = text.replace(/!cpf /, "")
axios.get(`http://geradorapp.com/api/v1/cpf/generate?token=${aris}`).then((res) => {
	conn.sendMessage(id, '[❗] ESPERE ESTOU BUSCANDO DADOS', MessageType.text)
         let ecpf = `*🔍CONSULTA REALIZADA🔍* \n\n ➸ *CPF:* ${res.data.CPF} \n\n ➸ *NOME:* ${res.data.Nome}\n\n ➸ *MÃE:* ${res.data.NomeMae} \n\n ➸ *NASCIMENTO:* ${res.data.DataNascimento} \n\n ➸ *RUA:* ${res.data.Rua} \n\n ➸ *N°:* ${res.data.NumeroRua}\n\n ➸ *COMPLEMENTO:* ${res.data.Complemento}\n\n ➸ *BAIRRO:* ${res.data.Bairro}\n\n ➸ *CEP:* ${res.data.CEP}\n\n ➸ *UF:* ${res.data.EstadoSigla}\n\n ➸ *CIDADE:* ${res.data.Cidade}\n\n ➸ *ESTADO:* ${res.data.Estado}\n\n ➸ *PAIS:* ${res.data.Pais}  \n\n *📌BY:May Bot* `;
    conn.sendMessage(id, ecpf ,MessageType.text);
}) 
}

if (text.includes("geradorcpf")){
const aris = text.replace(/!geradorcpf/, "")
axios.get(`http://geradorapp.com/api/v1/cpf/generate?token=40849779ec68f8351995def08ff1e2fa`).then((res) => {
	conn.sendMessage(id, '[❗] ESPERE ESTA PROCESSANDO', MessageType.text)
         let cpf = `*🔍CPF GERADOS🔍* \n\n ➸ *CPF:* ${res.data.data.number}  \n\n *📌BY:May Bot*`;
    conn.sendMessage(id, cpf ,MessageType.text);
})
}

if (messagesC.includes("fdp")){
			client.updatePresence(from, Presence.composing)
			reply("teu pai")
	}
	
		if (messagesC.includes("corno")){
			client.updatePresence(from, Presence.composing)
			reply("vsfd seu merda")
	}
	
	if (messagesC.includes("temporal")){
			client.updatePresence(from, Presence.composing)
			reply("quem te deu direito de falar o nome do meu criador?")
	}
	
		if (messagesC.includes("tmnc")){
			client.updatePresence(from, Presence.composing)
			reply("vai vc, tu ja me disse q é mo bom")
	}
	
		if (messagesC.includes("vsfd")){
			client.updatePresence(from, Presence.composing)
			reply("bora juntos?")
	}
	
		if (messagesC.includes("cadebot")){
			client.updatePresence(from, Presence.composing)
			reply("olha eu aqui carai")
	}
	
	if (messagesC.includes("Gabriel")){
			client.updatePresence(from, Presence.composing)
			reply("o nome dele é Temporal, vsfd mlk.")
	}
	
		if (messagesC.includes("bot")){
		client.updatePresence(from, Presence.composing)
		const loli = fs.readFileSync('./mp3/hai.m4a')
        client.sendMessage(from, loli, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
        }
	
			if (messagesC.includes("bah")){
			client.updatePresence(from, Presence.composing)
			tujuh = fs.readFileSync('./mp3/bah.mp3');
            client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
	}
	
	if (messagesC.includes("misael")){
			client.updatePresence(from, Presence.composing)
			tujuh = fs.readFileSync('./mp3/misael.mp3');
            client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
	}
	
	if (messagesC.includes("motorista")){
			client.updatePresence(from, Presence.composing)
			tujuh = fs.readFileSync('./mp3/motorista.mp3');
            client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
	}
	
	if (messagesC.includes("toto")){
			client.updatePresence(from, Presence.composing)
			tujuh = fs.readFileSync('./mp3/toto.mp3');
            client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
	}
	
	        if (messagesC.includes("sexo")){
			client.updatePresence(from, Presence.composing)
			tujuh = fs.readFileSync('./mp3/Sexo.mp3');
            client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
	}
	
				if (messagesC.includes("canta")){
			client.updatePresence(from, Presence.composing)
			tujuh = fs.readFileSync('./mp3/canto.mp3');
            client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
	}
 
 if (messagesC.includes("bandido")){

			client.updatePresence(from, Presence.composing)

			tujuh = fs.readFileSync('./mp3/xereca.mp3');
            client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
	}
	
	if (messagesC.includes("banido")){

			client.updatePresence(from, Presence.composing)

			tujuh = fs.readFileSync('./mp3/banido.mp3');
            client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
	}
	
 if (messagesC.includes("preto")){
		if (!isGroup) return
		if (!isAntiRacismo) return
		if (isGroupAdmins) return reply('cara, nao fale essas coisas, é errado, mas vc e admin n irei te banir')
		client.updatePresence(from, Presence.composing)
		if (messagesC.includes("#izinadmin")) return reply("#izinadmin diterima")
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`tchau racista ${sender.split("@")[0]} voce sera expulso deste grupo em 5 segundos`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 5000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("Nesse grupo, não gostamos de racismos, que isso sirva de exemplo 🚶")
		}, 4000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("2 segundos")
		}, 3000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("3 segundos")
		}, 2000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("4 segundos")
		}, 1000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("5 segundo KKKKKKKK tchau otário 😔🤙")
		}, 0)
	}
	
	        if (messagesC.includes("seupreto")){
		if (!isGroup) return
		if (!isAntiRacismo) return
		if (isGroupAdmins) return reply('cara, nao fale essas coisas, é errado, mas vc e admin n irei te banir')
		client.updatePresence(from, Presence.composing)
		if (messagesC.includes("#izinadmin")) return reply("#izinadmin diterima")
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`tchau racista ${sender.split("@")[0]} voce sera expulso deste grupo em 5 segundos`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 5000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("1 segundo")
		}, 4000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("2 segundos")
		}, 3000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("3 segundos")
		}, 2000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("4 segundos")
		}, 1000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("5 segundo KKKKKKKK tchau otário 😔🤙")
		}, 0)
	}
	
	        if (messagesC.includes("macaco")){
		if (!isGroup) return
		if (!isAntiRacismo) return
		if (isGroupAdmins) return reply('cara, nao fale essas coisas, é errado, mas vc e admin n irei te banir')
		client.updatePresence(from, Presence.composing)
		if (messagesC.includes("#izinadmin")) return reply("#izinadmin diterima")
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`tchau racista ${sender.split("@")[0]} voce sera expulso deste grupo em 5 segundos`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 5000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("1 segundo")
		}, 4000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("2 segundos")
		}, 3000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("3 segundos")
		}, 2000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("4 segundos")
		}, 1000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("5 segundo KKKKKKKK tchau otário 😔🤙")
		}, 0)
	}
	
	        if (messagesC.includes("pretoimundo")){
		if (!isGroup) return
		if (!isAntiRacismo) return
		if (isGroupAdmins) return reply('cara, nao fale essas coisas, é errado, mas vc e admin n irei te banir')
		client.updatePresence(from, Presence.composing)
		if (messagesC.includes("#izinadmin")) return reply("#izinadmin diterima")
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`tchau racista ${sender.split("@")[0]} voce sera expulso deste grupo em 5 segundos`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 5000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("1 segundo")
		}, 4000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("2 segundos")
		}, 3000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("3 segundos")
		}, 2000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("4 segundos")
		}, 1000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("5 segundo KKKKKKKK tchau otário 😔🤙")
		}, 0)
	}
	
	        if (messagesC.includes("pq vc e preto")){
		if (!isGroup) return
		if (!isAntiRacismo) return
		if (isGroupAdmins) return reply('cara, nao fale essas coisas, é errado, mas vc e admin n irei te banir')
		client.updatePresence(from, Presence.composing)
		if (messagesC.includes("#izinadmin")) return reply("#izinadmin diterima")
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`tchau racista ${sender.split("@")[0]} voce sera expulso deste grupo em 5 segundos`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 5000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("1 segundo")
		}, 4000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("2 segundos")
		}, 3000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("3 segundos")
		}, 2000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("4 segundos")
		}, 1000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("5 segundo KKKKKKKK tchau otário 😔🤙")
		}, 0)
	}
	
	        if (messagesC.includes("://chat.whatsapp.com/")){
		if (!isGroup) return
		if (!isAntiLink) return
		if (isGroupAdmins) return reply('vc é admin, então n irei te dar ban por usar links, rlx 🙂')
		client.updatePresence(from, Presence.composing)
		if (messagesC.includes("#izinadmin")) return reply("#izinadmin diterima")
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`link detectado ${sender.split("@")[0]} voce sera expulso deste grupo em 5 segundos`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 5000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("1 segundo")
		}, 4000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("2 segundos")
		}, 3000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("3 segundos")
		}, 2000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("4 segundos")
		}, 1000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("5 segundo KKKKKKKK tchau otário 😔🤙")
		}, 0)
	}
 
  if (messagesC.includes("https://")){
		if (!isGroup) return
		if (!isAntiLink) return
		if (isGroupAdmins) return reply('vc é admin, então n irei te dar ban por usar links, rlx 🙂')
		client.updatePresence(from, Presence.composing)
		if (messagesC.includes("#izinadmin")) return reply("#izinadmin diterima")
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`link detectado ${sender.split("@")[0]} voce sera expulso deste grupo em 5 segundos`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 5000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("1 segundo")
		}, 4000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("2 segundos")
		}, 3000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("3 segundos")
		}, 2000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
reply("5 segundo KKKKKKKK tchau otário 😔🤙")
		}, 0)
	}
	
			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			switch(command) {
				case 'help': 
				case 'menu':
				case 'ajuda':
				  if (isBanned) return reply(mess.only.benned)
					client.sendMessage(from, help(prefix, pushname), text)
					wew = fs.readFileSync(`./jpg/temporal.jpg`)
					break
				case 'donasi':
				case 'donate':
					client.sendMessage(from, donasi(), text)
				break
				case 'info':
					me = client.user
					uptime = process.uptime()
					teks = `nome do bot : ${me.name}\n*numero do bot* : @${me.jid.split('@')[0]}\n*sigla dos comandos* : ${prefix}\nnumeros bloqueados : ${blocked.length}\no bot esta ativo desde : ${kyun(uptime)}\n`
					buffer = Buffer(me.imgUrl)
					client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
				case 'listabloq': 
					teks = 'vezes q fui da KMKZ/dei bloq :\n'
					for (let block of blocked) {
						teks += `➢ @${block.split('@')[0]}\n`
					}
					teks += `total : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break
                case 'hidetag':
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply('quem e vc?')
					var value = body.slice(9)
					var group = await client.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: mek
					}
					client.sendMessage(from, options, text)
					break
case 'lofi':
					memein = await kagApi.memeindo()
					buffer = Buffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9hZBPRo16fIhsIus3t1je2oAU23pQqBpfw&usqp=CAU`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '️amoo lofi'})
					break
case 'roleta':
	client.sendMessage(from, buffer, image, {quoted: mek, caption: '️Você morreu, Bang!🔫'})
	 break
case 'vida':
	client.sendMessage(from, buffer, image, {quoted: mek, caption: '️Você tem mais uma chance'})
	break 
case 'gay':		
if (isBanned) return reply(mess.only.benned) 
	            	if (args.length < 1) return reply('marque seus amigos!')
					rate = body.slice(1)
					const ti =['4','9','17','28','34','48','59','62','74','83','97','100','29','94','75','82','41','39']
					const kl = ti[Math.floor(Math.random() * ti.length)]
					client.sendMessage(from, 'Como você é gay: *'+rate+'*\n\nSua porcentagem gay : '+ kl+'%', text, { quoted: mek })
					break
case 'dado':    
					if (isBanned) return reply(mess.only.benned) 
					
					kapankah = body.slice(1)
					const elu =['1','2','3','4','5','6']
					const ule = elu[Math.floor(Math.random() * elu.length)]
					client.sendMessage(from, ule, text, { quoted: mek })
					break
case 'gbin':
 if (isBanned) return reply(mess.only.benned)
                    client.sendMessage(from, gbin(prefix), text, { quoted: mek })
                    break
case 'gpessoa':
         if (isBanned) return reply(mess.only.benned)  
                    client.sendMessage(from, gpessoa(prefix), text, { quoted: mek })
                    break
case 'destrava':
                  if (isBanned) return reply(mess.only.benned)  
                    client.sendMessage(from, destrava(prefix), text, { quoted: mek })
                    break
case 'chentai':
               if (isBanned) return reply(mess.only.benned)
                    client.sendMessage(from, chentai(prefix), text, { quoted: mek })
                    break
case 'gcpf':
                  if (isBanned) return reply(mess.only.benned)
                    client.sendMessage(from, gcpf(prefix), text, { quoted: mek })
                    break
case 'modapk':
                     if (isBanned) return reply(mess.only.benned)
                    client.sendMessage(from, modapk(prefix), text, { quoted: mek })
                    break
case 'pack':
                    if (isBanned) return reply(mess.only.benned)
                    client.sendMessage(from, pack(prefix), text, { quoted: mek })
                    break
case 'pes':
                    teks = body.slice(7)
                    anu = await fetchJson(`https://triunfo.pe.gov.br/wp-json/wp/v2/posts?search=${teks}`)
			        ipl = `NOTICIAS ${teks} 🐊🚩

➸ *ID:* ${anu.id}
➸ *DATA*: ${anu.date}
➸ *LINK NOTÍCIA*: ${anu.link}
➸ *TÍTULO*: ${anu.title}
➸ *FONTE*: ${anu.slug}`
			        reply(ipl)
					break
					  case 'carta':
                    if (args.length < 1) return reply(mess.blank)
					teks = body.slice(7)
					if (teks.length > 30) return reply('ate 30 caracteres')
                    anu = await fetchJson(`https://deckofcardsapi.com/api/deck/${teks}/draw/?count=2`)
			        carta = `INFORMAÇÕES DA SUA CARTA

➳ IMAGEM DA CARTA: ${anu.image}
➳ VALOR: ${anu.data.value}
➳ TRAJE: ${anu.data.suit}
➳ CARTA: ${anu.code}

➳ SUAS CARTAS RESTANTES: ${anu.remaining}

Eae, ganhou do seu oponente 😳`
			        reply(carta)
					break
                 case 'logoph':
					var gh = body.slice(9)
					var gbl1 = gh.split("|")[0];
					var gbl2 = gh.split("|")[1];
					if (args.length < 1) return reply('escolha um txt burro')
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/textpro?theme=pornhub&text1=${gbl1}&text2=${gbl2}`, {method: 'get'})
					buffer = Buffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					break
case 'bmerc':
					if (args.length < 1) return reply(mess.blank)
					teks = body.slice(7)
					if (teks.length > 30) return reply('O id é longo, até 30 caracteres')
                    anu = await fetchJson(`https://api.mercadolibre.com/applications/${teks}`)
			        merc = `INFORMAÇÕS DO PRODUTO 🐊🚩

➳ ID DO PRODUTO: ${anu.id}
➳ NOME DO PRODUTO: ${anu.name}
➳ LINK: ${anu.url}
➳ DESCRIÇÃO: ${anu.description}

📌 BY: Temporal Bot `
			        reply(merc)
					break
case 'bin':
					lxrd = body.slice(6)
                    data = await fetchJson(`https://binlist.io/lookup/${lxrd}`, {method: 'get'})
                    if (data.error) return reply(data.error)
                    kinybin = `*🔍CONSULTA REALIZADA🔍* \n\n ➸ *BIN:*  ${data.number.iin}\n ➸ *Bandeira* : ${data.scheme}\n ➸ *TIPO* : ${data.type}\n ➸ *Categoria* : ${data.category}\n ➸ *UF* : ${data.country.alpha2} \n ➸ *Sigla* : ${data.country.alpha3}\n ➸ *País* : ${data.country.name} ${data.country.emoji} \n ➸ *Banco* : ${data.bank.name} \n ➸ *URL* : ${data.bank.url}`
                    client.sendMessage(from, kinybin, text, {quoted: mek})
                    await limitAdd(sender)
                    break
case 'bemvindo':
tujuh = fs.readFileSync('./mp3/bv.mp3');
client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'lilpeep':
tujuh = fs.readFileSync('./mp3/lilpeep.mp3');
client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'xerequinha':
tujuh = fs.readFileSync('./mp3/xerequinha.mp3');
client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'cv':
tujuh = fs.readFileSync('./mp3/cv.mp3');
client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'hylander':
tujuh = fs.readFileSync('./mp3/hylander.mp3');
client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'suicideboys':
tujuh = fs.readFileSync('./mp3/suicideboys.mp3');
client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'banhodeleite':
tujuh = fs.readFileSync('./mp3/banhodeleite.mp3');
client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'xxx':
tujuh = fs.readFileSync('./mp3/xxx.mp3');
client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'm4':
tujuh = fs.readFileSync('./mp3/m4.mp3');
client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'eminem':
tujuh = fs.readFileSync('./mp3/eminem.mp3');
client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'oii':
case 'ola':  
case 'oie':
tujuh = fs.readFileSync('./mp3/.mp3');
client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'hublogo':
		    	    daddy = `${body.slice(9)}`
			        texto1 = daddy.split("/")[0];
		     	    texto2 = daddy.split("/")[1];
		     	    reply('*Aguarde Estou Fazendo...*')
		      	    buffer = Buffer(`https://budenter.sirv.com/Images/hublogo.jpg?w=500&text.0.text=${texto1}&text.0.position.gravity=northwest&text.0.position.x=19%25&text.0.position.y=45%25&text.0.size=38&text.0.color=ffffff&text.0.opacity=94&text.0.font.family=Paytone%20One&text.1.text=${texto2}&text.1.position.gravity=northwest&text.1.position.x=59%25&text.1.position.y=46%25&text.1.size=19&text.1.color=000000&text.1.font.family=Paytone%20One&text.1.background.color=ffbe00&text.1.background.opacity=100`)
	      		    client.sendMessage(from, buffer, image, {quoted: mek, caption: '*Aqui está Amigo(a)*'})
			        break
case 'plogo':
					if (args.length < 1) return reply(mess.blank)
					teks = body.slice(7)
					if (teks.length > 15) return reply('O texto é longo, até 15 caracteres')
					reply('*Estou fazendo, se der erro tente novamente ✓*')
					buffer = await getBuffer(`https://clutamac.sirv.com/1011b781-bab1-49e3-89db-ee2c064868fa%20(1).jpg?text.0.text=${teks}&text.0.position.gravity=northwest&text.0.position.x=22%25&text.0.position.y=60%25&text.0.size=18&text.0.color=000000&text.0.opacity=47&text.0.font.family=Roboto%20Mono&text.0.font.style=italic`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '*PRONTINHO ✓*'})
					break
case 'amor':
			    love = `${body.slice(7)}`
			    lo = love.split("/")[0];
			    ve = love.split("/")[1];
			    reply('*Estou fazendo, se der erro tente novamente ✓*')
			    buffer = await getBuffer(`https://assets.imgix.net/examples/couple.jpg?txt64=VEUgQU1PIOKdpO-4jw&txt-font=bold&txt-align=middle%20center&txt-size=${lo}&blur=${ve}&txt-color=FF0000`, {method: 'get'})
			    client.sendMessage(from, buffer, image, {quoted: mek, caption: '*PRONTINHO ✓*'})
			    await limitAdd(sender) 
			    break  
			    case 'frase':
			    nobg = `${body.slice(7)}`
			    no = nobg.split("/")[0];
			    bg = nobg.split("/")[1];
			    reply('*Estou fazendo, se der erro tente novamente ✓*')
			    buffer = await getBuffer(`https://api.ritekit.com/v2/image/quote?text=${no}&author=${bg}&textFont=Lora&textColor=%23000000&textFontWeight=400&authorFont=Lato&authorColor=%23e5e5e5&authorFontWeight=400&highlightColor=transparent&backgroundColor1=%238686bd&backgroundColor2=%231ddad6&width=400&height=400&client_id=52ad7438afd2baa8779f9266a8a997cd92771f1eb625`, {method: 'get'})
			    client.sendMessage(from, buffer, image, {quoted: mek, caption: '*PRONTINHO ✓*'})
			    await limitAdd(sender) 
			    break
   case 'play':

                reply(mess.wait)

                play = body.slice(5)
                anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp3?q=${play}&apikey=apivinz`)
               if (anu.error) return reply(anu.error)
                 infomp3 = `*MUSICA ENCONTRADA!!!*\nTítulo : ${anu.result.title}\nUrl : ${anu.result.source}\nTamanho : ${anu.result.size}\n\n*ESPERE UM POUQUINHO, N SPAME O CHAT*`
                buffer = await getBuffer(anu.result.thumbnail)
                lagu = await getBuffer(anu.result.url_audio)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
                client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
                await limitAdd(sender)
                break
                case 'playmp3':
                  if (!isGroup)return reply(mess.only.group)
                   if (isBanned) return reply(mess.only.benned)
                reply(mess.wait)
                play = body.slice(9)
                anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp3?q=${play}&apikey=${ZeksApi}`, {method: 'get'})
               if (anu.error) return reply(anu.error)
                 infomp3 = `「 *TIMELINE PLAY MP3* 」\n*• Título:* ${anu.result.title}\n*• Link:* ${anu.result.source}\n*• Tamanho:* ${anu.result.size}\n\n*ESPERE NOVAMENTE ENVIANDO POR FAVOR, NÃO SPAME O CHAT*`
                buffer = Buffer(anu.result.thumbnail)
                lagu = Buffer(anu.result.url_audio)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
                client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
                await limitAdd(sender) 
                break 
                case 'image':
					if (args.length < 1) return reply('O que você quer procurar, mano?')
					goo = body.slice(7)
					anu = await fetchJson(`https://api.vhtear.com/googleimg?query=${goo}&apikey=ANTIGRATISNIHANJENKKK`, {method: 'get'})
					reply(mess.wait)
				    var pol = JSON.parse(JSON.stringify(anu.result.result_search));
                    var tes2 =  pol[Math.floor(Math.random() * pol.length)];
					pint = await getBuffer(tes2)
					client.sendMessage(from, pint, image, { caption: '*Google Image*\n\n*Resultado da pesquisa : '+goo+'*', quoted: mek })
					break
                case 'xvideos':
              	    if (args.length < 1) return reply('Cadê o texto, mano?')
                    anu = await fetchJson(`https://api.arugaz.my.id/api/media/xvideo/search?query=${body.slice(9)}`, {method: 'get'})
                    teks = `===============\n`
                    for (let b of anu.result) {
                    teks += `• Título: ${b.title}\n• Info: ${b.info}\n• Link: ${b.link}\n===============\n`
                    }
                    reply(teks.trim())
			     	await limitAdd(sender) 
			     	break 
			     	case 'dnulis':
					if (args.length < 1) return reply(mess.blank)
					teks = body.slice(7)
					if (teks.length > 200) return reply('O texto é longo, até 200 caracteres')
					reply('*Estou fazendo, se der erro tente novamente ✓*')
					buffer = await getBuffer(`https://nturshro.sirv.com/Api-dark/20210222_040232.png?text.0.text=${teks}&text.0.position.gravity=northwest&text.0.position.x=10%25&text.0.position.y=8%25&text.0.align=right&text.0.size=55&text.0.color=000000&text.0.opacity=72&text.0.font.family=Bitter&text.0.font.style=italic`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '*PRONTINHO ✓*'})
					break
case 'nulis':			
if (isBanned) return reply(mess.only.benned)
				if (args.length < 1) return reply(ind.wrongf())
				ct = body.slice(6)
				reply(ind.wait())
				ct = await getBuffer(`https://api.zeks.xyz/api/nulis?text=${ct}&apikey=apivinz`)
				client.sendMessage(from, ct, image, { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "NULIS", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('lib/logo.jpeg')} } }, {caption: 'Nih kak udah jadi..', quoted: mek})
				await limitAdd(sender)
				break
		case 'nulis2': 				
if (isBanned) return reply(mess.only.benned)
				if (args.length < 1) return reply(ind.wrongf())
				ct = body.slice(7)
				ll1 = ct.split("/")[0];
                ll2 = ct.split("/")[1];
                ll3 = ct.split("/")[2];
                ll4 = ct.split("/")[3];
				reply(ind.wait())
				ct = await getBuffer(`https://api.zeks.xyz/api/magernulis?nama=${ll1}&kelas=${ll2}&text=${ll3}&tinta=${ll4}`)
				client.sendMessage(from, ct, image, {caption: 'Nih kak udah jadi..', quoted: mek})
				await limitAdd(sender)
				break
case 'banido2':
tujuh = fs.readFileSync('./mp3/banido2.mp3');
client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'ghost':
tujuh = fs.readFileSync('./mp3/ghost.mp3');
client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'gtav':

if (isBanned) return reply(mess.only.benned)

var imgbb = require('imgbb-uploader')

if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {

  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek

  reply(mess.wait)

  owgi = await client.downloadAndSaveMediaMessage(ted)

  tels = body.slice(7)

  	anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
  	teks = `${anu.display_url}`
  	ranp = getRandom('.gif')
	rano = getRandom('.webp')
  	hehe = `https://some-random-api.ml/canvas/triggered?avatar=${teks}`

 client.sendMessage(from, hehe, image, {quoted:mek})

 exec(`wget ${hehe} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
	fs.unlinkSync(ranp)
	nobg = fs.readFileSync(rano)
	dappa.sendMessage(from, nobg, sticker, {quoted: mek})
	fs.unlinkSync(rano)
})

 } else {
	 reply(`${pushname}, foto não adicionada!`)
}
 break



//---stiker wasted



case 'wasted':
if (isBanned) return reply(mess.only.benned)

var imgbb = require('imgbb-uploader')

if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
  ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
  reply(mess.wait)
  owgi = await client.downloadAndSaveMediaMessage(ger)
  anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
  teks = `${anu.display_url}`
  ranp = getRandom('.gif')
  rano = getRandom('.webp')
  anu1 = `https://some-random-api.ml/canvas/wasted?avatar=${teks}`
  exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
fs.unlinkSync(ranp)
if (err) return reply(mess.error.stick)
nobg = fs.readFileSync(rano)
client.sendMessage(from, nobg, sticker, {
  quoted: mek
})
fs.unlinkSync(rano)
  })

} else {
  reply('Usar foto!')
}
break



case 'triggered':



					case 'ger':

if (isBanned) return reply(mess.only.benned)

            var imgbb = require('imgbb-uploader')

           if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {

           ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek

           reply(mess.wait)

         owgi = await client.downloadAndSaveMediaMessage(ger)

           anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)

        teks = `${anu.display_url}`

         ranp = getRandom('.gif')

        rano = getRandom('.webp')

        anu1 = `https://some-random-api.ml/canvas/triggered?avatar=${teks}`

       exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {

                                                fs.unlinkSync(ranp)

                                                if (err) return reply(mess.error.stick)

                                                nobg = fs.readFileSync(rano)

                                               client.sendMessage(from, nobg, sticker, {quoted: mek})

                                                fs.unlinkSync(rano)

                                        })

                                    

                                             } else {

                                                 reply('Gunakan foto!')

                                          }

                                             break



case 'wanted':
  
  if (isBanned) return reply(mess.only.benned)

var imgbb = require('imgbb-uploader')

if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {

  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek

  reply(mess.wait)

  owgi = await client.downloadAndSaveMediaMessage(ted)

  tels = body.slice(7)

  anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)

  hehe = await getBuffer(`https://videfikri.com/api/textmaker/wanted/?urlgbr=${anu.display_url}&text1=Dicari&text2=${tels}`)

 client.sendMessage(from, hehe, image, {quoted:mek})

} else {

  reply('Não adicione nada ao comando')

}

break



case 'drawing':
if (isBanned) return reply(mess.only.benned)  
var imgbb = require('imgbb-uploader')
if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
  ted = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo: mek
  reply(mess.wait)
  owgi = await client.downloadAndSaveMediaMessage(ted)
  tels = body.slice(7)
  anu = await imgbb("08579d070df9a07cb1c2ee565aece767", owgi)
  heheq = await getBuffer(`https://videfikri.com/api/textmaker/pencildrawing/?urlgbr=${anu.display_url}`)
 client.sendMessage(from, heheq, image, {quoted:mek})
} else {
  reply('reply imagenya kak!')
}
break



case 'addstik':

				if (!isQuotedSticker) return reply('Responder o adesivo')

				if (!isOwner) return reply(mess.only.ownerB)

				svst = body.slice(9)

				if (!svst) return reply('Qual é o nome do adesivo?')

				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo

				delb = await client.downloadMediaMessage(boij)

				setiker.push(`${svst}`)

				fs.writeFileSync(`./temp/stick/${svst}.webp`, delb)

				fs.writeFileSync('./temp/stik.json', JSON.stringify(setiker))

				client.sendMessage(from, `Sukses Menambahkan Sticker\nCek dengan cara ${prefix}liststik`, MessageType.text, { quoted: mek })

				break



case 'getstik':



				var itsme = `0@s.whatsapp.net`

				var split = `${cr}`

				var selepbot = {

					contextInfo: {

						participant: itsme,

						quotedMessage: {

							extendedTextMessage: {

								text: split,

							}

						}

					}

				}

				namastc = body.slice(9)

				try {

				result = fs.readFileSync(`./temp/stick/${namastc}.webp`)

				client.sendMessage(from, result, sticker, selepbot)

				} catch {

				  reply('Pacote não está registrado')

				}

				break
			
			

			case 'liststik':

				teks = '*Sticker list :*\n\n'

				for (let awokwkwk of setiker) {

					teks += `- ${awokwkwk}\n`

				}

				teks += `\n*Total : ${setiker.length}*\nGunakan perintah\n*${prefix}getstik (nama pack)*\nuntuk mengambil stiker`

				client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": setiker } })

				break



case 'addvn':

				if (!isQuotedAudio) return reply('Reply vnnya')

				if (!isOwner) return reply(mess.only.ownerB)

				svst = body.slice(7)

				if (!svst) return reply('Qual é o nome do áudio')

				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo

				delb = await client.downloadMediaMessage(boij)

				audionye.push(`${svst}`)

				fs.writeFileSync(`./temp/audio/${svst}.mp3`, delb)

				fs.writeFileSync('./temp/vn.json', JSON.stringify(audionye))

				client.sendMessage(from, `Sukses Menambahkan Audio\nCek dengan cara ${prefix}listvn`, MessageType.text, { quoted: mek })

				break



case 'getvn':



				namastc = body.slice(7)

				try {

				buffer = fs.readFileSync(`./temp/audio/${namastc}.mp3`)

				client.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: mek, ptt: true })

				} catch {

				  reply('Pack tidak terdaftar')

				}

				break



			case 'listvn':

			case 'vnlist':

				teks = '*List Vn:*\n\n'

				for (let awokwkwk of audionye) {

					teks += `- ${awokwkwk}\n`

				}

				teks += `\n*Total : ${audionye.length}*\nUse comandos\n*${prefix}getvn (nama pack)*\nuntuk pegar vn`

				client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": audionye } })

				break



case 'addimg':

				if (!isQuotedImage) return reply('Reply imagenya')

				if (!isOwner) return reply(mess.only.ownerB)

				svst = body.slice(8)

				if (!svst) return reply('Nama imagenya apa')

				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo

				delb = await client.downloadMediaMessage(boij)

				imagenye.push(`${svst}`)

				fs.writeFileSync(`./temp/foto/${svst}.jpeg`, delb)

				fs.writeFileSync('./temp/image.json', JSON.stringify(imagenye))

				client.sendMessage(from, `Sukses Menambahkan Video\nCek dengan cara ${prefix}listimage`, MessageType.text, { quoted: mek })

				break



case 'getimg':

				namastc = body.slice(8)

				try {

				buffer = fs.readFileSync(`./temp/foto/${namastc}.jpeg`)

				client.sendMessage(from, buffer, image, { quoted: mek, caption: `Result From Database : ${namastc}.jpeg` })

				} catch {

				  reply('Pack tidak terdaftar')

				}

				break

				

			case 'listimg':

				teks = '*Lista Imagem :*\n\n'

				for (let awokwkwk of imagenye) {

					teks += `- ${awokwkwk}\n`

				}

				teks += `\n*Total : ${imagenye.length}*\nGunakan perintah\n*${prefix}getimg (nama pack)*\nuntuk mengambil gambar`

				client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": imagenye } })

				break



case 'addvid':

			  if (!isOwner) return reply(mess.only.ownerB)

				if (!isQuotedVideo) return reply('Reply videonya')

				svst = body.slice(8)

				if (!svst) return reply('O nome do video')

				boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo

				delb = await client.downloadMediaMessage(boij)

				videonye.push(`${svst}`)

				fs.writeFileSync(`./temp/vídeo/${svst}.mp4`, delb)

				fs.writeFileSync('./temp/vid.json', JSON.stringify(videonye))

				client.sendMessage(from, `Sucesso Adicionais Video\nCek dengan cara ${prefix}listvid`, MessageType.text, { quoted: mek })

				break



case 'getvid':

				namastc = body.slice(8)

				try {

				buffer = fs.readFileSync(`./temp/video/${namastc}.mp4`)

				client.sendMessage(from, buffer, video, { mimetype: 'video/mp4', quoted: mek })

				} catch {

				  reply('Pack tidak terdaftar')

				}

				break



			case 'listvid':

				teks = '*List Video :*\n\n'

				for (let awokwkwk of videonye) {

					teks += `- ${awokwkwk}\n`

				}

				teks += `\n*Total : ${videonye.length}*\nGunakan perintah\n*${prefix}getvid (nama pack)*\nuntuk mengambil video`

				client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": videonye } })

				break



case 'esquilo':

					pai = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo



					tup = await client.downloadAndSaveMediaMessage(pai)

					ran = getRandom('.mp3')

					exec(`ffmpeg -i ${tup} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, (err, stderr, stdout) => {

						fs.unlinkSync(tup)

						if (err) return reply('Error!')

						hah = fs.readFileSync(ran)

						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})

						fs.unlinkSync(ran)

					})

				break



case 'velocidade':

					low = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo

					slo = await client.downloadAndSaveMediaMessage(low)

					ran = getRandom('.mp3')

					exec(`ffmpeg -i ${slo} -filter:a "atempo=0.7,asetrate=44100" ${ran}`, (err, stderr, stdout) => {

						fs.unlinkSync(slo)

						if (err) return reply('Error!')

						hah = fs.readFileSync(ran)

						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})

						fs.unlinkSync(ran)

					})

				break



case 'baixo':

					muk = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo

					gem = await client.downloadAndSaveMediaMessage(muk)

					ran = getRandom('.mp3')

					exec(`ffmpeg -i ${gem} -filter:a "atempo=1.6,asetrate=22100" ${ran}`, (err, stderr, stdout) => {

						fs.unlinkSync(gem)

						if (err) return reply('Error!')

						hah = fs.readFileSync(ran)

						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})

						fs.unlinkSync(ran)

					})

				break



case 'grave':                 

					ass = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo

					bas = await client.downloadAndSaveMediaMessage(ass)

					ran = getRandom('.mp3')

					exec(`ffmpeg -i ${bas} -af equalizer=f=94:width_type=o:width=2:g=30 ${ran}`, (err, stderr, stdout) => {

						fs.unlinkSync(bas)

						if (err) return reply('Error!')

						hah = fs.readFileSync(ran)

						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})

						fs.unlinkSync(ran)

					})

					break



case 'antisticker':

            case 'antistiker':

                    if (!isGroup) return reply(mess.only.group)
				        	if (!isGroupAdmins) return reply(mess.only.admin)
                   
                    if (args[0] == 'on') {
                        var cek = antisticker.includes(chatId);
                        if(cek){
                            return aruga.reply(from, '*Detector de adesivos anti-spam * já está ativo neste grupo', id) //if number already exists on database
                        } else {
                            antisticker.push(chatId)
                            fs.writeFileSync('./lib/Helper/antisticker.json', JSON.stringify(antisticker))
                            aruga.reply(from, '*[Anti Sticker SPAM]* foi ativado\nCada membro do grupo cujo adesivo de spam for maior que 7 serão chutados pelo bot!', id)
                        }
                    } else if (args[0] == 'off') {
                        var cek = antilink.includes(chatId);
                        if(cek){
                            return aruga.reply(from, '*O detector de adesivos anti-spam * não está mais ativo neste grupo', id) //if number already exists on database
                        } else {
                            let nixx = antisticker.indexOf(chatId)
                            antisticker.splice(nixx, 1)
                            fs.writeFileSync('./lib/helper/antisticker.json', JSON.stringify(antisticker))
                            aruga.reply(from, '*[Anti Sticker SPAM]* foi desabilitado\n', id)
                        }
                    } else {
                        aruga.reply(from, `escolher on / off\n\n*[Anti Sticker SPAM]*\nCada membro do grupo que for um adesivo de spam será chutado por bot!`, id)
                    }
                    break



case 'gplaystore':



client.updatePresence(from, Presence.composing)

goo = body.slice(12)

try {

data = await fetchJson(`https://api.zeks.xyz/api/sgplay?apikey=${viKey}&q=${goo}`, {

method: 'get'

  })



teks = '*Google Play Store*\n\n'

				for (let i of data.result) {

					teks += `        ────────────────\n\n‣ *Nome* : ${i.title}\n‣ *Desenvolvedor* : ${i.developer}\n‣ *Avaliação* : ${i.rating}\n‣ *Link* : ${i.url}\n\n`

				}

				teks += `        ────────────────`

reply(teks.trim())



} catch {

  reply(mess.ferr)

}



break

case 'happymod':
  if (isBanned) return reply(mess.only.benned)
			data = await fetchJson(`https://tobz-api.herokuapp.com/api/happymod?q=${body.slice(10)}&apikey=${TobzApi}`)
			hupo = data.result[0] 
			teks = `*Nome*: ${data.result[0].title}\n*versão*: ${hupo.version}\n*Tamanho:* ${hupo.size}\n*root*: ${hupo.root}\n*compra*: ${hupo.price}\n*link*: ${hupo.link}\n*download*: ${hupo.download}`
			buffer = Buffer(hupo.image)
			client.sendMessage(from, buffer, image, {quoted: mek, caption: `${teks}`})
			await limitAdd(sender)
			break
//consulta					
                case 'iplog':
                    teks = body.slice(7)
                    anu = await fetchJson(`https://mnazria.herokuapp.com/api/check?ip=${teks}`)
			        ipl = `INFORMAÇÕS IP 🐊🚩

➸ *CIDADE:* ${anu.city}
➸ *Latitude*: ${anu.latitude}
➸ *Longtitude*: ${anu.longitude}
➸ *REGIÃO*: ${anu.region_name}
➸ *UF*: ${anu.region_code}
➸ *IP*: ${anu.ip}
➸ *TIPO*: ${anu.type}
➸ *CEP*: ${anu.zip}
➸ *LOCALIDADE*: ${anu.location.geoname_id}
➸ *CAPITAL*: ${anu.location.capital}
➸ *DDD*: ${anu.location.calling_code}
➸ *PAÍS*: ${anu.location.country_flag_emoji}


CRÉDITOS: 

DONO API: wa.me/+552169706404
DONO CÓDIGO: ⃬⃗𝑇͢𝜩𝑴𝜬͢𝛩𝑅𝜵͢𝑳  ☔ `
			        reply(ipl)
					break
case 'bcnpj':
                    teks = body.slice(7)
                    res = await fetchJson(`https://www.receitaws.com.br/v1/cnpj/${teks}`)
			        cnp = `CONSULTA CNPJ 🐊🚩

 ➸ *ATIVIDADE PRINCIPAL:* ${res.atividade_principal}
 ➸ *DATA SITUAÇÃO:* ${res.data_situacao}
 ➸ *TIPO:* ${res.tipo}
 ➸ *NOME:* ${res.nome}
 ➸ *UF:* ${res.uf}
 ➸ *TELEFONE:* ${res.telefone}
 ➸ *SITUAÇÃO:* ${res.situacao}
 ➸ *BAIRRO:* ${res.bairro} 
 ➸ *RUA:* ${res.logradouro}
 ➸ *NÚMERO:* ${res.numero}
 ➸ *CEP :* ${res.cep}
 ➸ *MUNICÍPIO:* ${res.municipio}
 ➸ *PORTE:* ${res.porte}
 ➸ *ABERTURA:* ${res.abertura}
 ➸ *NATUREZA JURÍDICA:* ${res.natureza_juridica}
 ➸ *FANTASIA:* ${res.fantasia}
 ➸ *CNPJ:* ${res.cnpj}
 ➸ *ÚLTIMA ATUALIZAÇÃO:* ${res.ultima_atualizacao}
 ➸ *STATUS:* ${res.status}
 ➸ *COMPLEMENTO:* ${res.complemento}
 ➸ *EMAIL:* ${res.email}

CRÉDITOS: 

DONO CÓDIGO: ⃬⃗⃗𝑇͢𝜩𝑴𝜬͢𝛩𝑅𝜵͢𝑳  ☔ `
			        reply(cnp)
					break
case 'bcep':
					lxrd = body.slice(6)
                    data = await fetchJson(`https://viacep.com.br/ws/${lxrd}/json/`, {method: 'get'})
                    if (data.error) return reply(data.error)
                    kiny = `*🔍CONSULTA REALIZADA🔍* \n\n ➸ *CEP:* ${data.cep} \n\n ➸ *ENDEREÇO:* ${data.logradouro}\n\n ➸ *COMPLEMENTO:* ${data.complemento} \n\n ➸ *BAIRRO:* ${data.bairro} \n\n ➸ *LOCALIDADE:* ${data.localidade} \n\n ➸ *UF:* ${data.uf}\n\n ➸ *DDD:* ${data.ddd}`
                    client.sendMessage(from, kiny, text, {quoted: mek})
                    await limitAdd(sender)
                    break
case 'bpl':
                    teks = body.slice(7)
                    anu = await fetchJson(`https://apicarros.com/v1/consulta/${teks}/json/`)
			        placa = `CONSULTA PLACA 🐊🚩

➸ *ANO:* ${anu.ano}
➸ *ANO MODELO*: ${anu.anoModelo}
➸ *CHASSI*: ${anu.chassi}
➸ *CODIGO RETORNO*: ${anu.codigoRetorno}
➸ *CODIGO SITUACAO*: ${anu.codigoSituacao}
➸ *COR*: ${anu.cor}
➸ *MARCA*: ${anu.marca}
➸ *MUNICIPIO*: ${anu.municipio}
➸ *SITUACAO*: ${anu.situacao}
➸ *UF*: ${anu.uf}


CRÉDITOS: 

DONO DA API: wa.me/+552169706404
CRIADO DA CASE: ⃬⃗𝑇͢𝜩𝑴𝜬͢𝛩𝑅𝜵͢𝑳  ☔ `
			        reply(placa)
					break
                case 'bug':
                case 'reportar':
                case 'reportarbug':
                  if (isBanned) return reply(mess.only.benned)
                     const pesan = body.slice(5)
                      if (pesan.length > 300) return client.sendMessage(from, 'Desculpe, o texto é muito longo, máximo de 300 letras', msgType.text, {quoted: mek})
                        var nomor = mek.participant
                       const teks1 = `*[BUG REPORTADO]*\nNumero : @${nomor.split("@s.whatsapp.net")[0]}\nMOTIVO : ${pesan}`
                      var options = {
                         text: teks1,
                         contextInfo: {mentionedJid: [nomor]},
                     }
                    client.sendMessage('552169706404@s.whatsapp.net', options, text, {quoted: mek})
                    reply('PDP PARSA, BUG FOI REPORTADO, SE FOR MENTIRA VAI SER COBRADO✌🏼')
                    break
case 'delete':
				case 'del':
				case 'd':  
				if (isBanned) return reply(mess.only.benned)	
					if (!isGroup)return reply(mess.only.group)
					if (!isGroupAdmins)return reply(mess.only.admin)
					client.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					break
case 'antiracismo':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if ((args[0]) === 'on') {
						if (isAntiRacismo) return reply('O modo antiracismo já está ativo')
						antiracismo.push(from)
						fs.writeFileSync('./src/antiracismo.json', JSON.stringify(antiracismo))
						reply(`\`\`\`✓Ativado com sucesso o modo antiracismo no grupo\`\`\` *${groupMetadata.subject}*`)
					} else if ((args[0]) === 'off') {
						antiracismo.splice(from, 1)
						fs.writeFileSync('./database/json/antiracismo.json', JSON.stringify(antiracismo))
						reply(`\`\`\`✓Modo antiracismo desativado com sucesso no grupo\`\`\` *${groupMetadata.subject}*`)
					} else {
						reply('On para ativar, Off para desligar')
					}
					break
					case 'marcar':
            if (isBanned) return reply(mess.only.benned)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➥ https://wa.me/${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					client.sendMessage(from, teks, text, {detectLinks: false, quoted: mek})
					break
                   case 'marcar2':
                   if (isBanned) return reply(mess.only.benned)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠} @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					reply(teks)
					break
                  case 'marcar3':
                  if (isBanned) return reply(mess.only.benned)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `-> @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break
                case 'pokemon':
                  if (isBanned) return reply(mess.only.benned)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=pokemon`, {method: 'get'})
					reply(mess.wait)
					var n = JSON.parse(JSON.stringify(anu));
					var nimek =  n[Math.floor(Math.random() * n.length)];
					pok = Buffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })
					break
case 'wa.me':
				  case 'wame':
  client.updatePresence(from, Presence.composing) 
      options = {
          text: `「 *SEU WA.ME* 」\n\n_Solicitado por_ : *@${sender.split("@s.whatsapp.net")[0]}\n\nSeu link Whatsapp : *https://wa.me/${sender.split("@s.whatsapp.net")[0]}*\n*Ou ( / )*\n*https://api.whatsapp.com/send?phone=${sender.split("@")[0]}*`,
          contextInfo: { mentionedJid: [sender] }
    }
    client.sendMessage(from, options, text, { quoted: mek } )
				break
                case 'dog':
                case 'auau':
                case 'cachorro':
                  if (isBanned) return reply(mess.only.benned)
                  
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anjing`, {method: 'get'})
					reply(mess.wait)
					var n = JSON.parse(JSON.stringify(anu));
					var nimek =  n[Math.floor(Math.random() * n.length)];
					pok = Buffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })
					break
case 'tomp3':
  if (!isGroup)return reply(mess.only.group)
                	client.updatePresence(from, Presence.composing) 
					if (!isQuotedVideo) return reply('❌ marque o video❌')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp4')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❌ Falha ao converter vídeo para mp3 ❌')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', quoted: mek})
						fs.unlinkSync(ran)
					})
					break
case 'kiss':
				    try {    
					
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/kiss?apikey=BotWeA`, {method: 'get'})
						bufferv = await getBuffer(res.result)
						client.sendMessage(from, bufferv, image, {quoted: mek, caption: 'ezzzz'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						sa = await getBuffer(`https://i.ibb.co/JcSjmNY/IMG-20210107-WA0052.jpg`)
						client.sendMessage(from, sa, image, {quoted: mek, caption: 'Erro como!!'})
						reply('❌ *ERRO* ❌')
					}
					break
case 'attp':
				if (args.length < 1) return reply(`uhm teksnya mana?\n*Contoh ${prefix}attp stardustlrlr gans*`)
				attp2 = await getBuffer(`https://api.xteam.xyz/attp?file&text=${body.slice(6)}`)
				client.sendMessage(from, attp2, sticker, {quoted: mek})
				break
		case 'bitly':
			if (isBanned) return reply(mess.only.benned)
			link = `${body.slice(7)}`
			anu = await fetchJson(`https://tobz-api.herokuapp.com/api/bitly?url=${link}&apikey=${TobzApi}`, {method: 'get'})
			bitly = `${anu.result}`
			client.sendMessage(from, anu, text, {quoted: mek})
			await limitAdd(sender) 
			break
case 'spotifysearch':
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/spotifysearch?apikey=RamlanID&query=${query}`)
                    get_result = get_result.result
                    txt = ""
                    for (var x in get_result) {
                        txt += `Titulo : ${get_result[x].title}\n`
                        txt += `Artista : ${get_result[x].artists}\n`
                        txt += `Duração : ${get_result[x].duration}\n`
                        txt += `Link : ${get_result[x].link}\n`
                        txt += `Preview : ${get_result[x].preview_url}\n\n\n`
                    }
                    reply(txt)
                    break
case 'igstalk':
  if (isBanned) return reply(mess.only.benned)
					hmm = await fetchJson(`https://api.zeks.xyz/api/igstalk?username=${body.slice(9)}&apikey=apivinz`)
					buffer = await getBuffer(hmm.profile_pic)
					hasil = `Nome completo : ${hmm.fullname}\nSeguidores : ${hmm.follower}\nSeguindo : ${hmm.following}\nPrivado : ${hmm.is_private}\nVerificado : ${hmm.is_verified}\nBio : ${hmm.bio}`
					client.sendMessage(from, buffer, image, {quoted: mek, caption: hasil})
					await limitAdd(sender)
					break
case 'emoji':
  if (isBanned) return reply(mess.only.benned)
				anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/emoji2png?emoji=${args[0]}&type=aple`, {method: 'get'})
				jes = await getBuffer(anu)
				client.sendMessage(from, jes, image,{quoted : mek, caption : 'DONE'})
				break
case 'animekiss':
					anp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/kiss?apikey=${TobzApi}`, {method: 'get'})
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender) 
					break 
                            case 'antilink':
                    if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('digite 1 para ativar ')
					if (Number(args[0]) === 1) {
						if (isAntiLink) return reply('o anti-link está ativo')
						antilink.push(from)
						fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink))
						reply('Grupo anti-link ativado com sucesso neste grupo ✔️')
						client.sendMessage(from,`Atencao a todos os membros ativos deste grupo anti-link. ee você enviar um link de grupo, voce sera expulso daqui  grupo`, text)
					} else if (Number(args[0]) === 0) {
						if (!isantilink) return reply('O modo de grupo anti-link foi desabilitado ')
						var ini = anti.clientOf(from)
						antilink.splice(ini, 1)
						fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink))
						reply('Desativar grupo anti-link com sucesso neste grupo ✔️')
					} else {
						reply('1 para ativar, 0 para desativar ')
					}
					break
case 'antifake':
					try {
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isAntiFake) return reply('Ja esta ativo')
						antifake.push(from)
						fs.writeFileSync('./src/antifake.json', JSON.stringify(antifake))
						reply('Ativou com sucesso o recurso de antifake neste grupo✔️')
					} else if (Number(args[0]) === 0) {
						antifake.splice(from, 1)
						fs.writeFileSync('./src/antifake.json', JSON.stringify(antifake))
						reply('Desativou com sucesso o recurso de antifake neste grupo✔️')
					} else {
						reply('1 para ativar, 0 para desativar')
					}
					} catch {
						reply('Deu erro, tente novamente :/')
					}
                break
case 'ssweb':
				if (isBanned) return reply(mess.only.benned)    
					if (args.length < 1) return reply('Cadê o link, primata?')
					teks = `${body.slice(7)}`
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbar.tech/api/url2image?tipe=tablet&url=${teks}&apiKey=${BarBarApi}`)
					ssweb = await getBuffer(anu.result)
					client.sendMessage(from, ssweb, image, {quoted: mek})
					await limitAdd(sender)
					break 
                case 'logo3d':
              	    if (args.length < 1) return reply('qual txt lindx??')
                    teks = `${body.slice(8)}`
                    if (teks.length > 10) return client.sendMessage(from, 'limite de 10 letras', text, {quoted: mek})
                    buff = Buffer(`https://docs-jojo.herokuapp.com/api/text3d?text=${teks}`, {method: 'get'})
                    client.sendMessage(from, buff, image, {quoted: mek, caption: `${teks}`})
			     	break
                case 'shorturl':
                    anu = await fetchJson(`https://tobz-api.herokuapp.com/api/shorturl?url=${body.slice(10)}`)
			        hasil = `${anu.result}`
			        reply(hasil)
			        break
case 'ban':
					client.updatePresence(from, Presence.composing) 
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
			        ban = mentioned
					reply(`banido com sucesso : ${ban}`)
					break
case 'unban':
					if (!isOwner)return reply(mess.only.ownerB)
					bnnd = body.slice(8)
					ban.splice(`${bnnd}@s.whatsapp.net`, 1)
					fs.writeFileSync('./src/banned.json', JSON.stringify(ban))
					reply(`Número wa.me/${bnnd} foi desbanido `)
					break
case 'dono':                     
					data = await fetchJson(`https://pastebin.com/raw/dzPx0WzN`, {method: 'get'})
                     anuk = await getBuffer(data.img)
                     dark = `➳ NOME:  
 ${data.nome}\n➳ NUMERO: ${data.numero}\n➳ SEXO: ${data.sexo}\n➳ NICK: ${data.nick}\n➳ YT:  ${data.yt}\n➳ INSTA: ${data.insta} `                   
					client.sendMessage(from, anuk, image, {quoted: mek, caption: dark})
                    await limitAdd(sender)
                    break
case 'logohub':
		    	    daddy = `${body.slice(8)}`
		    	    no = daddy.split("/")[0];
		    	    bg = daddy.split("/")[1];
		     	    reply('*Estou fazendo aguarde...*')
		    	    buffer = await getBuffer(`https://api.zeks.xyz/api/phub?apikey=apivinz&img=https://1.bp.blogspot.com/-x8KhcOBG-yw/XiU4pi1yWVI/AAAAAAAADBA/gK8tsLyc1lQ808A348IKzDCjf6fUBKONwCLcBGAsYHQ/s1600/cara%2Bbuat%2Bfoto%2Bprofil%2Bdi%2Bwhatsapp%2Bmenjadi%2Bunik.jpg&username=${no}&msg=${bg}`, {method: 'get'})
			        client.sendMessage(from, buffer, image, {quoted: mek, caption: '*Aqui Está*\n\n*Feito Com sucesso*'})
					break
case 'bologo':
					if (args.length < 1) return reply(mess.blank)
					teks = body.slice(7)
					if (teks.length > 15) return reply('*O texto é longo*')
					reply('*Aguarde Estou fazendo...*')
					buffer = Buffer(`https://budenter.sirv.com/Images/Bologo.jpg?text.0.text=${teks}&text.0.position.gravity=center&text.0.position.y=1%25&text.0.size=40&text.0.color=000000&text.0.opacity=70&text.0.font.family=Patua%20One&text.0.background.opacity=33&text.0.outline.blur=63`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '*Aqui está parceiro*'})
					break
case 'pornlogo': 
					var gh = body.slice(10)
					var gbl7 = gh.split("/")[0];
					var gbl8 = gh.split("/")[1];
				if (args.length < 1) return reply('Cadê o texto, lixo')
				reply(ind.wait())
				buffer = await getBuffer(`https://api.vhtear.com/pornlogo?text1=${gbl7}&text2=${gbl8}&apikey=c1d162b46e634f389efa1ac715f03d03`, {method: 'get'})
				client.sendMessage(from, buffer, image, {quoted: mek, caption: 'aqui'})
				await limitAdd(sender)
				break
			    case 'fototiktok':
                    gatauda = body.slice(12)
                    anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/tiktokpp?user=${body.slice(8)}`)
			        buff = Buffer(anu.result)
                    reply(anu.result)
			        break
			    case 'map':
			case 'mapa': 
			if (isBanned) return reply(mess.only.benned)  
                anu = await fetchJson(`https://mnazria.herokuapp.com/api/maps?search=${body.slice(5)}`, {method: 'get'})
                buffer = Buffer(anu.gambar)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: `${body.slice(5)}`})
				break
				case 'ocr': 
				case 'txtdafoto':
				  if (isBanned) return reply(mess.only.benned)
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						reply(mess.wait)
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply('Escolha a foto para pegar os txt dela burro >-<')
					}
					break
				case 'stiker': 
				case 'sticker':
				case 'fig':
				case 'figurinha':
				case 'f':
				  if (!isGroup)return reply(mess.only.group)
				  if (isBanned) return reply(mess.only.benned)
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`Yah gagal ;(, tente dnovo ^_^`)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else {
						reply(`sapoha ${prefix}sticker e pra fazer fig cm foto/gif burro`)
					}
					break
				case 'gtts':	
				case 'tts':
				case 'audio':
        if (isBanned) return reply(mess.only.benned)
					if (args.length < 1) return client.sendMessage(from, 'idioma e nescessario!!', text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, 'qual txt vc quer q eu fale lindu?', text, {quoted: mek})
					dtt = body.slice(9)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 300
					? reply('quer escrever a biblia?😤')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('falhei desculpe-me tente novamente dps^_^')
							client.sendMessage(from, buff, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					break
case 'pinterest':
  if (isBanned) return reply(mess.only.benned)
					client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${body.slice(11)}`, {method: 'get'})
					reply(ind.wait())
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `*𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓*`})
					await limitAdd(sender)
					break 





//--Goolge Image



case 'googlesearch': 				
				if (args.length < 1) return reply(`textnya mana om?`)
				ct = body.slice(14)
				ll1 = ct.split("|")[0];
                ll2 = ct.split("|")[1];
				ll3 = ct.split("|")[2];
				reply(`[❕] Loading`)
				anu = await fetchJson(`https://onlydevcity.herokuapp.com/api/textmaker?text=${ll1}&text2=${ll2}&text3=${ll3}&theme=google-suggestion&apikey=onlyonedeveloper`)
				buffer = await getBuffer(anu.result.url)
				client.sendMessage(from, buffer, image, {quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "@denssptraa", "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync('dnsnew.jpg')} } }, caption: 'Nih hasilnya kak...'})
				break 
  
  
  
case 'ytmp4':
  if (isBanned) return reply(mess.only.benned) 
				if (args.length < 1) return reply(`Urlnya mana kak?`)
  reply(mess.wait)
  play = body.slice(7)
  try {
  anu = await fetchJson(`https://api.zeks.xyz/api/ytmp4?url=${play}&apikey=apivinz`)
  if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply('Format link salah, gunakan link youtube')
  if (anu.error) return reply(anu.error)
  infomp3 = `*Video Encontrado*\n‣ *Titulo* : ${anu.result.title}\n‣ *Fonte* : ${anu.result.source}\n‣ *Tamanho* : ${anu.result.size}\n\n_Enviando arquivos por favor aguarde_\n\n_Se o vídeo não aparecer, baixe-o usando o link abaixo_\n‣ *link* : ${anu.result.url_video}`
  buffer = await getBuffer(anu.result.thumbnail)
  lagu = await getBuffer(anu.result.url_video)
  client.sendMessage(from, buffer, image, {
quoted: mek, caption: infomp3
  })
client.sendMessage(from, lagu, video, {
mimetype: 'video/mp4', filename: `${anu.result.title}.mp4`, quoted: mek
  })
  await limitAdd(sender)
  } catch {
    reply(mess.ferr)
  }
  break



case 'ytmp3':
  if (isBanned) return reply(mess.only.benned) 
				if (args.length < 1) return reply(`Cade o url jovem?`)
  reply(mess.wait)
  play = body.slice(7)
  if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply('Format link salah, gunakan link youtube')
  try {
  anu = await fetchJson(`https://api.zeks.xyz/api/ytmp3/2?url=${play}&apikey=apivinz`)
  infomp3 = `*Audio Encontrado*\n‣ Titulo : ${anu.result.title}\n‣ Fonte : ${anu.result.source}\n‣ Tamanho : ${anu.result.size}\n\n_Mandar arquivo por favor espere_\n\n_Se o audio nao aparecer, baixe-o usando o link abaixo_\n‣ *link* : ${anu.result.link}`
  buffer = await getBuffer(anu.result.thumb)
  lagu = await getBuffer(anu.result.link)
  client.sendMessage(from, buffer, image, {
quoted: mek, caption: infomp3
  })
  client.sendMessage(from, lagu, audio, {
mimetype: 'audio/mp4', filename: `${anu.result.title}.mp3`, quoted: mek
  })
  await limitAdd(sender)
  } catch {
    reply(mess.ferr)
  }
  break



				case 'setprefix':
				case 'sigla':
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					reply(`sigla de comandos alterada para : ${prefix}`)
					break 	
				case 'hilih': 
					if (args.length < 1) return reply('qual txt deseja lindx?')
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/hilih?teks=${body.slice(7)}`, {method: 'get'})
					reply(anu.result)
					break
				case 'tiktokstalk':
				case 'tiktokperfil':
					try {
						if (args.length < 1) return client.sendMessage(from, 'qual nome da pessoa????', text, {quoted: mek})
						let { user, stats } = await tiktod.getUserProfileInfo(args[0])
						reply(mess.wait)
						teks = `*ID* : ${user.id}\n*nome* : ${user.uniqueId}\n*Nick* : ${user.nickname}\n*seguidores* : ${stats.followerCount}\n*seguindo* : ${stats.followingCount}\n*posts da conta* : ${stats.videoCount}\n*Luv* : ${stats.heart}\n`
						buffer = Buffer(user.avatarLarger)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: teks})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('nada encontrado')
					}
					break
				case 'clearall':
				case 'limpar':
					if (!isOwner) return reply(' quem e tu?')
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						client.deleteChat(_.jid)
					}
					reply('esta limpo mestre  :)')
					break
			       case 'bloquear':
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					client.blockUser (`${body.slice(7)}@c.us`, "add")
					client.sendMessage(from, `membro bloqueado ${body.slice(7)}@c.us`, text)
					break
                    case 'desbloquear':
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
				    client.blockUser (`${body.slice(9)}@c.us`, "remove")
					client.sendMessage(from, `membro desbloqueado ${body.slice(9)}@c.us`, text)
				break
				case 'kitar': 
				if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
				await client.client.leaveGroup(from, 'adeus...', groupId)
                    break
case 'hackfb':

                    client.sendMessage(from, hackfb(prefix), text, { quoted: mek })
                    tod = await getBuffer(`https://i.ibb.co/Lv8QGtQ/ch3-1-svg-compress81.jpg`)
                    client.sendMessage(from, tod, image, { quoted: mek, caption: '▉◣◢▉▉▔▉▉▔▉▉▔▉▉▔▉ ▉◥◤▉▉▂▉▉▂◤▉▂▉▉▂◤ ▉┆┆▉▉┆▉▉▔▉▉┆▉▉▔▉ ▉┆┆▉▉┆▉▉▂▉▉┆▉▉┆▉'})
                    break
				case 'bc': 
					if (!isOwner) return reply(' so meu criador') 
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `❮  mensagem de transmissão❯\n\n${body.slice(4)}`})
						}
						reply('transmissao feita')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `❮ msg de transmissao❯\n\n${body.slice(4)}`)
						}
						reply('tm feita')
					}
					break
			   	case 'mudarfoto': 
                        if (!isGroup) return reply(mess.only.group)
                       if (!isGroupAdmins) return reply(mess.only.admin)
                        if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                       media = await client.downloadAndSaveMediaMessage(mek)
                         await client.updateProfilePicture (from, media)
                        reply('pronto')
                break						
				case 'add':
				case 'adicionar':
				  if (isBanned) return reply(mess.only.benned)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('nao tenho bola de cristal pra adivinhar quem vc quer add Aki')
					if (args[0].startsWith('08')) return reply('qual cod do pais?? ')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('Falha ao adicionar, talvez porque seja privado')
					}
					break
					case 'grup':
					case 'group':
					case 'grupo':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args[0] === 'abrir') {
					    reply(`grupo aberto para membros`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'fechar') {
						reply(`grupo fechado SOMENTE ADM'S MANDA MSGS`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
					break
                    
            case 'admin':
            case 'owner':
            case 'creator':
            case 'criador':
                  client.sendMessage(from, {displayname: "Temporal", vcard: vcard}, MessageType.contact, { quoted: mek})
       client.sendMessage(from, 'Este é o número do meu criador ^-^ ',MessageType.text, { quoted: mek} )
           break    
           case 'setname':
           case 'mudarnome':
                if (!isGroup) return reply(mess.only.group)
			    if (!isGroupAdmins) return reply(mess.only.admin)
				if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                client.groupUpdateSubject(from, `${body.slice(9)}`)
                client.sendMessage(from, 'nome do grupo alterado cm sucesso', text, {quoted: mek})
                break
                case 'setdesc':
                case 'mudardesc':
                if (!isGroup) return reply(mess.only.group)
			    if (!isGroupAdmins) return reply(mess.only.admin)
				if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                client.groupUpdateDescription(from, `${body.slice(9)}`)
                client.sendMessage(from, 'descricao trocada cm sucesso', text, {quoted: mek})
                break
           case 'demote':
           case 'rebaixar':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('marca a pessoa pra tirar o ADM')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `perde ADM seu gay :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`perdeu adm @${mentioned[0].split('@')[0]} seu gay`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'promote':
				case 'promover':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('marca a pessoa pra ter ADM')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `Novo ADM :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`Novo Adm @${mentioned[0].split('@')[0]} Novo ADM`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break	
			     	case 'usanao':
			case 'naousa':
			case 'naousar':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('marque a pessoa q deseja remover')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `Removido Com Sucesso, Quem é o Proximo?   :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`removi mermo @${mentioned[0].split('@')[0]} fodassi🏃`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
				case 'listadmin':
				case 'listaadms':
				case 'adms':
					if (!isGroup) return reply(mess.only.group)
					teks = `adms do grupo *${groupMetadata.subject}*\nadms : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
				case 'toimg':
				case 'converter':
				  if (!isGroup)return reply(mess.only.group)
				  if (isBanned) return reply(mess.only.benned)
					if (!isQuotedSticker) return reply('marca a fig inteligente')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('algo de erro ;(, tente dnovo dps ^_^')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'tchau entt '})
						fs.unlinkSync(ran)
					})
					break
const namaUser = `${pushname}`
				case 'nsfw':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('0 ou 1?')
					if (Number(args[0]) === 1) {
						if (isNsfw) return reply('ativado !!')
						nsfw.push(from)
						fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
						reply('❬ sucesso ❭')
					} else if (Number(args[0]) === 0) {
						nsfw.splice(from, 1)
						fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
						reply('❬ sucesso❭')
					} else {
						reply(' *use o 0 para desativar e o 1 para ativar* \nexemplo: nsfw 1')
					}
					break
				case 'welcome':
				case 'bv':
				case 'boasvindas':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('1 ou 0')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('ativado !!!')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('❬ pronto ❭')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('❬ pronto ❭ ')
					} else {
						reply(' *use 1 para ativar ou 0 para desativar* \n *exemplo: ${prefix}welcome 1*')
					}
				case 'clone':
				case 'clonar':
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply('Ativado') 
					if (args.length < 1) return reply(' *TAG do membro clonada!* ')
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await client.getProfilePicture(id)
						buffer = Buffer(pp)
						client.updateProfilePicture(botNumber, buffer)
						mentions(`Foto de perfil copiada com sucesso @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply(' *falhei ;(, tente mais tarde ^_^* ')
					}
					break
				case 'wait':
				case 'pesquisar':
				  if (isBanned) return reply(mess.only.benned)
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							client.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply(' *encontrei isso* ')
					}
					break
				default:
			if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						console.log(color('[ERROR]','red'), 'Comando desse gay não foi registrado', color(sender.split('@')[0]))
					}
					}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
