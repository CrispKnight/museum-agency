import Image from 'next/image';

import classes from './ImagePreview.module.css';

const ImagePreview = ({ url, name, onClick }) => {
    const removeImageHandler = (event) => {
        event.preventDefault();
        onClick(name);
    };

    return (
        <div className={classes.image}>
            <div className={classes.remove}>
                <button onClick={removeImageHandler}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div>
                <Image
                    src={url}
                    width={100}
                    height={100}
                    layout="responsive"
                    objectFit="cover"
                />
            </div>
        </div>
    );
};

export default ImagePreview;
