import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import Card from '../../ui/Card';
import ImagePreview from './ImagePreview';

import { clearOverlays, createNotification, revalidate } from '../../../store';
import classes from './ImagesUploadForm.module.css';

const ImagesUploadForm = ({ gallery }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.user);

    const [files, setFiles] = useState([]);
    const filesInputRef = useRef();
    const titleInputRef = useRef();
    const dateInputRef = useRef();

    const uploadMultipleFiles = (event) => {
        let newFiles = Array.from(event.target.files);

        newFiles = newFiles.map((file) => ({
            url: URL.createObjectURL(file),
            fileObj: file,
        }));

        setFiles((prevState) => {
            return [...prevState, ...newFiles];
        });
        filesInputRef.current.files = null;
    };

    const removeImageHandler = (fileName) => {
        setFiles((prevState) => {
            const newFiles = prevState.filter(
                (file) => file.fileObj.name !== fileName
            );

            return newFiles;
        });
    };

    const formSubmitHandler = async (event) => {
        event.preventDefault();

        dispatch(createNotification('GALLERY_LOADING'));

        let formData = new FormData();

        files.forEach((file) => {
            formData.append('files', file.fileObj);
        });

        const imgRes = await fetch('/api/upload-images', {
            method: 'POST',
            body: formData,
            headers: { authorization: `Bearer ${token}` },
        });

        if (!imgRes.ok) {
            return dispatch(createNotification('IMG_UPLOAD_ERR'));
        }

        let images = await imgRes.json();
        images = images.data;
        images = images.map((image) => 'http://localhost:4000/' + image);

        const gallery = {
            title: titleInputRef.current.value,
            date: dateInputRef.current.value,
            images,
        };

        const galleryRes = await fetch('/api/galleries', {
            method: 'POST',
            body: JSON.stringify(gallery),
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!galleryRes.ok) {
            return dispatch(createNotification('GALLERY_ADD_ERR'));
        }

        dispatch(clearOverlays());
        dispatch(createNotification('GALLERY_ADD_SUCCESS'));
        dispatch(revalidate());
    };

    return (
        <Card header={<h2>{gallery?.title || 'Новая галерея'}</h2>}>
            <Form onSubmit={formSubmitHandler} className={classes.form}>
                <Form.Group>
                    <Form.Label>Название галереи</Form.Label>
                    <Form.Control type="text" required ref={titleInputRef} />
                </Form.Group>

                <div className={classes.flex}>
                    <Form.Group>
                        <Form.Label htmlFor="date">Выберите дату</Form.Label>
                        <Form.Control
                            id="date"
                            type="date"
                            required
                            ref={dateInputRef}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="file">
                            Выберите изображение
                        </Form.Label>
                        <Form.Control
                            id="file"
                            type="file"
                            onChange={uploadMultipleFiles}
                            accept=".jpg,.png,.jpeg"
                            multiple
                            required
                            ref={filesInputRef}
                        />
                    </Form.Group>
                </div>

                <div className={classes.preview}>
                    {files.map((file) => (
                        <ImagePreview
                            url={file.url}
                            name={file.fileObj.name}
                            onClick={removeImageHandler}
                            key={file.url}
                        />
                    ))}
                </div>

                <div className={classes.controls}>
                    <Button
                        variant="outline-primary"
                        type="button"
                        onClick={() => dispatch(clearOverlays())}
                    >
                        Отмена
                    </Button>
                    <Button variant="primary" type="submit">
                        Сохранить
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

export default ImagesUploadForm;
