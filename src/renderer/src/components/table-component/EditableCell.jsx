import { Input, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

const EditableCell = ({ getValue, row, column, table }, {unit}) => {
  const initialValue = getValue()
  const [value, setValue] = useState(initialValue)

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <Text maxW={'100px'}>{value}{unit}</Text>
    // <Input
    //   value={value.toLowerCase()}
    //   size="md"
    //   onChange={(e) => setValue(e.target.value)}
    //   onBlur={onBlur}
    //   readOnly
    //   variant={'unstyled'}
    // />
  )
}
export default EditableCell
