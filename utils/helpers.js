import jwt from 'jsonwebtoken';

export const getData = async (api) => {
    const res = await fetch(api, {
        method: 'GET',
    });
    const data = await res.json();

    return data;
};

export const getProjectsSets = (projects, numProjectsInSet) => {
    const projectsSets = [];

    for (let i = 0; i < projects.length; i += numProjectsInSet) {
        const projectSet = projects.slice(i, i + numProjectsInSet);
        projectsSets.push(projectSet);
    }

    return projectsSets;
};

export const formatDateForInput = (date) => {
    const formattedDate = `${date.getFullYear()}-${(
        '0' +
        (date.getMonth() + 1)
    ).slice(-2)}-${('0' + (date.getDay() + 1)).slice(-2)}`;

    return formattedDate;
};

export const formatDateDisplay = (date, dateCompleted) => {
    date = new Date(date);
    let formattedDate = date.toLocaleDateString('ru-RU', {
        month: 'long',
        year: 'numeric',
    });

    if (dateCompleted) {
        dateCompleted = new Date(dateCompleted).toLocaleDateString('ru-RU', {
            month: 'long',
            year: 'numeric',
        });
        formattedDate = `${formattedDate} - ${dateCompleted}`;
    }

    return formattedDate;
};

export const validateToken = async (token) => {
    sessionStorage.setItem('token', token);

    const res = await fetch('/api/admin', {
        method: 'POST',
        headers: new Headers({
            authorization: `Bearer ${token}`,
        }),
    });

    if (res.status !== 200) {
        return false;
    }

    return true;
};

export const validToken = (token) => {
    const isValid = jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err || user.role !== 'admin') return false;

        return true;
    });

    return isValid;
};

// export const nameImage = (fileName) => {
//     const newName = `${uuid.v4()}.${fileName.split('.').pop()}`;

//     return newName;
// };
