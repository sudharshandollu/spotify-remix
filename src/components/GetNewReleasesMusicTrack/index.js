import ProgressBar from 'react-bootstrap/ProgressBar'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

const GetNewReleasesMusicTrack = props => {
  const {eachItem, onClickGetMusic, imageUrl} = props

  const time = moment.duration(eachItem.duration_ms, 'milliseconds').format()

  const getMusic = () =>
    onClickGetMusic(
      eachItem.preview_url,
      eachItem.name,
      imageUrl,
      eachItem.artists[0].name,
    )

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
        <p>{eachItem.name}</p>
      </div>

      <div className="time-container">
        <p>{time}</p>
      </div>

      <div className="added-container">
        <ProgressBar animated now={eachItem.popularity} />
      </div>
    </div>
  )
}
export default GetNewReleasesMusicTrack
