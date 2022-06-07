import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import Head from 'next/head';

import ContactsSection from '../components/ContactsPage/ContactsSection';
import Notification from '../components/ui/Notification';

const ContactsPage = () => {
    const { showNotification } = useSelector((state) => state.notifications);

    return (
        <Fragment>
            <Head>
                <title>Контакты</title>
            </Head>
            {showNotification && <Notification />}
            <ContactsSection />
        </Fragment>
    );
};

export default ContactsPage;
