import { TextField } from "@mui/material";

export default function Search(props){
    const { onChange, value, ...others } = props;

    return <TextField
             variant="outlined"
             fullWidth
             type='search' 
             value={value}
             onChange={onChange} 
             {...others}
             />
};