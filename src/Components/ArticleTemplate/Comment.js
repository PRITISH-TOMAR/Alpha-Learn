import { Alert, Button, Modal, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CommentBody from './CommentBody';
import axios from 'axios';
import toast from 'react-hot-toast';


/////////////////////////////////////////////////////////////////////////

export default function Comment({ artId }) {
  const user = useSelector((store) => store.user.user) || {}
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

///////////////////////////////////////////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(process.env.REACT_APP_COMMENT_END)
    if (!comment) {
      return;
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_COMMENT_END}create`, {
        content: comment,
        artId,
        userId: user.uniqueName,
      }, {

        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      //   const data = await res.json();
      if (res.status) {
        setComment('');
        setCommentError(null);
        toast.success("Added")
        setComments([res.data.newComment, ...comments]);
      }
    } catch (error) {
      toast.error(error.message)
      setCommentError(error.message);
    }
  };
///////////////////////////////////////////////////////////////

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_COMMENT_END}retrieve?artId=${artId}`);

        if (res.status) {
          setComments(res.data.comments)
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getComments();
  }, [artId, comments, liked]);

  ///////////////////////////////////////////////////////////////


  const handleLike = async (commentId) => {
    try {
      if (!user) {
        navigate('/sign-in');
        return;
      }
      const res = await axios.put(`${process.env.REACT_APP_COMMENT_END}like?cid=${commentId}&user=${user.uniqueName}`);
      if (res.status) {
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                ...comment,
                likes: res.data.likes,
                numberOfLikes: res.data.likes.length,
              }
              : comment
          )
        );

        setLiked(true)
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  ///////////////////////////////////////////////////////////////

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  ///////////////////////////////////////////////////////////////


  const handleDelete = async (commentId) => {
    // setShowModal(false);
    console.log("comme" + commentId)
    try {
      if (!user) {
        navigate('/sign-in');
        return;
      }
      const res = await axios.delete(`${process.env.REACT_APP_COMMENT_END}delete?id=${commentId}`);
      if (res.status) {

        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  ///////////////////////////////////////////////////////////////

  return (
    <div className='max-w-2xl mx-auto w-full p-3 bg-black'>

      {user && (
        <form
          onSubmit={handleSubmit}
          className='border border-teal-500 rounded-md p-3'
        >
          <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200'
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          {user.fullName ? (
            <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
              <p> Comment as:</p>
              <img
                className='h-5 w-5 object-cover rounded-full'
                src={user.profilePicture}
                alt=''
              />

              <Link
                to={'/dashboard?tab=profile'}
                className='text-xs text-cyan-600 hover:underline'
              >
                {user.fullName}
              </Link>
            </div>
          ) : (
            <div className='text-sm text-teal-500 my-5 flex gap-1'>
              You must be signed in to comment.
              <Link className='text-blue-500 hover:underline' to={'/signup'}>
                Sign In
              </Link>
            </div>
          )}

          <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-500 text-xs'>
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone='purpleToBlue' type='submit' disabled={!user._id}>
              Add
            </Button>
          </div>
          {commentError && (
            <Alert color='failure' className='mt-5'>
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className='text-sm my-5'>No comments yet!</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <CommentBody
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                handleDelete(commentId);

              }}
            />
          ))}
        </>
      )}

    </div>
  );
}