import { TextField } from "@mui/material";

const Search = (props) => {
    const { onChange, value, sx, ...others } = props;

    return <TextField
             label='Search'
             variant="outlined"
             fullWidth
             type='search' 
             value={value} 
             onChange={onChange} 
             others={others}
             sx={sx}
             />;
};

export default Search;