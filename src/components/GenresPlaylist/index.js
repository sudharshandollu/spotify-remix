import './index.css'

const GenresPlaylist = props => {
  const {eachItem, onClickGenres} = props
  const {icons, name, id} = eachItem
  const {url} = icons[0]
  const getPodcast = () => {
    onClickGenres(id)
  }

  return (
    <div className="playlist" onClick={getPodcast} role="button" tabIndex="0">
      <img src={url} alt={name} className="playlist-image" />
      <p className="playlist-name">{name}</p>
    </div>
  )
}

export default GenresPlaylist
