import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="header">
        <div className="logo">People</div>
        <div className="menus">
            <Link to='/people'>Home</Link>
            <Link to="/addPeople">Add</Link>
            <Link to="/searchpeople">Search</Link>
            <Link to="/infinite1">Infinite Scroll</Link>
        </div>
    </div>
  )
}

export default Header