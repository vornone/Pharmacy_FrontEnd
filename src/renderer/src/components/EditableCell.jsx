import React , { useEffect, useState }from "react";
import { Input } from "@chakra-ui/react";
function EditableCell({getValue}) {
    const initialValue = getValue();
    const [value, setValue] = useState(initialValue);
useEffect(() => {
  setValue(initialValue)
}, [initialValue])
  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      variant={"outline"}
      overflow={"hidden"}
      textOverflow={"ellipsis"}
      whiteSpace={"nowrap"}
      contentEditable={false}
    />
  );
}

export default EditableCell;
