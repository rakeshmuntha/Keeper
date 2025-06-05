import React from 'react'

function Alert(props) {

    if(props.alert)
    {
        var type = props.alert.type;
        if(type === 'danger') type = 'Error';
        else if(type === 'success') type = 'Success';
    }

    return (
        <div style={{ height: '50px' }}>
            {props.alert && <div>
                <div  className={`alert alert-${props.alert.type.toLowerCase()} alert-dismissible fade show`} role="alert">
                    <strong>{type}</strong> : {props.alert.msg}
                </div>
            </div>}
        </div>
    )
}

export default Alert