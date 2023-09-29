import { Link } from "react-router-dom"
import { MdDeleteOutline } from 'react-icons/md'
import { deleteATask } from "../firebase/datastore"

interface CardInfo{
    name: string
    description: string
    id: string
    userId: string | undefined
    updateTaskListFunc: () => void
}

export const TaskCard = ({name, description, id, userId, updateTaskListFunc}:CardInfo) => {

    const deleteTask = async() => {
        if( userId){
            await deleteATask(userId, id)
        }
        updateTaskListFunc()
    }

  return (
    <Link to={`/tasks/${id}`}>
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto bg-semi-mint my-1">
        {/* <div className="animate-pulse flex space-x-4"> */}
        <div className=" flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
            <div className="h-2 ">
                <p className="font-semibold text-white">{name}</p>
            </div>
            <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                {/* <div className="h-2 bg-slate-700 rounded col-span-2"></div> */}
                    <div className="h-2 bg-slate-700 rounded col-span-3">
                        <p>{description}</p>
                    </div>
                </div>
            </div>
            </div>
                <div className="justify-end">
                <button onClick={deleteTask}>
                    <MdDeleteOutline size={24} color={`#FFF`}/>
                </button>
                </div>
        </div>
    </div>
    </Link>
  )
}
