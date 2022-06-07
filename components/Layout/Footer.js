import classes from './Footer.module.css';
import Link from 'next/link';

const Footer = () => {
    return (
        <section className={classes.footer}>
            <div>
                <h5>Сибирское Музейное Агентство</h5>
                <p>© {new Date().getFullYear()}г.</p>
            </div>
            <div className={classes.links}>
                <a href="https://www.facebook.com/promuseum.agency">
                    <i className="fa-brands fa-facebook-square"></i>
                </a>
                <Link href="/contacts">
                    <i className="fa-solid fa-square-envelope"></i>
                </Link>
            </div>
        </section>
    );
};

export default Footer;
