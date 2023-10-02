import { Link } from 'react-router-dom'
import { Post } from '../types/Post'


export const PostCard = ({name, createdAt, body, topics, id}: Post) => {
  return (
    <Link to={`/posts/${id}`}>
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-components">
  
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">
          {body}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 my-4">
        {
          topics.map(topic => (
            <span key={topic} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{`#${topic}`}</span>

          ))
        }
      </div>
    </div>
    </Link>
  )
}
