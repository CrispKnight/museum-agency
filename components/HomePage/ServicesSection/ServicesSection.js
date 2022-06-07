import Header from '../../ui/Header';
import ServiceBlock from './ServiceBlock';

import SERVICES from '../../../content/services.js';

const ServicesSection = () => {
    return (
        <section id="services">
            <Header>Услуги</Header>
            {SERVICES.map((service) => (
                <ServiceBlock service={service} key={service.title} />
            ))}
        </section>
    );
};

export default ServicesSection;
