import { Fragment } from 'react';
import Head from 'next/head';

import BannerSection from '../components/HomePage/BannerSection/BannerSection';
import AboutSection from '../components/HomePage/AboutSection/AboutSection';
import ProjectsCarousel from '../components/HomePage/ProjectsSection/ProjectsCarousel';
import ServicesSection from '../components/HomePage/ServicesSection/ServicesSection';

import { connectDB, Project } from '../utils/db-utils.js';

const HomePage = ({ projects }) => {
    return (
        <Fragment>
            <Head>
                <title>Главная</title>
            </Head>
            <BannerSection />
            <AboutSection />
            <ProjectsCarousel projects={projects} />
            <ServicesSection />
        </Fragment>
    );
};

export default HomePage;

export const getStaticProps = async () => {
    connectDB();

    const projects = await Project.find().sort({ date: -1 });

    return {
        props: { projects: JSON.parse(JSON.stringify(projects)) },
        revalidate: 7200,
    };
};
