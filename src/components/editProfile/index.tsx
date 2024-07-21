import React, { useContext, useState } from 'react'
import {Input} from '../../components/input';
import {ThemeContext} from '../theme-provider';
import {useUpdateUserMutation} from '../../app/services/userApi';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@nextui-org/react';
import { MdOutlineEmail } from 'react-icons/md';
import {ErrorMessage} from '../errorMessge';
import { hasErrorField } from '../../utils/has-error-field';
import { User } from '../../app/types';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    user?: User;
}

type UserUp = {
    email: string;
    name?: string;
    dateOfBirth?: Date;
    bio?: string;
    location?: string;
}

export const EditProfile = ({isOpen, onClose, user}: Props) => {
    const {theme} = useContext(ThemeContext);
    const [updateUser, {isLoading}] = useUpdateUserMutation();
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const {id} = useParams<{id: string}>();

    const {handleSubmit, control} = useForm<UserUp>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: {
            email: user?.email,
            name: user?.name,
            dateOfBirth: user?.dateOfBirth,
            bio: user?.bio,
            location: user?.location
        }
    })
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files !== null) {
            setSelectedFile(e.target.files[0]);
        }
    }
    const onSubmit = async(data: UserUp) => {
        if(id) {
            try {
                const {name, email, dateOfBirth, bio, location} = data;
                const formData = new FormData();
                name && formData.append('name', name);
                email && email !== email && formData.append('email', email);
                dateOfBirth && formData.append(
                    'dateOfBirth', 
                    new Date(dateOfBirth).toISOString());
                bio && formData.append('bio', bio);
                location && formData.append('location', location);
                selectedFile && formData.append('avatar', selectedFile);
                await updateUser({userData: formData, id}).unwrap();
                onClose();
            } catch (error) {
                if(hasErrorField(error)) {
                    setError(error.data.error);
                }
            }
        }
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className={`${theme} text-foreground`}
        >
            <ModalContent>
                {
                    (onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>
                                Изменение профиля
                            </ModalHeader>
                            <ModalBody>
                                <form 
                                    className='flex flex-col gap-4'
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <Input
                                        control={control}
                                        name='email'
                                        label='Email'
                                        type='email'
                                        endContent={<MdOutlineEmail />}
                                    />
                                    <Input
                                        control={control}
                                        name='name'
                                        label='Имя'
                                        type='text'
                                    />
                                    <input 
                                        type="file" 
                                        name='avatarUrl' 
                                        placeholder='Выберите изображение' 
                                        onChange={handleFileChange}
                                    />
                                    <Input
                                        control={control}
                                        name='dateOfBirth'
                                        label='Дата рождения'
                                        type='date'
                                        placeholder='Дата рождения'
                                    />
                                    <Controller 
                                        name='bio'
                                        control={control}
                                        render={({field}) => (
                                            <Textarea 
                                                {...field}
                                                rows={4}
                                                placeholder='Ваша биография'
                                            />
                                        )}
                                    />
                                    <Input
                                        control={control}
                                        name='location'
                                        label='Местоположение'
                                        type='text'
                                    />
                                    <ErrorMessage error={error} />
                                    <div className="flex gap-2 justify-end">
                                        <Button
                                            fullWidth
                                            color="primary"
                                            type='submit'
                                            isLoading={isLoading}
                                        >
                                            Обновить профиль
                                        </Button>
                                    </div>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color='danger'
                                    variant='light'
                                    onPress={onClose}
                                >
                                    Закрыть
                                </Button>
                            </ModalFooter>
                        </>
                    )
                }
            </ModalContent>
        </Modal>
    )
}
