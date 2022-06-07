//TODO: Next.js Images

import { useDispatch, useSelector } from 'react-redux';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

import { editProject, createNotification, revalidate } from '../../store';
import { formatDateDisplay } from '../../utils/helpers';
import classes from './ProjectDetail.module.css';

const ProjectDetail = ({ project }) => {
    const { isLoggedIn, token } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const deleteProjectHandler = async () => {
        dispatch(createNotification('PROJECT_RM_LOADING'));

        const res = await fetch('/api/projects', {
            method: 'DELETE',
            body: JSON.stringify({ id: project._id }),
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            return dispatch(createNotification('PROJECT_RM_ERR'));
        }

        dispatch(createNotification('PROJECT_RM_SUCCESS'));
        dispatch(revalidate());
    };

    const styles = `${classes.card} ${
        project.dateCompleted && classes.completed
    }`;

    const formattedDate = formatDateDisplay(
        project.date,
        project.dateCompleted
    );

    return (
        <div className={styles} id={project._id}>
            <div className={classes.flex}>
                <div className={classes.image}>
                    <img
                        src={project.image || '/images/template.jpg'}
                        alt=""
                        className={classes.image}
                    />
                </div>
                <div className={classes.content}>
                    <h3>{project.title}</h3>
                    <span className="date">{formattedDate}</span>
                    <p>{project.content}</p>
                    {project?.gallery && (
                        <Link href={`/gallery/#${project.gallery}`}>
                            Галеря проекта
                        </Link>
                    )}
                </div>
            </div>

            {isLoggedIn && (
                <div className={classes.controls}>
                    <Button
                        variant="outline-danger"
                        onClick={deleteProjectHandler}
                    >
                        Удалить
                    </Button>
                    <Button
                        variant="outline-primary"
                        onClick={() => dispatch(editProject(project))}
                    >
                        Редактировать
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ProjectDetail;
