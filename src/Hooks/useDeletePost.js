import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useDeletePost(post,token) {
const queryClient = useQueryClient();
      const { mutate: deletePost, isPending: isDeleting } = useMutation({
        mutationFn: delPost,
        onSuccess: () => {
          queryClient.invalidateQueries(["allPosts"]);
        },
        onError: () => {
          console.log("errorrrrr");
        },
      });
    
      async function delPost() {
        const { data } = await axios.delete(
          `https://route-posts.routemisr.com/posts/${post.id}`,
          {
            headers: {
              AUTHORIZATION: `Bearer ${token}`,
            },
          },
        );
        return data.data;
      }
    return {deletePost,isDeleting}
}
