import React from 'react'

const Notification = ({ errorMessage, success}) => {
    if (errorMessage === null && success === null) {
        return null
    }

    if (success) {
    return (
        <div className="success"> <p>{success}</p></div>
    )} else if (errorMessage) {
        return <div className="error">{errorMessage}</div>
    }
}

export default Notification