interface Props {
  text: string
}

export const CommentCard = ({ text}: Props) => {
  return (
    <div className=' h-12  my-2 p-2 rounded-md bg-components outline outline-headers outline-2'>
        {text}
    </div>
  )
}
