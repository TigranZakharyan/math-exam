import React from 'react';

const useAlert = () => {
    const [alert, setAlert] = React.useState<null | string>(null);
    const removeAlert = () => setAlert(null)
    return {
        alert, setAlert, removeAlert
    }
}

export default useAlert;
