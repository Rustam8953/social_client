import React from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const Back = () => {
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);
    return (
        <div onClick={handleBack} className='inline-block'>
            <div className='text-default-500 flex items-center gap-2 mb-5 cursor-pointer'>
                <FaRegArrowAltCircleLeft />
                Назад
            </div>
        </div>
    )
}
