import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaThumbsUp, FaEdit, FaHeart } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Person } from '@mui/icons-material';
import { Link } from 'react-router-dom';

///////////////////////////////////////////////////////////////

export default function CommentBody({ comment, onLike, onEdit, onDelete }) {
  const [commentUser, setCommentUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const user = useSelector((state) => state.user.user)
  const navigate = useNavigate()
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_END}user?user=${comment.userId}`);
        if (res.status) {

          setCommentUser(res.data.item);
        }
      } catch (error) {
      }
    };
    getUser();
  }, [comment]);


///////////////////////////////////////////////////////////////

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);

  };

  ///////////////////////////////////////////////////////////////

  const handleSave = async () => {
    try {
      const res = await axios.put(`${process.env.REACT_APP_COMMENT_END}edit`,
        { _id: comment._id, content: editedContent })
      if (res.status) {
        setIsEditing(false);
        onEdit(comment, editedContent);

      }
    } catch (error) {
      console.log(error)
    }
  };

  ///////////////////////////////////////////////////////////////

  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className='flex-shrink-0 mr-3'>
      
        <Person></Person>
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1'>
          <Link to={`/dashboard?user=${comment.userId}&tab=profile`}>

            <span className='font-bold mr-1 text-xs truncate'>
              {`@${commentUser.fullName}`}
            </span>
          </Link>
          <span className='text-gray-500 text-xs'>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className='mb-2'
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className='flex justify-end gap-2 text-xs'>
              <Button
                type='button'
                size='sm'
                gradientDuoTone='purpleToBlue'
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type='button'
                size='sm'
                gradientDuoTone='purpleToBlue'
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className='text-gray-500 pb-2'>{comment.content}</p>
            <div className='flex items-center w-full justify-end pt-2 text-xs  dark:border-gray-700  gap-2'>
              <p className='text-gray-100'>
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes}
              </p>
              <button
                type='button'
                onClick={() => { (user) ? onLike(comment._id) : navigate("/signup") }}
                className={`text-gray-400  ${user && user._id &&
                  comment.likes.includes(user.uniqueName) &&
                  'text-red-500'
                  }`}
              >

                <FaHeart className='text-sm' />
              </button>


              {user &&
                ((user.uniqueName === comment.userId)) && (
                  <>
                    <button
                      type='button'
                      onClick={handleEdit}
                      className='text-gray-400 hover:text-blue-500'
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      type='button'
                      onClick={() => onDelete(comment._id)}
                      className='text-gray-400 hover:text-red-500'
                    >
                      {<MdDelete size={18} />}
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}