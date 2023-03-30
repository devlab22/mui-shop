import { TextField } from "@mui/material";

const Search = (props) => {
    const { onChange, value, sx } = props;

    return <TextField
             label='Search'
             variant="outlined"
             fullWidth
             type='search' 
             value={value} 
             onChange={onChange} 
             sx={sx}
             />;
};

export default Search;