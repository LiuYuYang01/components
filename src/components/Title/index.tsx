interface Props {
  title: string
}

export default ({ title }: Props) => {
  return (
    <div>
      <h3 className="text-2xl font-bold border-b border-gray-200 pb-2 mb-4">{title}</h3>
    </div>
  )
}