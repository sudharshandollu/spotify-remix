import {Component} from 'react'
import ReactAudioPlayer from 'react-audio-player'

import {BsArrowLeft} from 'react-icons/bs'
import moment from 'moment'

import Loading from '../Loading'
import EditorsPlaylist from '../EditorsPlaylist'
import GenresPlaylist from '../GenresPlaylist'
import NewReleasesPlaylist from '../NewReleasesPlaylist'
import GetNewReleasesMusicTrack from '../GetNewReleasesMusicTrack'
import GetMusicTrack from '../GetMusicTrack'
import './index.css'
import SideNavbar from '../SideNavbar'

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

class SpotifyClone extends Component {
  state = {
    editorsPicks: {},
    genres: {},
    newReleases: {},
    editorsPicksPlaylists: {},
    genresPlaylists: {},
    newReleasesPlaylists: {},
    music: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getUserInformation()
  }

  getEditorsPicks = async (country, timeStamp, token) => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const editorsApi = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&timestamp=${timeStamp}`
    const editorsResponse = await fetch(editorsApi, options)
    const editorsData = await editorsResponse.json()
    console.log(editorsData)

    const genresApi = 'https://api.spotify.com/v1/browse/categories'
    const genresResponse = await fetch(genresApi, options)
    const genresData = await genresResponse.json()
    console.log(genresData)

    const newReleasesApi = `https://api.spotify.com/v1/browse/new-releases?country=${country}`
    const newReleasesResponse = await fetch(newReleasesApi, options)
    const newReleasesData = await newReleasesResponse.json()
    console.log(newReleasesData)

    this.setState({
      editorsPicks: editorsData,
      genres: genresData,
      newReleases: newReleasesData,
      apiStatus: apiStatusConstants.home,
    })
  }

  getUserInformation = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const token = localStorage.getItem('pa_token', '')

    const getUserInformationApi = 'https://api.spotify.com/v1/me'
    const getUserInformationOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      getUserInformationApi,
      getUserInformationOptions,
    )
    if (response.ok === true) {
      const fetchedData = await response.json()

      const {country} = fetchedData
      const timeStamp = moment(new Date()).format('YYYY-MM-DDTHH:00:00')
      this.getEditorsPicks(country, timeStamp, token)
    }
  }

  onClickEditorsPicks = async id => {
    const apiUrl = `https://api.spotify.com/v1/users/spotify/playlists/${id}`
    const token = localStorage.getItem('pa_token', '')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    this.setState({
      apiStatus: apiStatusConstants.editors,
      editorsPicksPlaylists: data,
    })
  }

  onClickGenres = async id => {
    const token = localStorage.getItem('pa_token', '')

    const getUserInformationApi = 'https://api.spotify.com/v1/me'
    const getUserInformationOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      getUserInformationApi,
      getUserInformationOptions,
    )

    const fetchedData = await response.json()

    const {country} = fetchedData

    const apiUrl = `https://api.spotify.com/v1/browse/categories/${id}/playlists?country=${country}`
    const genreResponse = await fetch(apiUrl, getUserInformationOptions)
    const data = await genreResponse.json()
    console.log(data)
    this.setState({
      apiStatus: apiStatusConstants.genres,
      genresPlaylists: data,
    })
  }

  onClickNewReleases = async id => {
    const api = `https://api.spotify.com/v1/albums/${id}`
    const token = localStorage.getItem('pa_token', '')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const newReleasesResponse = await fetch(api, options)
    const data = await newReleasesResponse.json()
    console.log(data)
    this.setState({
      apiStatus: apiStatusConstants.newReleases,
      newReleasesPlaylists: data,
    })
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
    this.setState({apiStatus: apiStatusConstants.home, music: ''})
  }

  renderGenresPlaylists = () => {
    const {genresPlaylists} = this.state
    const {playlists} = genresPlaylists
    const {items} = playlists
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
          <div className="podcasts-main-container">
            <h1>Podcast</h1>
            <div className="podcasts-container">
              {items.map(eachItem => {
                const {images, name, tracks} = eachItem
                return (
                  <div className="podcast-container">
                    <img
                      src={images[0].url}
                      alt={name}
                      className="podcast-image"
                    />
                    <h1 className="podcast-name">{name}</h1>
                    <p className="podcast-track-count">{tracks.total} Tracks</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderEditorsPicksPlaylists = () => {
    const {editorsPicksPlaylists, editorsPicks, music} = this.state
    const {images, tracks} = editorsPicksPlaylists
    const {items} = tracks

    const {url} = images[0]

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
            <img src={url} alt="" className="editors-picks-playlists-image" />
            <div className="editors-picks-playlists-header-child-container">
              <h2>{editorsPicks.message}</h2>
              <h1>{editorsPicksPlaylists.name}</h1>
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
      </div>
    )
  }

  renderNewReleasesPlaylists = () => {
    const {newReleasesPlaylists, music} = this.state
    const {images, name, tracks} = newReleasesPlaylists
    const {url} = images[1]
    const {items} = tracks
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
            <img src={url} alt="" className="editors-picks-playlists-image" />
            <div className="editors-picks-playlists-header-child-container">
              <h2>New Releases</h2>
              <h1>{name}</h1>
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
              <div className="time-container">
                <p>Time</p>
              </div>

              <div className="added-container">
                <p>Popularity</p>
              </div>
            </div>
            <hr className="horizontal" />
            <div>
              {items.map(eachItem => (
                <GetNewReleasesMusicTrack
                  key={eachItem.id}
                  onClickGetMusic={this.onClickGetMusic}
                  eachItem={eachItem}
                  imageUrl={images[2].url}
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

  renderEditorsPicks = () => {
    const {editorsPicks} = this.state
    const {playlists} = editorsPicks
    const {items} = playlists

    return (
      <div className="section">
        <h1 className="main-container-heading">{editorsPicks.message}</h1>
        <div className="playlists-unordered">
          {items.map(eachItem => (
            <EditorsPlaylist
              eachItem={eachItem}
              key={eachItem.id}
              onClickEditorsPicks={this.onClickEditorsPicks}
            />
          ))}
        </div>
      </div>
    )
  }

  renderGenres = () => {
    const {genres} = this.state
    const {categories} = genres
    const {items} = categories

    return (
      <div className="section">
        <h1 className="main-container-heading">Genres & Moods</h1>
        <div className="playlists-unordered">
          {items.map(eachItem => (
            <GenresPlaylist
              eachItem={eachItem}
              key={eachItem.id}
              onClickGenres={this.onClickGenres}
            />
          ))}
        </div>
      </div>
    )
  }

  renderNewReleases = () => {
    const {newReleases} = this.state
    const {albums} = newReleases
    const {items} = albums

    return (
      <div className="section">
        <h1 className="main-container-heading">New Releases</h1>
        <div className="playlists-unordered">
          {items.map(eachItem => (
            <NewReleasesPlaylist
              eachItem={eachItem}
              key={eachItem.id}
              onClickNewReleases={this.onClickNewReleases}
            />
          ))}
        </div>
      </div>
    )
  }

  renderLoadingView = () => <Loading />

  renderMainContainer = () => (
    <div className="bg-container">
      <SideNavbar />

      <div className="main-container">
        {this.renderEditorsPicks()}
        {this.renderGenres()}
        {this.renderNewReleases()}
      </div>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.home:
        return this.renderMainContainer()
      case apiStatusConstants.editors:
        return this.renderEditorsPicksPlaylists()
      case apiStatusConstants.genres:
        return this.renderGenresPlaylists()
      case apiStatusConstants.newReleases:
        return this.renderNewReleasesPlaylists()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default SpotifyClone
