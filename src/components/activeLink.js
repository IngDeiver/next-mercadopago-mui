import { useRouter } from 'next/router'
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  link: {
    paddingLeft:15,
    paddingRight:15,
    paddingBottom:5,
    paddingTop:5,
    margin:5,
    border: props => props.matchRoute ? 'solid 1px white' : 'none',
    '&:hover':{
      textDecoration: 'none',
      border: 'solid 1px white'
    }
  }
})

function ActiveLink({ children, href }) {
  const router = useRouter()
  const classes = useStyles({ matchRoute: router.asPath === href })

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <Link href={href} onClick={handleClick} className={classes.link} variant="button" 
    color="text.primary">
        {children}
    </Link>
  )
}

export default ActiveLink