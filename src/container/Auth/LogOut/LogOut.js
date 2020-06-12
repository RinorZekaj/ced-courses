import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../../redux/actions/authActions'
import { Redirect } from 'react-router-dom'

function LogOut(props) {
    useEffect(() => {
        props.onLogOut()
    }, [])

    return <Redirect to="/"/>
}

const mapDispatchToProps = dispatch => {
    return {
      onLogOut: () => dispatch(logout())
    }
  }

export default connect(null, mapDispatchToProps)(LogOut);
