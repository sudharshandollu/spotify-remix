import {Component} from 'react'
import ReactAudioPlayer from 'react-audio-player'
import {BsArrowLeft} from 'react-icons/bs'
import Loading from '../Loading'
import GetYourPlaylists from '../GetYourPlaylists'
import GetMusicTrack from '../GetMusicTrack'

import './index.css'
import SideNavbar from '../SideNavbar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  songs: 'SONGS',
  inProgress: 'IN_PROGRESS',
  home: 'HOME',
  editors: 'EDITORS',
  genres: 'GENRES',
  newReleases: 'NEW_RELEASES',
}

class Playlists extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    yourPlaylists: '',
    specifiPlaylistSongs: '',
    playlistImage: '',
    music: '',
  }

  componentDidMount() {
    this.getPlaylists()
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

  getHomeBack = () => {
    this.setState({apiStatus: apiStatusConstants.success, music: ''})
  }

  getPlaylists = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const getUserInformationApi = 'https://api.spotify.com/v1/me'
    const token = localStorage.getItem('pa_token', '')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const userResponse = await fetch(getUserInformationApi, options)
    const userDetails = await userResponse.json()
    console.log(userDetails)
    const api = `https://api.spotify.com/v1/users/${userDetails.id}/playlists?limit=50`

    const response = await fetch(api, options)
    const data = await response.json()
    console.log(data)
    this.setState({
      apiStatus: apiStatusConstants.success,
      yourPlaylists: data,
    })
  }

  renderLoadingView = () => <Loading />

  onClickYourPlaylist = async (href, playlistImage) => {
    const api = href
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
      apiStatus: apiStatusConstants.songs,
      specifiPlaylistSongs: data,
      playlistImage,
    })
  }

  renderSpecificPlaylistSongs = () => {
    const {specifiPlaylistSongs, playlistImage, music} = this.state
    const {items} = specifiPlaylistSongs
    return (
      <div className="bg-container">
        <SideNavbar />

        <div className="main-container">
          <button
            type="button"
            className="back-button"
            onClick={this.getHomeBack}
          >
            <BsArrowLeft />
            Back
          </button>
          <div className="editors-picks-playlists-header-container">
            <img
              src={playlistImage}
              alt=""
              className="editors-picks-playlists-image"
            />
            <div className="editors-picks-playlists-header-child-container">
              <h2>Hello</h2>
              <h1>World</h1>
            </div>
          </div>
          <div className="all-tracks-container">
            <div className="tracks-header">
              <div className="index-container">
                <h1> </h1>
              </div>
              <div className="track-container">
                <p>Track</p>
              </div>
              <div className="album-container">
                <p>Album</p>
              </div>
              <div className="time-container">
                <p>Time</p>
              </div>
              <div className="artist-container">
                <p>Artist</p>
              </div>
              <div className="added-container">
                <p>Added</p>
              </div>
            </div>
            <hr className="horizontal" />
            <div>
              {items.map(eachItem => (
                <GetMusicTrack
                  eachItem={eachItem}
                  key={eachItem.id}
                  onClickGetMusic={this.onClickGetMusic}
                />
              ))}
            </div>
            {music !== '' && (
              <div className="music-player">
                <div className="music-player-text-container">
                  <img src={music.songImage} alt="" />

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
      </div>
    )
  }

  renderPlaylistsContainer = () => {
    const {yourPlaylists} = this.state
    const {items} = yourPlaylists

    return (
      <div className="bg-container">
        <SideNavbar />
        <div className="main-container">
          <h1 className="playlists-heading">Your Playlists</h1>
          <div className="playlists-container">
            {items.map(eachItem => (
              <GetYourPlaylists
                eachItem={eachItem}
                key={eachItem.id}
                onClickYourPlaylist={this.onClickYourPlaylist}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPlaylistsContainer()
      case apiStatusConstants.songs:
        return this.renderSpecificPlaylistSongs()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default Playlists
