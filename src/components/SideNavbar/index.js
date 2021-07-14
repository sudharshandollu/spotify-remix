import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaUserAlt, FaMusic} from 'react-icons/fa'
import {AiFillHome} from 'react-icons/ai'
import {RiPlayListFill} from 'react-icons/ri'

import './index.css'

const SideNavbar = () => (
  <nav className="side-nav-bar">
    <img
      src="https://res.cloudinary.com/do4qwwms8/image/upload/v1625029477/Spotify%20Clone/music_sjt9vm.png"
      className="logo-image"
      alt="website logo"
    />
    <div className="nav-links-container">
      <Link to="/profile" className="nav-link">
        <FaUserAlt className="nav-bar-icon" />
        <p className="nav-bar-icon-heading">Profile</p>
      </Link>
      <Link to="/" className="nav-link">
        <AiFillHome className="nav-bar-icon" />
        <p className="nav-bar-icon-heading">Home</p>
      </Link>
      <Link to="/yourmusic" className="nav-link">
        <FaMusic className="nav-bar-icon" />
        <p className="nav-bar-icon-heading">Your Music</p>
      </Link>
      <Link to="/playlists" className="nav-link">
        <RiPlayListFill className="nav-bar-icon" />
        <p className="nav-bar-icon-heading">Playlists</p>
      </Link>
    </div>
  </nav>
)

export default SideNavbar
