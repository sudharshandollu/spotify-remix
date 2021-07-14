import './index.css'

const NewReleasesPlaylist = props => {
  const {eachItem, onClickNewReleases} = props
  const {images, name, id} = eachItem
  const {url} = images[0]
  const getPlaylist = () => {
    onClickNewReleases(id)
  }

  return (
    <div className="playlist" onClick={getPlaylist} role="button" tabIndex="0">
      <img src={url} alt={name} className="playlist-image" />
      <p className="playlist-name">{name}</p>
    </div>
  )
}

export default NewReleasesPlaylist
