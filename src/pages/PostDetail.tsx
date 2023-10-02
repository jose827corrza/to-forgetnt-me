import { useParams } from 'react-router-dom'
import { Comment, Post } from '../types/Post'
import { usePosts } from './Posts'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { NavContext } from '../context/NavigationContext'
import { addAComment, getAPost, obtainInfoFromUserId } from '../firebase/datastore'
import { CommentCard } from '../components/CommentCard'
import { User } from '../types/user'

export const PostDetail = () => {

  const { postId } = useParams()
  const {posts, triggerUpdatePosts, isLoading} = usePosts()

  const [userPostInfo, setUserPostInfo] = useState<User>({})
  const [post, setPost] = useState<Post>({})
  const [comment, setComment] = useState('')

  const {isLogged, userCredential} = useContext(AppContext)
  const {navigate} = useContext(NavContext)

  useEffect(() => {
    if(!isLogged){
      navigate('/')
    }

    if(postId){
      (async() => {
        const postInfo = await getAPost(postId)
        if( postInfo) {
          setPost(postInfo)
          const userInfo = await obtainInfoFromUserId(postInfo.userId)
          setUserPostInfo(userInfo)
        }
      })()
    }
  },[postId, isLoading])

  console.log(post);

  const handleComment = async() => {
    // TODO
    triggerUpdatePosts()
    if(postId && userCredential){
      const commentBody: Comment = {
        userId: userCredential.user.uid,
        text: comment,
        postId: postId
      }
      await addAComment(postId,commentBody)
    }
    setComment('')
  }
  
  return (
    <>
      <div className='w-full p-2 h-1/3  grid grid-flow-row-dense grid-cols-3 grid-rows-2 outline outline-1 outline-headers'>
        <div>
          <h1 className='text-2xl font-extrabold font-sans'>{post.name}</h1>
          <div>
            <p className='font-extralight text-xs'>{userPostInfo.email}</p>
          </div>
        </div>
        <div className='col-span-2'>
          <p>{post.body}</p>
        </div>
          {/* <div className="flex flex-col"> */}
          <div className="grid grid-cols-3 grid-rows-3">
          {
            post.topics?.map(topic => (
              <div className='flex justify-center items-center' key={topic}>
                <span key={topic} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{`#${topic}`}</span>
              </div>

            ))
          }
          </div>
      <div className='flex items-center'>
        <div className='w-full'>
          <textarea
            className='resize-none rounded-md w-full outline outline-1 outline-headers'
            value={comment}
            onChange={e => setComment(e.target.value)}
            />
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <div>
          <button
            onClick={handleComment}
            className='bg-components px-3 py-2 rounded-md hover:bg-headers text-lg outline outline-1 outline-headers'
            >
            Comment
          </button>
        </div>
      </div>
      </div>
    <div className='w-full p-2 h-2/3 '>
      <ul>
        {
          
            post.comments?.map(comment => (
              <>
                <li key={comment.id}>
                    <CommentCard text={comment.text} />
                </li>
              </>
            ))
          
        }
      </ul>
    </div>
    </>
  )
}
