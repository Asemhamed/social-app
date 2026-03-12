import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { useForm } from 'react-hook-form';
import { AddCommentSchema } from '../../schemaValidation';
import axios from 'axios';

export default function useAddComment(post,token) {
    const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(AddCommentSchema),
    mode: "onChange",
  });
  
  const { mutate: AddComment, isPending: isAddComment } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["postComments", post.id]);
    },
    onError: () => {
      console.log("Errorrrrrrrrrrrrr");
    },
  });

  async function addComment(values) {
    const formData = new FormData();
    formData.append("content", values.content);
    const res = await axios.post(
      `https://route-posts.routemisr.com/posts/${post.id}/comments`,
      formData,
      {
        headers: {
          AUTHORIZATION: `Bearer ${token}`,
        },
      },
    );
    reset();
    return res;
  }

  return {AddComment,isAddComment,handleSubmit,register,isValid}
}
