import { useRouter } from 'next/router';

import Image from 'next/image';

import { formatDateDisplay } from '../../../utils/helpers';
import classes from './ProjectCard.module.css';

const ProjectCard = ({ project }) => {
    const router = useRouter();

    const projectClickHandler = async () => {
        router.push(`/projects#${project._id}`, null, { scroll: false });
    };

    const formattedDate = formatDateDisplay(
        project.date,
        project.dateCompleted
    );

    return (
        <div className={classes.card} onClick={projectClickHandler}>
            <div className={classes.image}>
                <Image
                    src={project.image || '/images/template.jpg'}
                    width={400}
                    height={400}
                    objectFit="cover"
                />
            </div>
            <div className={classes.content}>
                <h5>{project.title}</h5>
                <span className="date">{formattedDate}</span>
                <p>{project.description}</p>
            </div>
        </div>
    );
};

export default ProjectCard;
