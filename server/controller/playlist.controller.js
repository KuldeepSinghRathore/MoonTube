const { Playlist } = require("../models/playlist.model")

const addToPlaylistUsingId = async (req, res) => {
  try {
    const { userId, videoId } = req.params
    const { playlistName } = req.body
    let playlist = await Playlist.find({ userwithId: userId })
    // console.log(playlist.length, "playlist l8")

    if (!playlist.length > 0) {
      const newPlaylist = new Playlist({
        userwithId: userId,
        playlistName: playlistName,
        playlistItems: [
          {
            video: videoId,
          },
        ],
      })
      await newPlaylist.save()
      return res.status(200).json({
        success: true,
        message: "First use of playlist",
        playlist: newPlaylist,
      })
    }
    // const isAlreadyInPlaylist = await Playlist.where("playlistName").equals(
    //   playlistName
    // )
    const findPlaylist = playlist.find(
      (item) => item.playlistName === playlistName
    )
    // console.log(isAlreadyInPlaylist, "isAlreadyInPlaylist")
    // console.log(findPlaylist, "findPlaylist")
    if (!findPlaylist) {
      const newPlaylist = new Playlist({
        userwithId: userId,
        playlistName: playlistName,
        playlistItems: [
          {
            video: videoId,
          },
        ],
      })
      await newPlaylist.save()
      return res.status(200).json({
        success: true,
        message: `First use of playlist ${playlistName}`,
        playlist: newPlaylist,
      })
    }
    if (findPlaylist) {
      findPlaylist.playlistItems = findPlaylist.playlistItems.concat({
        video: videoId,
      })
      await findPlaylist.save()
      return res.status(200).json({
        success: true,
        message: `Video added to playlist ${playlistName}`,
        playlist: findPlaylist,
      })
    }
  } catch (error) {
    console.log(error.stack)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errorMessage: error.message,
    })
  }
}

module.exports = {
  addToPlaylistUsingId,
}
