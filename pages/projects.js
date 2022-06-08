// import fs from 'fs';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';

import ProjectsSection from '../components/ProjectsPage/ProjectsSection';
import OverlayWindow from '../components/ui/OverlayWindow';
import ProjectForm from '../components/OverlayForms/ProjectForm/ProjectForm';
import Notification from '../components/ui/Notification';
import AddBtn from '../components/ui/AddBtn';

import { connectDB, Project } from '../utils/db-utils.js';
import { getData, validateToken } from '../utils/helpers';
import { editProject, login, commitChanges } from '../store';
import useMounted from '../utils/useMounted';

const ProjectsPage = (props) => {
    const router = useRouter();
    const mounted = useMounted();
    const dispatch = useDispatch();

    const sessionToken = mounted && sessionStorage.getItem('token');

    const [currentProjects, setCurrentProjects] = useState(
        props.projects.currentProjects
    );
    const [completedProjects, setCompletedProjects] = useState(
        props.projects.completedProjects
    );

    const { showNotification } = useSelector((state) => state.notifications);
    const { isLoggedIn, changesCommited } = useSelector((state) => state.user);
    const { showProjectEditor, project } = useSelector(
        (state) => state.overlays
    );

    useEffect(() => {
        if (isLoggedIn && !changesCommited) {
            getData(
                `http://${props.domain}:${props.fs_port}/api/projects`
            ).then((data) => {
                setCurrentProjects(data.currentProjects);
                setCompletedProjects(data.completedProjects);
                dispatch(commitChanges());
            });
        }
    }, [isLoggedIn, changesCommited]);

    useEffect(() => {
        const token = router.query?.token || sessionToken;

        if (token) {
            validateToken(token).then((tokenIsValid) => {
                if (tokenIsValid) {
                    dispatch(login(token));
                }
            });
        }
    }, [router.query, sessionToken]);

    return (
        <Fragment>
            <Head>
                <title>Проекты</title>
            </Head>
            {showNotification && <Notification />}

            {showProjectEditor && (
                <OverlayWindow>
                    <ProjectForm
                        project={project}
                        domain={props.domain}
                        fs_port={props.fs_port}
                    />
                </OverlayWindow>
            )}

            {isLoggedIn && (
                <AddBtn onClick={() => dispatch(editProject())}>
                    Добавить проект
                </AddBtn>
            )}

            <ProjectsSection
                title="Текущие проекты"
                style="current"
                projects={currentProjects}
            />

            <ProjectsSection
                title="Завершенные проекты"
                style="completed"
                projects={completedProjects}
            />
        </Fragment>
    );
};

export default ProjectsPage;

export const getStaticProps = async () => {
    await connectDB();

    const currentProjects = await Project.find({
        dateCompleted: null,
    }).sort({
        date: -1,
    });
    const completedProjects = await Project.find({
        dateCompleted: { $ne: null },
    }).sort({ date: -1 });

    return {
        props: {
            projects: JSON.parse(
                JSON.stringify({ currentProjects, completedProjects })
            ),
            domain: process.env.DOMAIN,
            fs_port: process.env.FS_PORT,
        },
        revalidate: 7200,
    };
};
