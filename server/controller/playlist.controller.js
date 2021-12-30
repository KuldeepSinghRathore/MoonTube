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

// getPlaylistUsingId
const getPlaylistUsingId = async (req, res) => {
  try {
    const { userId } = req.params
    const playlist = await Playlist.find({ userwithId: userId }).populate(
      "playlistItems.video"
    )
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
    const { userId, playlistId } = req.params
    const playlist = await Playlist.find({ userwithId: userId })
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "No playlist found",
        playlist: [],
      })
    }
    const findPlaylistIndex = playlist.findIndex(
      (item) => item._id.toString() === playlistId
    )
    if (findPlaylistIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "No playlist found Using this PlaylistId",
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
    const { userId, playlistId, videoId } = req.params
    const playlist = await Playlist.where("userwithId")
      .equals(userId)
      .where("_id")
      .equals(playlistId)
      .where("playlistItems.video")
      .equals(videoId)

    if (!playlist > 0) {
      return res.status(404).json({
        success: false,
        message: "User Have No Playlist Or Video Not Found",
      })
    }

    console.log(playlist, "playlist")
    const [{ playlistItems }] = playlist
    console.log(playlistItems, "playlistItems")

    const findVideoIndex = playlistItems.findIndex(
      (item) => item.video.toString() === videoId
    )
    playlist[0].playlistItems[findVideoIndex].remove()
    await playlist[0].save()
    return res.status(200).json({
      success: true,
      message: "Video Deleted From Playlist",
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
module.exports = {
  addToPlaylistUsingId,
  getPlaylistUsingId,
  deletePlaylistUsingId,
  deleteVideoFromPlaylistUsingId,
}
