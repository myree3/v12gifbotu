const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
  let kisi = message.mentions.members.first()
  if(!kisi) return message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setDescription(`Bir Kullanıcı Etiketle!`));
  if(!args[1]) return message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setDescription(`Bir Kategori Gir!`));
   if(!['gif','pp'].includes(args[1])) return message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setDescription(`Kategoriyi Doğru Girmelisin!`));
   if(!args[2]) return message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setDescription(`Sayı Gir!`));
  if(isNaN(args[2]))return message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setDescription(`Sayı Gir!`));
  if(args[2].startsWith('-')) return message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setDescription(`Başına - Koymayınız!`));
  if(db.fetch(`${args[1]}.${kisi.user.id}`) - args[2] <= 0) return message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setDescription(`Çıkarınca Aktif Olarak **0** Oluyor!`));
  db.subtract(`${args[1]}.${kisi.user.id}`,args[2])
  db.subtract(`sayı.${kisi.user.id}`,args[2])
  message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setDescription(`Girdiğiniz Kadar Puan Çıkartıldı!`));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4 
};

exports.help = {
  name: 'puan-sil',
}
