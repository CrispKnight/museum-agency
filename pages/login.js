import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LoginPage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/');

        fetch('/api/admin', { method: 'GET' });
    }, []);

    return null;
};

export default LoginPage;
