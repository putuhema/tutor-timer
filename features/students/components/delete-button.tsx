import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Delete } from "lucide-react"
import { useDeleteStudent } from "../api/use-delete-student"

type Props = {
  id: number
}

export default function DeleteButton({ id }: Props) {
  const { mutate, isPending } = useDeleteStudent()


  const onClick = () => {
    mutate({
      id: id.toString(),
    })
  }

  return (
    <DropdownMenuItem
      onClick={onClick}
      className="text-red-500 hover:text-red-500/80 focus:text-red-500/80">
      <Delete className="w-4 h-4 mr-2" />
      Delete
    </DropdownMenuItem>

  )
}
