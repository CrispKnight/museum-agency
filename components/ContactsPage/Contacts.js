import classes from './Contacts.module.css';

const Contacts = () => {
    return (
        <div className={classes.contacts}>
            <div className={classes.header}>
                <h3>Контакты</h3>
            </div>
            <div className={classes.contact}>
                <i className="fa-solid fa-phone"></i>
                <span>+7 (800) 555-35-35</span>
            </div>
            <div className={classes.contact}>
                <i className="fa-solid fa-envelope"></i>
                <span>promuseum.agency@gmail.com</span>
            </div>
            <div className={classes.contact}>
                <i className="fa-solid fa-envelope"></i>
                <span>sasmoroz@mail.ru</span>
            </div>
            <div className={classes.contact}>
                <i className="fa-solid fa-location-dot"></i>
                <span>Новосибирск, Россия 630007, ул. Советская, 6</span>
            </div>
        </div>
    );
};

export default Contacts;
