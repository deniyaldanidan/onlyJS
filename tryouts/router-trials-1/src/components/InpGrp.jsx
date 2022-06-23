import React from 'react';
import PropTypes from 'prop-types'

const InpGrp = ({label, placeholder, inpState, chgHandler, errorState}) => {
  return (
    <div className="inp-grp">
        <div className="inp-label">{label}</div>
        <input type="text" placeholder={placeholder} value={inpState} onChange={chgHandler} />
        <div className={`inp-error ${errorState.length ? "show" : "" }`} >{errorState}</div>
    </div>
  )
}

InpGrp.protoTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    inpState: PropTypes.string.isRequired,
    chgHandler: PropTypes.func.isRequired,
    errorState: PropTypes.string.isRequired
}

export default InpGrp