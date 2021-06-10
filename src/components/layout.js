import Header from './header'
import { useRouter } from 'next/router'
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme'

const EXCLUDE_PAGES = ['/', '/pricings']

const Layout = ({ children }) => {
    const router = useRouter()
    return (
        <ThemeProvider theme = {theme}>
            { EXCLUDE_PAGES.includes(router.asPath) && <Header/> }
            { children }
        </ThemeProvider>
    )
}

export default Layout