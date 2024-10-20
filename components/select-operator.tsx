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
        <SelectValue placeholder="Select Operator" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Operator</SelectLabel>
          <SelectItem value="add">Add (+)</SelectItem>
          <SelectItem value="subtract">Subtract (-)</SelectItem>
          <SelectItem value="multiply">Multiply (*)</SelectItem>
          <SelectItem value="divide">Divide (/)</SelectItem>
          <SelectItem value="sqrt">Square Root(sqrt)</SelectItem>
          <SelectItem value="pow">Square(pow)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
