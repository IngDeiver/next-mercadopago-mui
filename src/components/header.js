import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ActiveLink from "./activeLink";
import { Hidden } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Hidden xsDown>
          <Typography variant="h6" noWrap className={classes.toolbarTitle}>
            Mercado Pago app
          </Typography>
        </Hidden>
        <nav>
          <ActiveLink href="/">Home</ActiveLink>
          <ActiveLink href="/pricings">Pricings</ActiveLink>
        </nav>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
