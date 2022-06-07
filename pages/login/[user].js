import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const LoginPage = () => {
    const router = useRouter();
    let user = router.query.user;

    useEffect(() => {
        if (user) {
            fetch('/api/admin', {
                method: 'POST',
                body: JSON.stringify({ user: user }),
                headers: { 'Content-Type': 'application/json' },
            }).then(() => router.push('/'));
        }
    }, [user]);

    return null;
    // <form method="POST" action="http://localhost:3000/api/admin">
    //     <input type="hidden" id="token" value="token" />
    //     <input type='submit' />
    // </form>
};

export default LoginPage;
