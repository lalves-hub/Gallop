import React from "react";

const Alert = ({ message }) => {
    return (
        <div style={{ backgroundColor: 'red', color: 'white', padding: '5px', borderRadius: '5px', fontSize: '11px', marginBottom:'5px' }}>
            {message}
        </div>
    )};
export default Alert;