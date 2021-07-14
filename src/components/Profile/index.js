import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import './index.css'
import SideNavbar from '../SideNavbar'
import Loading from '../Loading'

class Profile extends Component {
  state = {
    isLoading: true,
    userData: {},
  }

  componentDidMount() {
    this.getUserInformation()
  }

  getUserInformation = async () => {
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
    console.log(fetchedData)
    this.setState({userData: fetchedData, isLoading: false})
  }

  renderLoadingView = () => <Loading />

  onClickLogout = () => {
    const {history} = this.props
    localStorage.removeItem('pa_token')
    history.replace('/login')
  }

  renderUserInformation = () => {
    const {userData} = this.state
    const userName = {
      displayName: userData.display_name,
    }
    const {displayName} = userName
    const {images, followers} = userData
    const {url} = images[0]

    return (
      <>
        <img src={url} alt="" className="user-image" />
        <h1 className="user-name">{displayName}</h1>
        <div className="followers-container">
          <h1 className="followers-total">{followers.total}</h1>
          <h1 className="followers-heading">FOLLOWERS</h1>
        </div>

        <button
          type="button"
          className="logout-button"
          onClick={this.onClickLogout}
        >
          Logout
        </button>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="bg-container">
        <SideNavbar />
        <div className="profile-container">
          {isLoading ? this.renderLoadingView() : this.renderUserInformation()}
        </div>
      </div>
    )
  }
}

export default withRouter(Profile)
