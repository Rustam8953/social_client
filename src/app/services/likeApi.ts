import { Like } from "../types";
import { api } from "./api";

export const likeApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addLike: builder.mutation<Like, {postId: string}>({
            query: (body) => ({
                url: `/likes/`,
                method: 'POST',
                body: body
            })
        }),
        unlike: builder.mutation<void, string>({
            query: (postId) => ({
                url: `/likes/${postId}`,
                method: 'DELETE'
            })
        })
    })
})

export const {
    useAddLikeMutation,
    useUnlikeMutation
} = likeApi;

export const {
    endpoints: {addLike, unlike} 
} = likeApi;