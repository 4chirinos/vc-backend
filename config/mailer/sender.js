var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport')
 
// create reusable transporter object using the default SMTP transport 
var transporter = nodemailer.createTransport('smtps://correouniversal2mil15%40gmail.com:correouniversal@smtp.gmail.com');

module.exports = transporter;