import React from 'react'
import { connect } from 'react-redux' 

import Alert from '../alert/Alert'
import { getActions } from '../../../store/actions/alert'

const Notification = ({ showAlert, hideAlertMessage, alertMessageContent }) => {
    return <Alert text={alertMessageContent} open={showAlert} onClose={hideAlertMessage} />
}

const mapStateToProps = state => ({
    ...state.alert
})

const mapActionsToProps = dispatch => ({
    ...getActions(dispatch)
})

export default connect(mapStateToProps, mapActionsToProps)(Notification)