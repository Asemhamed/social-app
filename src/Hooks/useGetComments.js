import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useGetComments(post,token) {
  const { data: comments = [], isLoading } = useQuery({
    queryFn: getComments,
    queryKey: ["postComments", post._id],
    enabled: !!token,
  });
  
  async function getComments() {
    try {
      const { data: res } = await axios.get(
        `https://route-posts.routemisr.com/posts/${post.id}/comments?page=1&limit=10`,
        {
          headers: {
            AUTHORIZATION: `Bearer ${token}`,
          },
        },
      );
      return res.data.comments;
    } catch (err) {
      throw err;
    }
  }

    return {comments,isLoading}
}
