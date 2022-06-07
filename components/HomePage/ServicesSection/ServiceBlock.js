import classes from './ServiceBlock.module.css';

const ServiceBlock = ({ service }) => {
    return (
        <div className={classes.container}>
            <div className={classes.icon}>
                <i className={service.icon}></i>
            </div>

            <h3 className={classes.title}>{service.title}</h3>
            <ul className={classes.list}>
                {service.content.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceBlock;
