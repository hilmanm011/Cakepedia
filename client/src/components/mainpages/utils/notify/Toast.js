import React from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Toast() {

    const notify = () => {
        toast.success('Success Notification', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            hideProgressBar: true,
        })
    }

    return (
        <div>
            <div>{ notify }</div>
        </div>
    )
}
