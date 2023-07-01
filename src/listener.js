const autoBind = require("auto-bind");

class Listener {
  constructor(playlistSongsService, mailSender) {
    this._playlistSongsService = playlistSongsService;
    this._mailSender = mailSender;

    autoBind(this);
  }

  async listen(message) {
    try {
      const {playlistId, targetEmail} = JSON.parse(message.content.toString());

      const playlist = await this._playlistSongsService.getPlaylistSongs(
        playlistId
      );

      const result = await this._mailSender.sendEmail(
        targetEmail,
        playlistId,
        playlist.name,
        JSON.stringify({playlist})
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
