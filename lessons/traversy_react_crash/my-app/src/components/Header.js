import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title, toggleForm, formState}) => {
    const onClick=()=>{
        toggleForm();
    }

  return (
      <header className="header">
          <h1>{title}</h1>
          <Button color={formState ? 'red' : 'green'} text={formState ? 'Hide' : 'Add'} onClick={onClick} />
      </header>
  )
}

// Header.defaultProps = {
//     title: 'Task Tracker'
// }

// const headingStyle= {
//     color: 'red', 
//     backgroundColor:'black'
// }

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header