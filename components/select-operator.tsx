import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  value: string;
  onValueChange: (value: string) => void;
}

export default function SelectOperator({ value, onValueChange }: Props) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Op" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Operator</SelectLabel>
          <SelectItem value="add">+</SelectItem>
          <SelectItem value="subtract">-</SelectItem>
          <SelectItem value="multiply">x</SelectItem>
          <SelectItem value="divide">/</SelectItem>
          <SelectItem value="sqrt">sqrt</SelectItem>
          <SelectItem value="pow">pow</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
