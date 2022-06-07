import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import Card from '../../ui/Card';

import { clearOverlays, createNotification, revalidate } from '../../../store';
import { getData, formatDateForInput } from '../../../utils/helpers';
import classes from './ProjectForm.module.css';

const ProjectForm = ({ project }) => {
    const dispatch = useDispatch();
    const [galleries, setGalleries] = useState([]);
    const [galleryInput, setGalleryInput] = useState(project?.gallery);
    const [descriptionInput, setDescriptionInput] = useState(
        project?.description || ''
    );
    const token = sessionStorage.getItem('token');

    const dateInputRef = useRef();
    const titleInputRef = useRef();
    const imageInputRef = useRef();
    const contentInputRef = useRef();
    const dateCompletedInputRef = useRef();

    const date = project?.date && formatDateForInput(new Date(project.date));
    const dateCompleted =
        project?.dateCompleted &&
        formatDateForInput(new Date(project?.dateCompleted));

    const galleryInputChangeHandler = (event) => {
        setGalleryInput(event.target.value);
    };

    const descriptionInputChangeHandler = (event) => {
        let text = event.target.value;

        if (text.length > 200) {
            text = text.slice(0, 200);
        }

        setDescriptionInput(text);
    };

    const formSubmitHandler = async (event) => {
        event.preventDefault();

        dispatch(createNotification('PROJECT_LOADING'));

        let imageName = project?.imageName;
        let image = imageInputRef.current.files[0];

        if (
            image &&
            imageName &&
            image.name !== imageName &&
            imageName !== 'template.jpg'
        ) {
            const deleteImgRes = await fetch('/api/delete-images', {
                method: 'DELETE',
                body: JSON.stringify({ imageNames: [imageName] }),
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`,
                },
            });

            if (deleteImgRes.status === 403)
                return dispatch(createNotification('AUTH_ERR'));

            if (!deleteImgRes.ok)
                return dispatch(createNotification('IMG_RM_ERR'));
        }

        if ((image && !imageName) || (image && image.name !== imageName)) {
            let fd = new FormData();
            fd.append('files', image);

            const uploadImgRes = await fetch('/api/upload-images', {
                method: 'POST',
                body: fd,
                headers: { authorization: `Bearer ${token}` },
            });

            if (uploadImgRes.status === 403)
                return dispatch(createNotification('AUTH_ERR'));

            if (!uploadImgRes.ok)
                return dispatch(createNotification('IMG_UPLOAD_ERR'));

            const data = await uploadImgRes.json();
            image = data?.data[0];

            if (image) {
                imageName = image.split('/');
                imageName = imageName[imageName.length - 1];
                image = 'http://localhost:4000/' + image;
            }
        }

        const projectObj = {
            projectId: project?._id,
            title: titleInputRef.current.value,
            description: descriptionInput,
            content: contentInputRef.current.value,
            date: dateInputRef.current.value,
            dateCompleted: dateCompletedInputRef.current.value,
            image: image,
            imageName: imageName,
            gallery: galleryInput,
        };

        const res = await fetch('/api/projects', {
            method: projectObj?.projectId ? 'PATCH' : 'POST',
            body: JSON.stringify(projectObj),
            headers: new Headers({
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }),
        });

        if (res.status === 403) {
            return dispatch(createNotification('AUTH_ERR'));
        }

        if (!res.ok) {
            return dispatch(createNotification('PROJECT_ADD_ERR'));
        }

        dispatch(clearOverlays());
        dispatch(createNotification('PROJECT_ADD_SUCCESS'));
        dispatch(revalidate());
    };

    useEffect(() => {
        getData('/api/galleries').then((data) => {
            const galleries = data.map((gallery) => {
                return { title: gallery.title, id: gallery._id };
            });

            setGalleries(galleries);
        });
    }, []);

    return (
        <Card header={<h2>{project?.title || 'Новый проект'}</h2>}>
            <Form onSubmit={formSubmitHandler} className={classes.form}>
                <div className={classes.flex}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="title">
                            Название проекта
                        </Form.Label>
                        <Form.Control
                            type="text"
                            id="title"
                            required
                            defaultValue={project?.title}
                            ref={titleInputRef}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="image">Изображение</Form.Label>
                        <Form.Control
                            type="file"
                            id="image"
                            ref={imageInputRef}
                        />
                        <Form.Text className="text-muted">
                            Рекомендуемый размер изображения: 300x300
                        </Form.Text>
                    </Form.Group>
                </div>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="description">
                        Краткое описание проекта
                    </Form.Label>
                    <Form.Control
                        as="textarea"
                        id="description"
                        rows={2}
                        required
                        maxLength={200}
                        value={descriptionInput}
                        onChange={descriptionInputChangeHandler}
                    />
                    <Form.Text className="text-muted">
                        Количество символов: {descriptionInput.length} / 200
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="content">Описание проекта</Form.Label>
                    <Form.Control
                        as="textarea"
                        id="content"
                        rows={4}
                        required
                        defaultValue={project?.content}
                        ref={contentInputRef}
                    />
                </Form.Group>

                <div className={classes.flex}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="date">
                            Дата начала проекта
                        </Form.Label>
                        <Form.Control
                            type="date"
                            id="date"
                            required
                            defaultValue={date || ''}
                            ref={dateInputRef}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="dateCompleted">
                            Дата окончания проекта
                        </Form.Label>
                        <Form.Control
                            type="date"
                            id="dateCompleted"
                            defaultValue={dateCompleted || ''}
                            ref={dateCompletedInputRef}
                        />
                    </Form.Group>
                </div>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="gallery">Галеря</Form.Label>
                    <Form.Select
                        id="gallery"
                        value={galleryInput}
                        onChange={galleryInputChangeHandler}
                    >
                        <option value="">Выберите галерею</option>
                        {galleries.map((gallery) => (
                            <option value={gallery.id} key={gallery.id}>
                                {gallery.title}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <div className={classes.controls}>
                    <Button
                        variant="outline-primary"
                        type="button"
                        onClick={() => dispatch(clearOverlays())}
                    >
                        Отменить
                    </Button>
                    <Button variant="primary" type="submit">
                        Сохранить
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

export default ProjectForm;
