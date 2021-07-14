const GetYourPlaylists = props => {
  const {eachItem, onClickYourPlaylist} = props
  const {images, name, tracks} = eachItem
  const dummy =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm5vgsby-LmccdxbxtnaFzgeukOKH6r9dTkw&usqp=CAU'

  const getPlaylistSongs = () => {
    onClickYourPlaylist(tracks.href, images[0].url)
  }

  return (
    <div onClick={getPlaylistSongs} role="button" tabIndex="0">
      <img
        src={images.length === 0 ? dummy : images[0].url}
        alt={name}
        className="playlist-image"
      />
      <h1>{name}</h1>
      <p>{tracks.total} Tracks</p>
    </div>
  )
}

export default GetYourPlaylists
