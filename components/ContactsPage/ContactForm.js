import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

// TODO: Rewrite with bootstrap form
import { createNotification } from '../../store';
import classes from './ContactForm.module.css';

const ContactForm = () => {
    const dispatch = useDispatch();
    const [clientName, setClientName] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [clientMessage, setClientMessage] = useState('');

    const sendEmailHandler = async (event) => {
        event.preventDefault();

        dispatch(createNotification('EMAIL_LOADING'));

        const emailObj = {
            name: clientName,
            email: clientEmail,
            message: clientMessage,
        };

        const res = await fetch('/api/send-email', {
            method: 'POST',
            body: JSON.stringify(emailObj),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.status !== 200) {
            return dispatch(createNotification('EMAIL_ERR'));
        }

        dispatch(createNotification('EMAIL_SUCCESS'));
        setClientName('');
        setClientEmail('');
        setClientMessage('');
    };

    return (
        <div className={classes.form}>
            <div className={classes.header}>
                <h3>Свяжись с нами!</h3>
            </div>
            <Form onSubmit={sendEmailHandler}>
                <div className={classes.flex}>
                    <Form.Group>
                        <Form.Label htmlFor="name">Имя</Form.Label>
                        <Form.Control
                            size="sm"
                            id="name"
                            required
                            value={clientName}
                            onChange={(event) =>
                                setClientName(event.target.value)
                            }
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="email">
                            Электронная почта
                        </Form.Label>
                        <Form.Control
                            size="sm"
                            id="email"
                            type="email"
                            required
                            value={clientEmail}
                            onChange={(event) =>
                                setClientEmail(event.target.value)
                            }
                        />
                    </Form.Group>
                </div>

                <Form.Group>
                    <Form.Label htmlFor="message">Сообщение</Form.Label>
                    <Form.Control
                        as="textarea"
                        id="message"
                        rows="7"
                        required
                        value={clientMessage}
                        onChange={(event) =>
                            setClientMessage(event.target.value)
                        }
                    />
                </Form.Group>

                <div className={classes.controls}>
                    <Button variant="outline-primary" type="submit">
                        Отправить
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default ContactForm;
