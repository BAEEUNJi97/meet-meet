import AuthPoster from '@/components/auth/AuthPoster';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {

    return (
        <div className='w-full h-full py-20 flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-20'>
            <AuthPoster />
            <LoginForm />
        </div>
    );
}

