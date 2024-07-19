import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../../app/services/postsApi';
import { Card } from '../../components/card';
import { Back } from '../../components/back';

export const CurrentPost = () => {
  const params = useParams<{id: string}>();
  const {data} = useGetPostByIdQuery(params?.id ?? '');

  if(!data) return <h2>Поста не существует</h2>;

  const {
    content,
    id,
    authorId,
    comments,
    likes,
    author,
    likedByUser,
    createdAt
  } = data;

  return (
    <>
      <Back />
      <Card 
        cardFor='current-post'
        avatarUrl={author.avatarUrl ?? ''}
        content={content}
        name={author.name ?? ''}
        likesCount={likes.length}
        commentsCount={comments.length}
        authorId={authorId}
        id={id}
        likedByUser={likedByUser}
        createdAt={createdAt}
      />
    </>
  )
}
