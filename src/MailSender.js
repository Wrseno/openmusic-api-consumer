const nodemailer = require("nodemailer");

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, playlistId, playlistName, content) {
    const message = {
      from: "Open Music App",
      to: targetEmail,
      subject: `Ekspor Lagu Playlist - ${playlistName}`,
      text: `Ini adalah hasil ekspor dari playlist - ${playlistName}.`,
      attachments: [
        {
          filename: `${playlistId}.json`,
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
