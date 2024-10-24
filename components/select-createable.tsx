"useClient"

import { useMemo } from "react";
import { SingleValue } from "react-select";
import CreatetableSelect from "react-select/creatable"


type Props = {
  onChange: (value?: string) => void;
  onCreate?: (value: string) => void;
  options?: { label: string, value: string }[],
  value?: string | null | undefined;
  dissabled?: boolean;
  placeholder?: string
}



export default function SelectCreateable({
  onChange,
  onCreate,
  options = [],
  value,
  dissabled,
  placeholder,
}: Props) {

  const onSelect = (options: SingleValue<{ label: string, value: string }>) => {
    onChange(options?.value)
  }

  const formattedValue = useMemo(() => {
    return options.find(option => option.value === value)
  }, [options, value])

  return (
    <CreatetableSelect
      className="h-9"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: '#e2e8f0',
          ":hover": {
            borderColor: '#e2e8f0',
          }
        })
      }}
      onChange={onSelect}
      options={options}
      onCreateOption={onCreate}
      value={formattedValue}
      placeholder={placeholder}
      isDisabled={dissabled}
    />
  )
}
