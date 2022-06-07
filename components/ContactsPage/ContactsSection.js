import { Fragment } from 'react';

import Header from '../ui/Header';
import { Card } from 'react-bootstrap';
import ContactForm from './ContactForm';
import Contacts from './Contacts';

import classes from './ContactsSection.module.css';

const ContactsSection = () => {
    return (
        <Fragment>
            <section className={classes.form}>
                <div className={classes.card}>
                    <Contacts />
                    <ContactForm />
                </div>
            </section>
        </Fragment>
    );
};

export default ContactsSection;
