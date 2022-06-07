import ProjectCard from './ProjectCard';

import classes from './ProjectsGrid.module.css';

const ProjectsGrid = ({ projects }) => {
    return (
        <div className={classes.container}>
            <div className={classes.grid}>
                {projects.map((project) => (
                    <ProjectCard project={project} key={project.title} />
                ))}
            </div>
        </div>
    );
};

export default ProjectsGrid;
