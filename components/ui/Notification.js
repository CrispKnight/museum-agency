import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { clearNotifications } from '../../store';
import classes from './Notification.module.css';

function Notification() {
    const dispatch = useDispatch();

    const { message, status } = useSelector((state) => state.notifications);

    useEffect(() => {
        let timer = null;

        if (status === 'success') {
            timer = setTimeout(() => dispatch(clearNotifications()), 3000);
        }

        return () => clearTimeout(timer);
    }, [status]);

    let title = '';
    let statusClasses = '';

    if (status === 'success') {
        title = 'Success';
        statusClasses = classes.success;
    }

    if (status === 'loading') {
        title = 'Loading';
        statusClasses = classes.loading;
    }

    if (status === 'error') {
        title = 'Error';
        statusClasses = classes.error;
    }

    const cssClasses = `${classes.notification} ${statusClasses}`;

    return (
        <div
            className={cssClasses}
            onClick={() => dispatch(clearNotifications())}
        >
            <h4>{title}</h4>
            <p>{message}</p>
        </div>
    );
}

export default Notification;
