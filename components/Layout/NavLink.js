import Link from 'next/link';
import { useRouter } from 'next/router';

import classes from './NavLink.module.css';

const NavLink = ({ href, children }) => {
    const router = useRouter();

    return (
        <div className={classes.btn}>
            <Link href={href}>
                <a className={router.pathname === href ? classes.active : ''}>
                    {children}
                </a>
            </Link>
        </div>
    );
};

export default NavLink;
