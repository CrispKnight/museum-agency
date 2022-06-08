import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Gallery, connectDB } from '../utils/db-utils';
import Head from 'next/head';

import ImagesUploadForm from '../components/OverlayForms/GalleryForm/ImagesUploadForm';
import GallerySection from '../components/GalleryPage/GallerySection';
import OverlayWindow from '../components/ui/OverlayWindow';
import Notification from '../components/ui/Notification';
import AddBtn from '../components/ui/AddBtn';

import useMounted from '../utils/useMounted';
import { validateToken, getData } from '../utils/helpers';
import { commitChanges, editGallery, login } from '../store';

const GalleryPage = (props) => {
    const dispatch = useDispatch();
    const mounted = useMounted();
    const [galleries, setGalleries] = useState(props.galleries);

    const sessionToken = mounted && sessionStorage.getItem('token');

    const { isLoggedIn, changesCommited } = useSelector((state) => state.user);
    const { showGalleryEditor } = useSelector((state) => state.overlays);
    const { showNotification } = useSelector((state) => state.notifications);

    useEffect(() => {
        if (isLoggedIn && !changesCommited) {
            getData(
                `http://${props.domain}:${props.fs_port}/api/galleries`
            ).then((data) => {
                setGalleries(data);
                dispatch(commitChanges());
            });
        }
    }, [isLoggedIn, changesCommited]);

    useEffect(() => {
        if (sessionToken) {
            validateToken(sessionToken).then((tokenIsValid) => {
                if (tokenIsValid) {
                    dispatch(login(sessionToken));
                }
            });
        }
    }, [sessionToken]);

    return (
        <Fragment>
            <Head>
                <title>Галерея</title>
            </Head>
            {showNotification && <Notification />}

            {showGalleryEditor && (
                <OverlayWindow>
                    <ImagesUploadForm
                        domain={props.domain}
                        fs_port={props.fs_port}
                    />
                </OverlayWindow>
            )}

            {isLoggedIn && (
                <AddBtn onClick={() => dispatch(editGallery())}>
                    Добавить галерею
                </AddBtn>
            )}

            {galleries.map((gallery) => (
                <GallerySection gallery={gallery} key={gallery.title} />
            ))}
        </Fragment>
    );
};

export default GalleryPage;

export const getStaticProps = async () => {
    await connectDB();

    const galleries = await Gallery.find().sort({ date: -1 });

    return {
        props: {
            galleries: JSON.parse(JSON.stringify(galleries)),
            domain: process.env.DOMAIN,
            fs_port: process.env.FS_PORT,
        },
        revalidate: 7200,
    };
};
