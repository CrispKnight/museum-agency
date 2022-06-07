import Image from 'next/image';

import Header from '../../ui/Header';

import classes from './AboutSection.module.css';

const AboutSection = () => {
    return (
        <section>
            <Header>О нас</Header>
            <div className={classes.content}>
                <div className={classes.image}>
                    <Image
                        src="/images/named_logo.jpg"
                        width={100}
                        height={50}
                        layout="responsive"
                        objectFit="contain"
                    />
                </div>
                <div>
                    <p>
                        Сибирское музейное агентство - независимая
                        некоммерческая организация, объединившая ученых и
                        музейных экспертов для организации проектов и
                        предоставления качественных услуг в области культурного
                        наследия. С 2003 года агентство организовало  и
                        воплотило свыше 70 крупных исследовательских,
                        издательских, образовательных, экспозиционных и
                        выставочных проектов. Мы выполняем проектирование
                        экспозиций под ключ, разрабатываем качественные решения
                        для музеев, создаем разнообразные музейные проекты.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
