import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  ArrowLeft,
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
  Trash2,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { UserProfile } from "../../Context/UserProfile";
import useAddComment from "../../Hooks/useAddComment.js";
import useDeleteComments from "../../Hooks/useDeleteComments.js";
import useDeletePost from "../../Hooks/useDeletePost.js";
import useGetComments from "../../Hooks/useGetComments.js";
import Loader from "../Loader/Loader.jsx";
import { UserData } from "./../../Context/UserDataContext";

export default function PostCard({ post, details }) {
  const { token } = useContext(UserData);
  const { user } = useContext(UserProfile);
  const [showComments, setShowComments] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const queryClient = useQueryClient();

  const [isLiked, setIsLiked] = useState(
    post.likes?.some((User) =>
      User._id ? User._id === user?._id : user === user?._id,
    ),
  );
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [isSvae,setIsSave]=useState(post.bookmarked);
  const {AddComment,handleSubmit,isAddComment,isValid,register}=useAddComment(post,token);
  const {comments,isLoading}=useGetComments(post,token);
  const {deleteComment,isDeleteComment}=useDeleteComments(post,token);
  const {deletePost,isDeleting}=useDeletePost(post,token)



  const { mutate: mark, isPending } = useMutation({
    mutationFn: putMark,
    onSuccess: () => {
      queryClient.invalidateQueries(["savedPosts"]);
    },
  });

  async function putMark() {
    try {
      const { data } = await axios.put(
        `https://route-posts.routemisr.com/posts/${post.id}/bookmark`,
        {},
        {
          headers: {
            AUTHORIZATION: `Bearer ${token}`,
          },
        },
      );
      return data.data.bookmarksCount || [];
    } catch (err) {
      console.log(err);
    }
  }



  async function putLike() {
    const wasLiked = isLiked;
    try {
      const { data } = await axios.put(
        `https://route-posts.routemisr.com/posts/${post.id}/like`,
        {},
        {
          headers: {
            AUTHORIZATION: `Bearer ${token}`,
          },
        },
      );
      return data.data.likesCount || [];
    } catch (err) {
      console.log(err);
      setIsLiked(wasLiked);
      setLikesCount((prev) => (wasLiked ? prev + 1 : prev - 1));
    }
  }

  useEffect(() => {
    if (post.likes && user?._id) {
      const checkLiked = post.likes.some((User) =>
        User._id ? User._id === user.id : User === user.id,
      );
      setIsLiked(checkLiked);
    }
  }, [post.likes, user?._id]);


  useEffect(() => {
    if (user?._id) {
      setIsSave(post.bookmarked);
    }
  }, [post.bookmarked, user?._id]);


  function handleLike() {
    const wasLiked = isLiked;
    setIsLiked(!isLiked);
    setLikesCount((prev) => (wasLiked ? prev - 1 : prev + 1));
    putLike()
  }

  function handleMark() {
    setIsSave(!isSvae);
    mark()
  }
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-visible relative my-5">
      {details && (
        <Link
          to="/"
          className="p-3 inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" /> Back to feed
        </Link>
      )}
      <div className="flex items-center justify-between p-4">
        <Link
          to={`/friendProfile/${post.user._id}`}
          className="flex items-center gap-3"
        >
          <img
            src={post.user?.photo}
            className="h-10 w-10 rounded-full object-cover border border-gray-50"
            alt={post.user?.name}
          />
          <div>
            <h4 className="text-sm font-bold text-gray-900 hover:underline">
              {post.user?.name}{" "}
              <span className="text-[10px] text-gray-400 ms-2">
                {isSvae && "Saved"}
              </span>
            </h4>
            <p className="text-[11px] text-gray-400 font-medium tracking-wide uppercase">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </Link>

        <div className="relative flex">
              <button
                disabled={isPending}
                onClick={() => {
                  handleMark();
                  setIsMenuOpen(false);
                }}
                className={`flex focus:border-0 w-full cursor-pointer  items-center gap-2 px-3 py-2 text-sm font-medium  hover:bg-blue-50 rounded-lg transition `}
              >
                {(
                  <>
                    {" "}
                    <Bookmark
                      className={`${isSvae && " text-amber-300 fill-amber-300"} `}
                      size={16}
                    />
                  </>
                )}
              </button>
              
              {post?.user?._id === user?._id&&
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition"
          >
            <MoreHorizontal size={20} />
          </button>}

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 z-10 bg-white rounded-xl border border-gray-100 shadow-xl p-1 animate-in zoom-in-95 duration-150">
              {post?.user?._id === user?._id && (
                <button
                  disabled={isDeleting}
                  onClick={() => {
                    deletePost();
                    setIsMenuOpen(false);
                  }}
                  className="flex focus:border-0 w-full items-center cursor-pointer gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  {isDeleting ? (
                    <Loader />
                  ) : (
                    <>
                      {" "}
                      <Trash2 size={16} /> Delete Post
                    </>
                  )}
                </button>
              )}
            </div>
          )}

        </div>
      </div>

      <div className="px-4 pb-3">
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
          {post.body}
        </p>
      </div>

      {post.image && (
        <div className="bg-gray-50 border-y border-gray-50 flex justify-center">
          <img
            src={post.image}
            className="max-w-full max-h-[500px] object-contain"
            alt="Post content"
          />
        </div>
      )}
      {!details && (
        <div className="text-end px-5">
          <Link
            to={`/postdetails/${post.id}`}
            className="text-[10px] text-blue-700 font-bold "
          >
            View details
          </Link>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center justify-between border-b border-gray-50 pb-3 mb-3">
          <div className="flex items-center gap-6">
            <button
              onClick={handleLike}
              className={`
                      flex cursor-pointer justify-center items-center gap-2 p-1.5 rounded-xl transition-all font-semibold 
                      ${isLiked ? "text-red-600 bg-red-50" : "text-[#6a7282] hover:bg-gray-50"}
                      `}
            >
              <Heart
                className={`
                      text-lg 
                      ${isLiked ? "text-red-600" : ""}
                      `}
              />
              <span>{likesCount}{likesCount>1?' Likes':' Like'}</span>
            </button>

            <button
              onClick={() => setShowComments(!showComments)}
              className={`flex focus:border-0 cursor-pointer items-center gap-1.5 transition-colors ${showComments ? "text-blue-600" : "text-gray-500 hover:text-blue-600"}`}
            >
              <MessageCircle size={20} />
              <span className="text-xs font-bold">
                {post.commentsCount || 0} Comments
              </span>
            </button>
          </div>
        </div>

        {showComments && (
          <div className="space-y-4 pt-2 animate-in slide-in-from-top-2 duration-300">
            {isLoading && (
              <Skeleton
                count={2}
                width={"100% "}
                height={20}
                baseColor="#09c"
              />
            )}
            {post.commentsCount > 0 ? (
              comments?.map((comment) => (
                <div key={comment._id} className="flex gap-3 items-start">
                  <img
                    src={comment.commentCreator?.photo}
                    className="h-8 w-8 rounded-full object-cover shadow-sm"
                    alt="Commenter"
                  />
                  <div className="flex justify-between items-center bg-gray-50 rounded-2xl w-full px-4 py-2 relative">
                    <div>
                      <p className="text-[12px] font-bold text-gray-900">
                        {comment?.commentCreator?.name}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {comment?.content}
                      </p>
                    </div>
                    <div>
                      {comment.commentCreator._id === user._id && (
                        <button
                          onClick={() => deleteComment(comment._id)}
                          className="px-4 text-[11px] border border-slate-300 bg-gray-200 rounded hover:bg-red-600 hover:text-white transition cursor-pointer"
                        >
                          {isDeleteComment ? <Loader /> : "Delete"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-xs text-gray-400 py-2">
                No comments yet. Be the first!
              </p>
            )}

            <form
              onSubmit={handleSubmit(AddComment)}
              className="flex items-center gap-3 pt-3"
            >
              <div className="flex-1 relative group">
                <input
                  {...register("content")}
                  type="text"
                  placeholder="Write a comment..."
                  className="w-full bg-gray-100 border-transparent rounded-full py-2 px-4 text-xs focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none"
                />
                <button
                  disabled={!isValid}
                  className="absolute disabled:cursor-not-allowed disabled:text-blue-500/50 right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition"
                >
                  {isAddComment ? <Loader /> : <Send size={14} />}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
