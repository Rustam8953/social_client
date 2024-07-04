import React, { useState } from 'react'
import { useRegisterMutation } from '../app/services/userApi';
import { useForm } from 'react-hook-form';
import { Input } from '../components/input';
import { Button, Link } from '@nextui-org/react';

type Reg = {
    email: string;
    password: string;
    name: string;
}

type Props = {
    setSelected: (value: string) => void;
}

export const SignUp = ({setSelected}: Props) => {
    const {handleSubmit, control, formState: {errors}} = useForm<Reg>({
        mode: 'onChange',
        reValidateMode: "onBlur",
        defaultValues: {
            email: '',
            password: '',
            name: ''
        }
    })
    const [register, {isLoading}] = useRegisterMutation();
    const [error, setError] = useState('');
    const onSubmit = async (data: Reg) => {
        try {
            await register(data).unwrap();
        } catch (error) {
            
        }
    }
    return (
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <Input 
                name='email'
                label='Логин'
                control={control}
                type='email'
                required='Введите вашу почту'
            />
            <Input 
                name='password'
                label='Пароль'
                control={control}
                type='password'
                required='Введите пароль'
            />
            <Input 
                name='name'
                label='Имя'
                control={control}
                type='text'
                required='Введите ваше имя'
            />
            <p className="text-small">
                Есть аккаунт?{" "}
                <Link
                    size='sm'
                    className='cursor-pointer'
                    onPress={() => setSelected('login')}
                >
                    Войти
                </Link>
            </p>
            <div className="flex gap-2 justify-end">
                <Button fullWidth color='primary' type='submit' isLoading={isLoading}>
                    Зарегистрироваться
                </Button>
            </div>
        </form>
    )
}
