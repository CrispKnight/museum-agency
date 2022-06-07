const NOTIFICATIONS = {
    AUTH_ERR: {
        status: 'error',
        message: 'Авторизация не пройдена.',
    },
    IMG_UPLOAD_ERR: {
        status: 'error',
        message: 'Ошибка при загрузке изображений.',
    },
    IMG_RM_ERR: {
        status: 'error',
        message: 'Ошибка при удалении изображения.',
    },
    GALLERY_LOADING: { status: 'loading', message: 'Загружаем галерею...' },
    GALLERY_ADD_ERR: {
        status: 'error',
        message: 'Ошибка при создании галереи.',
    },
    GALLERY_ADD_SUCCESS: {
        status: 'success',
        message: 'Галерея успешно сохранена!',
    },
    GALLERY_RM_LOADING: {
        status: 'loading',
        message: 'Удаляем галерею...',
    },
    GALLERY_RM_ERR: {
        status: 'error',
        message: 'Ошибка при удалении галереи.',
    },
    GALLERY_RM_SUCCESS: {
        status: 'success',
        message: 'Галерея успешно удалена.',
    },
    PROJECT_LOADING: {
        status: 'loading',
        message: 'Загружаем проект...',
    },
    PROJECT_ADD_ERR: {
        status: 'error',
        message: 'Ошибка при загрузке проекта.',
    },
    PROJECT_ADD_SUCCESS: {
        status: 'success',
        message: 'Проект успешно сохранен!',
    },
    PROJECT_RM_LOADING: {
        status: 'loading',
        message: 'Удаляем проект...',
    },
    PROJECT_RM_ERR: {
        status: 'error',
        message: 'Ошибка при удалении проекта.',
    },
    PROJECT_RM_SUCCESS: {
        status: 'success',
        message: 'Проект успешно удален.',
    },
    EMAIL_LOADING: {
        status: 'loading',
        message: 'Отправляем сообщение...',
    },
    EMAIL_ERR: {
        status: 'error',
        message: 'Ошибка при отправке сообщения.',
    },
    EMAIL_SUCCESS: {
        status: 'success',
        message: 'Сообщение успешно отправлено!',
    },
};

export default NOTIFICATIONS;
