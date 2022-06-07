import { Button } from 'react-bootstrap';

import classes from './AddBtn.module.css';

const AddBtn = ({ children, onClick }) => {
    return (
        <div className={classes.container}>
            <Button variant="primary" onClick={onClick}>
                {children}
            </Button>
        </div>
    );
};

export default AddBtn;
