import {Component} from 'react'
import ReactAudioPlayer from 'react-audio-player'
import Loading from '../Loading'
import SideNavbar from '../SideNavbar'
import GetYourMusicSong from '../GetYourMusicSong'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  home: 'HOME',
  editors: 'EDITORS',
  genres: 'GENRES',
  newReleases: 'NEW_RELEASES',
}

class YourMusic extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    yourMusicData: '',
    music: '',
  }

  componentDidMount() {
    this.getYourMusic()
  }

  onClickGetMusic = (songUrl, songName, songImage, songArtist) => {
    const data = {
      songUrl,
      songName,
      songImage,
      songArtist,
    }
    this.setState({music: data})
  }

  getYourMusic = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const api = 'https://api.spotify.com/v1/me/tracks'
    const token = localStorage.getItem('pa_token', '')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(api, options)
    const data = await response.json()
    console.log(data)
    this.setState({
      apiStatus: apiStatusConstants.success,
      yourMusicData: data,
    })
  }

  renderLoadingView = () => <Loading />

  renderYourMusicContainer = () => {
    const {yourMusicData, music} = this.state
    const {items} = yourMusicData
    return (
      <div className="bg-container">
        <SideNavbar />
        <div className="main-container">
          <h1 className="your-music-heading">Your Music</h1>
          <div className="your-music-songs-cont">
            {items.map(eachItem => (
              <GetYourMusicSong
                eachItem={eachItem}
                key={eachItem.id}
                onClickGetMusic={this.onClickGetMusic}
              />
            ))}
          </div>
          {music !== '' && (
            <div className="music-player">
              <div className="music-player-text-container">
                <img
                  src={music.songImage}
                  alt=""
                  className="music-player-song-image"
                />

                <div>
                  <h4>{music.songName}</h4>
                  <p>{music.songArtist}</p>
                </div>
              </div>
              <ReactAudioPlayer
                src={music.songUrl}
                autoPlay
                controls
                className="music-bar"
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderYourMusicContainer()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default YourMusic
