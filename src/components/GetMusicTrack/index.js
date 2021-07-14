import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import './index.css'

const GetMusicTrack = props => {
  const {eachItem, onClickGetMusic} = props
  const {track} = eachItem
  const {album, artists} = track
  const timeDuration = moment
    .duration(track.duration_ms, 'milliseconds')
    .format()

  const getMusic = () => {
    const {url} = album.images[2]

    onClickGetMusic(track.preview_url, track.name, url, artists[0].name)
  }

  return (
    <div
      className="track-main-container"
      onClick={getMusic}
      role="button"
      tabIndex="0"
    >
      <div className="index-container">
        <h1> </h1>
      </div>
      <div className="track-container">
        <p>{track.name}</p>
      </div>
      <div className="album-container">
        <p>{album.name}</p>
      </div>
      <div className="time-container">
        <p>{timeDuration}</p>
      </div>
      <div className="artist-container">
        <p>{artists[0].name}</p>
      </div>
      <div className="added-container">
        <p>{moment(album.release_date, 'YYYY-MM-DD').fromNow()}</p>
      </div>
    </div>
  )
}

export default GetMusicTrack
