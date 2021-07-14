import './index.css'

const EditorsPlaylist = props => {
  const {eachItem, onClickEditorsPicks} = props

  const {images, description, name, id} = eachItem

  const {url} = images[0]
  const getPlaylist = () => {
    onClickEditorsPicks(id)
  }

  return (
    <div className="playlist" onClick={getPlaylist} role="button" tabIndex="0">
      <img src={url} alt={description} className="playlist-image" />
      <p className="playlist-name">{name}</p>
    </div>
  )
}

export default EditorsPlaylist
