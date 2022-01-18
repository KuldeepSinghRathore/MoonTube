const { Playlist } = require("../models/playlist.model")

const addToPlaylistUsingId = async (req, res) => {
  try {
    // console.log(req.body, "req.body")
    const { userId, videoId } = req.params
    const { playlistName } = req.body
    // console.log(playlistName, "playlistName")
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

// getPlaylistUsingId
const getPlaylistUsingId = async (req, res) => {
  try {
    const { userId } = req.params
    const playlist = await Playlist.find({ userwithId: userId }).populate(
      "playlistItems.video"
    )
    // console.log(playlist, "get playlist")
    if (!playlist.length > 0) {
      return res.status(404).json({
        success: false,
        message: "No playlist found",
        playlist: [],
      })
    }
    return res.status(200).json({
      success: true,
      message: "Playlist found",
      playlist,
    })
  } catch (error) {
    console.log(error.stack)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errorMessage: error.message,
    })
  }
}

// deletePlaylistUsingId
const deletePlaylistUsingId = async (req, res) => {
  try {
    console.log(req.body, "req.body")
    const { userId } = req.params

    const { playlistName } = req.body
    const playlist = await Playlist.find({ userwithId: userId })
    console.log(playlist, "playlist", playlistName, "playlistName")
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "No playlist found",
        playlist: [],
      })
    }
    const findPlaylistIndex = playlist.findIndex(
      (item) => item.playlistName === playlistName
    )
    if (findPlaylistIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "No playlist found Using this PlaylistName",
        playlist: [],
      })
    }
    playlist[findPlaylistIndex].remove()
    // await playlist.save()
    return res.status(200).json({
      success: true,
      message: "Playlist deleted",
    })
  } catch (error) {
    console.log(error.stack)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errorMessage: error.message,
    })
  }
}

const deleteVideoFromPlaylistUsingId = async (req, res) => {
  try {
    const { userId, videoId } = req.params
    const playlistName = req.body.playlistName
    const playlist = await Playlist.findOne({
      userwithId: userId,
      playlistName: playlistName,
    })

    if (!playlist?.playlistName) {
      return res.status(404).json({
        success: false,
        message: "User Have No Playlist Or Video Not Found",
      })
    }
    let newPl = {
      userwithId: userId,
      playlistName: playlistName,
      playlistItems: playlist.playlistItems.filter(
        (item) => item.video._id.toString() !== videoId.toString()
      ),
    }
    newPl = Object.assign(playlist, newPl)

    await newPl.save()
    // console.log(playlist, "playlist")

    return res.status(200).json({
      success: true,
      message: "Video Deleted From Playlist",
      playlist: newPl,
    })
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
  getPlaylistUsingId,
  deletePlaylistUsingId,
  deleteVideoFromPlaylistUsingId,
}
