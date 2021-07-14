import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

import './index.css'

const GetYourMusicSong = props => {
  const {eachItem, onClickGetMusic} = props
  const {track} = eachItem
  const {album, artists, name} = track
  const timeDuration = moment
    .duration(track.duration_ms, 'milliseconds')
    .format()

  const getMusic = () => {
    onClickGetMusic(
      track.preview_url,
      name,
      album.images[2].url,
      artists[0].name,
    )
  }

  return (
    <div
      className="your-music-song-container"
      onClick={getMusic}
      role="button"
      tabIndex="0"
    >
      <div className="your-music-song-text-container">
        <img
          src={album.images[2].url}
          alt={name}
          className="your-music-song-image"
        />
        <div className="your-music-song-details">
          <h1 className="your-music-song-name">{name}</h1>
          <p className="your-music-song-artist">{artists[0].name}</p>
        </div>
      </div>
      <p className="song-duration">{timeDuration}</p>
    </div>
  )
}

export default GetYourMusicSong
