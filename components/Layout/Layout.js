import { Fragment } from 'react';

import MainHeader from './MainHeader';
import Footer from './Footer';

import classes from './Layout.module.css';

const Layout = ({ children }) => {
    return (
        <Fragment>
            <MainHeader />
            <main className={classes.main}>{children}</main>
            <Footer />
        </Fragment>
    );
};

export default Layout;
