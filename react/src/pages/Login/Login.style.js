import { makeStyles } from '@material-ui/core/styles'


// doing styling is trash
// idk what any of these means
const useStyles = makeStyles(theme => ({
    error: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.palette.primary.main,
    }
}));

export default useStyles;