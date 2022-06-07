import { hash } from 'bcryptjs';

export const hashPassword = async (passwd) => {
    const hashedPassword = hash(passwd, 15);

    return hashedPassword;
};
