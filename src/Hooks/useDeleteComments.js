import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useDeleteComments(post,token) {
const queryClient = useQueryClient();
    const { mutate: deleteComment, isPending: isDeleteComment } = useMutation({
    mutationFn: (variables) => delComment(variables),
    onSuccess: () => {
      queryClient.invalidateQueries(["postComments", post.id]);
    },
    onError: () => {
      console.log("Errorrrrrrrrrrrrr");
    },
  });

  async function delComment(id) {
    try {
      const res = await axios.delete(
        `https://route-posts.routemisr.com/posts/${post.id}/comments/${id}`,
        {
          headers: {
            AUTHORIZATION: `Bearer ${token}`,
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  }
  return {deleteComment,isDeleteComment}
}
