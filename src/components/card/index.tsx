import React, { useState } from 'react'
import {CardBody, CardFooter, CardHeader, Card as NextUiCard, Spinner} from '@nextui-org/react';
import { useAddLikeMutation, useUnlikeMutation } from '../../app/services/likeApi';
import { useDeletePostMutation, useLazyGetAllPostsQuery, useLazyGetPostByIdQuery } from '../../app/services/postsApi';
import { useDeleteCommentMutation } from '../../app/services/commentsApi';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrent } from '../../features/user/user-slice';
import { User } from '../user';
import { formatToClientDate } from '../../utils/format-to-client-date';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Typeograph } from '../typeograph';
import { MetaInfo } from '../metainfo';
import { FcDislike } from 'react-icons/fc';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { FaRegComment } from 'react-icons/fa';
import { ErrorMessage } from '../errorMessge';

type Props = {
    avatarUrl: string;
    name: string;
    authorId: string;
    content: string;
    commentId?: string;
    likesCount?: number;
    commentsCount?: number;
    createdAt?: Date;
    id?: string;
    cardFor: 'comment' | 'post' | 'current post';
    likedByUser?: boolean;
}

export const Card = ({
    avatarUrl = "",
    name = "",
    authorId = "",
    content = "",
    commentId = "",
    likesCount = 0,
    commentsCount = 0,
    createdAt,
    id = '',
    cardFor = 'post',
    likedByUser = false,
}: Props) => {
    const [likePost] = useAddLikeMutation();
    const [unlike] = useUnlikeMutation();
    const [triggerGetAllPost] = useLazyGetAllPostsQuery();
    const [triggerGetPostById] = useLazyGetPostByIdQuery();
    const [deletePost, deletePostStatus] = useDeletePostMutation();
    const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrent);
    return (
        <NextUiCard className='mb-5'>
            <CardHeader className='justify-between items-center bg-transparent'>
                <Link to={`/user/${authorId}`}>
                    <User 
                        name={name}
                        className='text-small font-semibold leading-non text-default'
                        avatarUrl={avatarUrl}
                        description={createdAt && formatToClientDate(createdAt)}
                    />
                </Link>
                {
                    authorId === currentUser?.id && (
                        <div className="cursor-pointer">
                            {
                                deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
                                    <Spinner />
                                ) : (
                                    <RiDeleteBinLine />
                                )
                            }
                        </div>
                    )
                }
            </CardHeader>
            <CardBody className='px-3 py-2 mb-5'>
                <Typeograph>{content}</Typeograph>
            </CardBody>
            {
                cardFor !== 'comment' && (
                    <CardFooter className="gap-3">
                        <div className="flex gap-5 items-">
                            <div>
                                <MetaInfo 
                                    count={likesCount} 
                                    Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder} 
                                />
                            </div>
                            <Link to={`posts/${id}`}>
                                <MetaInfo count={commentsCount} Icon={FaRegComment} />
                            </Link>
                        </div>
                        <ErrorMessage error={error} />
                    </CardFooter>
                )
            }
        </NextUiCard>
    )
}
