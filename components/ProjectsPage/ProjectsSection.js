import Header from '../ui/Header';
import ProjectDetails from './ProjectDetails';

import classes from './ProjectsSection.module.css';

const ProjectsSection = ({ style, title, projects }) => {
    return (
        <section className={classes[style]}>
            <Header>{title}</Header>
            {projects.map((project) => (
                <ProjectDetails project={project} key={project.title} />
            ))}
        </section>
    );
};

export default ProjectsSection;
