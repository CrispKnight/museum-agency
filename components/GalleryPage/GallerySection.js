import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';

import Header from '../ui/Header';

import { createNotification, revalidate } from '../../store/index';
import 'react-image-gallery/styles/css/image-gallery.css';
import classes from './GallerySection.module.css';

const GallerySection = ({ gallery }) => {
    const { isLoggedIn, token } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const removeGalleryHandler = async () => {
        dispatch(createNotification('GALLERY_RM_LOADING'));

        const res = await fetch('/api/galleries', {
            method: 'DELETE',
            body: JSON.stringify({ id: gallery._id }),
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            return dispatch(createNotification('GALLERY_RM_ERR'));
        }

        dispatch(createNotification('GALLERY_RM_SUCCESS'));
        dispatch(revalidate());
    };

    const images = gallery.images.map((image) => {
        return {
            original: image || '/images/template.jpg',
            originalClass: classes['gallery-image'],
            thumbnail: image || '/images/template.jpg',
        };
    });

    return (
        <section className={classes.gallery} id={gallery._id}>
            <Header>{gallery.title}</Header>
            <ImageGallery
                items={images}
                showFullscreenButton={false}
                showPlayButton={false}
                showBullets={false}
                slideInterval={5000}
                autoPlay={true}
            />

            {isLoggedIn && (
                <div className={classes.controls}>
                    <Button
                        variant="outline-danger"
                        onClick={removeGalleryHandler}
                    >
                        Удалить
                    </Button>
                </div>
            )}
        </section>
    );
};

export default GallerySection;
