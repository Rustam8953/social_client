import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Input } from '../components/input';
import { Button, Link } from '@nextui-org/react';
import { useLazyCurrentQuery, useLoginMutation } from '../app/services/userApi';
import { useNavigate } from 'react-router-dom';

type Login = {
    email: string;
    password: string;
}

type Props = {
    setSelected: (value: string) => void;
}

export const Login = ({setSelected}: Props) => {
    const {
        handleSubmit,
        control,
        formState: {errors}
    } = useForm<Login>({
        mode: "onChange",
        reValidateMode: "onBlur",
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const [login, {isLoading}] = useLoginMutation();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [triggerCurrentQuery] = useLazyCurrentQuery();
    const onSubmit = async (data: Login) => {
        try {
            await login(data).unwrap();
        } catch (error) {
            
        }
    }
    return (
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
            <Input 
                control={control}
                name='email'
                label='Email'
                type='email'
                required='Введите почту'
            />
            <Input 
                control={control}
                name='password'
                label='Пароль'
                type='password'
                required='Введите пароль'
            />
            <p className="text-small">
                Нет аккаунта?{" "}
                <Link
                    size='sm'
                    className='cursor-pointer'
                    onPress={() => setSelected('sign-up')}
                >
                    Зарегестрироваться
                </Link>
            </p>
            <div className="flex gap-2 justify-end">
                <Button fullWidth color='primary' type='submit' isLoading={isLoading}>
                    Войти
                </Button>
            </div>
        </form>
    )
}