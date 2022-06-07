import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import Header from '../../ui/Header';
import ProjectsGrid from './ProjectsGrid';

import classes from './ProjectsCarousel.module.css';
import { getProjectsSets } from '../../../utils/helpers';

const ProjectsCarousel = ({ projects }) => {
    // TODO: Optimization
    const [numProjectsInSet, setNumProjectsInSet] = useState(3);

    const windowResizeHandler = () => {
        if (window.innerWidth > 1900) return setNumProjectsInSet(4);

        if (window.innerWidth <= 1900 && window.innerWidth > 1400)
            return setNumProjectsInSet(3);

        if (window.innerWidth <= 1400 && window.innerWidth > 900)
            return setNumProjectsInSet(2);

        if (window.innerWidth <= 900) return setNumProjectsInSet(1);
    };

    useEffect(() => {
        windowResizeHandler();
        window.addEventListener('resize', windowResizeHandler);

        return () => window.removeEventListener('resize', windowResizeHandler);
    }, []);

    const projectsSets = getProjectsSets(projects, numProjectsInSet);

    return (
        <section className={classes.projects}>
            <Header>Проекты</Header>
            <Carousel variant="dark">
                {projectsSets.map((projectSet) => (
                    <Carousel.Item key={projectSet[0].title}>
                        <ProjectsGrid projects={projectSet} />
                    </Carousel.Item>
                ))}
            </Carousel>
        </section>
    );
};

export default ProjectsCarousel;
