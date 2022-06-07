import Image from 'next/image';
import Link from 'next/link';
import NavLink from './NavLink';

import classes from './MainHeader.module.css';
import { useState } from 'react';

const MainHeader = () => {
    const [toggleActive, setToggleActive] = useState(false);

    const toggleHandler = () => {
        setToggleActive((prevState) => !prevState);
    };

    const navClasses =
        `${classes.nav}` + (toggleActive ? ` ${classes.active}` : '');

    return (
        <header className={classes.header}>
            <div className={classes['header-sm']}>
                <Link href="/">
                    <div className={classes.logo}>
                        <div className={classes.image}>
                            <Image
                                src="/images/logo.jpg"
                                width={100}
                                height={50}
                                layout="responsive"
                                objectFit="contain"
                            />
                        </div>
                        <div className={classes.name}>
                            <span>СИБИРСКОЕ</span>
                            <span>МУЗЕЙНОЕ</span>
                            <span>АГЕНТСТВО</span>
                        </div>
                    </div>
                </Link>
                <div className={classes['toggle-container']}>
                    <div className={classes.toggle} onClick={toggleHandler}>
                        <span className={classes.bar}></span>
                        <span className={classes.bar}></span>
                        <span className={classes.bar}></span>
                    </div>
                </div>
            </div>
            <nav className={navClasses}>
                <NavLink href="/">Главная</NavLink>
                <NavLink href="/projects">Проекты</NavLink>
                <NavLink href="/#services">Услуги</NavLink>
                <NavLink href="/gallery">Галерея</NavLink>
                <NavLink href="/contacts">Контакты</NavLink>
            </nav>
        </header>
    );
};

export default MainHeader;
