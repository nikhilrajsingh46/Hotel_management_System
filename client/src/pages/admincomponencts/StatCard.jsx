const StatCard = ({ title, count, icon }) => {
  const getIconClass = () => {
    switch (icon) {
      case "users":
        return "fas fa-users"
      case "building":
        return "fas fa-building"
      case "plane":
        return "fas fa-plane"
      case "calendar":
        return "fas fa-calendar-alt"
      case "star":
        return "fas fa-star"
      case "comment":
        return "fas fa-comment"
      default:
        return "fas fa-chart-bar"
    }
  }

  return (
    <div className="stat-card">
      <div className="stat-icon">
        <i className={getIconClass()}></i>
      </div>
      <div className="stat-info">
        <h3>{count}</h3>
        <p>{title}</p>
      </div>
    </div>
  )
}

export default StatCard
