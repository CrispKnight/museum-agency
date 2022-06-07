import Image from 'next/image';

import classes from './BannerSection.module.css';

const BannerSection = () => {
    return (
        <section className={classes.banner}>
            <div className={classes.text}>
                <span>КРЕАТИВНЫЕ ТЕХНОЛОГИИ,</span>
                <span>ПРОФЕССИОНАЛЬНЫЕ РЕШЕНИЯ,</span>
                <span>МУЗЕЙНЫЕ ПРОЕКТЫ</span>
                {/* <span style={{ marginLeft: '5vw' }}>КРЕАТИВНЫЕ ТЕХНОЛОГИИ,</span>
                <span style={{ marginLeft: '8vw' }}>ПРОФЕССИОНАЛЬНЫЕ РЕШЕНИЯ,</span>
                <span style={{ marginLeft: '11vw' }}>МУЗЕЙНЫЕ ПРОЕКТЫ</span> */}
            </div>
        </section>
    );
};

export default BannerSection;
