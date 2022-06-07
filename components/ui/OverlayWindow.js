import { createPortal } from 'react-dom';

import useMounted from '../../utils/useMounted';
import classes from './OverlayWindow.module.css';

const OverlayWindow = ({ children }) => {
    const mounted = useMounted();

    return mounted
        ? createPortal(
              <div className={classes.overlay}>{children}</div>,
              document.getElementById('overlay')
          )
        : null;
};

export default OverlayWindow;
