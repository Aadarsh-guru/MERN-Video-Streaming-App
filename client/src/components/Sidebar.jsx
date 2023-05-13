import { Box, Button, Drawer, Typography, styled } from '@mui/material'
import { useData } from '../context/DataProvider'
import { NavLink } from 'react-router-dom'
import { HistoryOutlined, HomeOutlined, Logout, SlideshowOutlined, ThumbUpOffAlt, VideoLibraryOutlined, WatchLaterOutlined, UploadOutlined } from '@mui/icons-material'


const Wrapper = styled(NavLink)({
    color: '#000',
    textDecoration: "none",
    display: 'flex',
    padding: '10px 20px',
    margin: 10,
    cursor: 'pointer',
    borderRadius: 10,
    '& > svg': {
        marginRight: 20
    },
    ':hover': {
        background: 'lightgrey',
        color: '#000'
    }
})

const ButtonWrapper = styled(Box)({
    color: '#000',
    textDecoration: "none",
    display: 'flex',
    padding: '10px 20px',
    margin: 10,
    cursor: 'pointer',
    borderRadius: 10,
    '& > svg': {
        marginRight: 20
    },
    ':hover': {
        background: 'lightgrey',
        color: '#000'
    }
})

const Image = styled('img')({
    width: 100,
    height: 100,
    borderRadius: '50%'
})

const LoginWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px 0'
})

const LogoutButton = styled(Box)({
    color: '#000',
    textDecoration: "none",
    display: 'flex',
    padding: '10px 20px',
    margin: 10,
    cursor: 'pointer',
    borderRadius: 10,
    '& > svg': {
        marginRight: 20
    },
    ':hover': {
        background: 'lightgrey',
        color: 'red'
    },
})

const Sidebar = () => {

    const { openSideBar, setOpenSideBar, auth, setAuth, openLoginDialog, setOpenLoginDialog, openUploadDialog, setOpenUploadDialog } = useData()
    const handleSignIn = () => {
        setOpenSideBar(!openSideBar)
        setOpenLoginDialog(!openLoginDialog)
    }

    const handleLogout = () => {
        setAuth('')
        localStorage.removeItem('auth')
    }

    return (
        < Drawer anchor='left' open={openSideBar} hideBackdrop={true} ModalProps={{
            keepMounted: true
        }} variant='persistent' sx={{
            '& > .MuiDrawer-paper': {
                marginTop: '64px',
                width: 225,
                background: '#f5f5f5',
                borderRight: 'none',
                height: 'calc(100vh - 64px)'
            }
        }} >
            <Box style={{ marginTop: 20 }}>
                {
                    auth ?
                        (
                            <>

                                <Wrapper to='/' onClick={() => setOpenSideBar(!openSideBar)} >
                                    <HomeOutlined />
                                    <Typography >Home</Typography>
                                </Wrapper>
                                <Wrapper to='/library' onClick={() => setOpenSideBar(!openSideBar)} >
                                    <VideoLibraryOutlined />
                                    <Typography >Library</Typography>
                                </Wrapper>
                                <Wrapper to='/history' onClick={() => setOpenSideBar(!openSideBar)} >
                                    <HistoryOutlined />
                                    <Typography >History</Typography>
                                </Wrapper>
                                <ButtonWrapper onClick={() => { setOpenSideBar(!openSideBar); setOpenUploadDialog(!openUploadDialog) }} >
                                    <UploadOutlined />
                                    <Typography >Upload</Typography>
                                </ButtonWrapper>
                                <Wrapper to='/your-videos' onClick={() => setOpenSideBar(!openSideBar)} >
                                    <SlideshowOutlined />
                                    <Typography >Your Videos</Typography>
                                </Wrapper>
                                <Wrapper to='/watch-later' onClick={() => setOpenSideBar(!openSideBar)} >
                                    <WatchLaterOutlined />
                                    <Typography >Watch Later</Typography>
                                </Wrapper>
                                <Wrapper to='/liked-videos' onClick={() => setOpenSideBar(!openSideBar)} >
                                    <ThumbUpOffAlt />
                                    <Typography >Liked Videos</Typography>
                                </Wrapper>
                                <LogoutButton onClick={() => handleLogout()} >
                                    <Logout />
                                    Sign Out
                                </LogoutButton>
                            </>
                        )
                        :
                        (
                            <LoginWrapper>
                                <Image src='/images/account.jpg' alt="signin" />
                                <Typography style={{ fontSize: 14, color: 'grey', textAlign: 'center', padding: '10px 5px' }}>Seems You are not
                                    Logged in. Click <Box color='Highlight' component='span'>Sign in</Box> to contineu.
                                </Typography>
                                <Button onClick={() => handleSignIn()} >Sign in</Button>
                            </LoginWrapper>
                        )
                }
            </Box>
        </Drawer>
    )
}

export default Sidebar