import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../../app/services/postsApi';
import { Card } from '../../components/card';
import { Back } from '../../components/back';
import { comment } from 'postcss';
import { CreateComment } from '../../components/createComment';

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
      <div className="mt-10">
        <CreateComment />
      </div>
      <div className="mt-10">
        {
          data.comments ?
            data.comments.map(i => (
              <Card 
                cardFor='comment'
                key={i.id}
                avatarUrl={i.user.avatarUrl ?? ''}
                content={i.content}
                name={i.user.name ?? ''}
                authorId={i.userId}
                commentId={i.id}
                id={id}
              />
            )) : null
        }
      </div>
    </>
  )
}
