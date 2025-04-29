import "../styles/ProfileHeader.scss"

const ProfileHeader = ({ user }) => {
  const profileImageUrl = user.profileImagePath
    ? `http://localhost:3001/${user.profileImagePath.replace(/\\/g, "/")}`
    : "/assets/defaultProfile.png"

  return (
    <div className="profile-header">
      <div className="profile-image-container">
        <img
          src={profileImageUrl || "/placeholder.svg"}
          alt={`${user.firstName} ${user.lastName}`}
          className="profile-image"
        />
      </div>
      <div className="profile-title">
        <h1>{`${user.firstName} ${user.lastName}`}</h1>
        <p className="user-role">{user.role}</p>
      </div>
    </div>
  )
}

export default ProfileHeader
