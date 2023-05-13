import { AppBar, Box, InputBase, Toolbar, styled } from '@mui/material'
import { AccountCircle, AccountCircleOutlined, Menu as MenuIcon, Mic, MoreVert, Notifications, Search, VideoCall, YouTube } from '@mui/icons-material'
import { useData } from '../context/DataProvider'
import { useNavigate } from 'react-router-dom'

const SearchWrapper = styled('form')({
    border: '1px solid grey',
    margin: '0 0 0 200px',
    borderRadius: 25,
    minWidth: 590,
    maxWidth: 620,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 10px',
    '& > div': {
        width: '100%',
        padding: '0 10px'
    }
})

const Heading = styled(Box)({
    marginLeft: 20,
    fontSize: 24,
    fontWeight: 600,
    cursor: 'pointer',
    '& > svg': {
        margin: '0 5px 5px 0',
        color: "red"
    }
})

const RightSection = styled(Box)({
    margin: '0 5px 0 auto',
    '& > svg': {
        margin: 15,
        cursor: 'pointer',
    }
})

const Navbar = () => {

    const navigate = useNavigate()

    const { setOpenSideBar, openSideBar, auth, openLoginDialog, setOpenLoginDialog, openUploadDialog, setOpenUploadDialog, openAccountInfoDialog, setOpenAccountInfoDialog, searchValue, setSearchValue, render, setRender,
        openSearchDialog, setOpenSearchDialog, listening, setListening } = useData()

    const onSignInClick = () => {
        setOpenLoginDialog(!openLoginDialog)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        navigate('/search')
        setRender(!render)
    }

    const onMicClick = () => {
        setOpenSearchDialog(!openSearchDialog)
        setListening(!listening)
    }


    return (
        <AppBar position='static' color='transparent'>
            <Toolbar>
                <MenuIcon color='' style={{ cursor: 'pointer', marginBottom: 3 }} onClick={() => setOpenSideBar(!openSideBar)} />
                <Heading onClick={() => navigate('/')} >
                    <YouTube fontSize='large' />
                    MyTube
                </Heading>
                <SearchWrapper onSubmit={(e) => handleSearch(e)} >
                    <InputBase value={searchValue} required onChange={(e) => setSearchValue(e.target.value)} placeholder='Search' />
                    <button type='submit' style={{ border: 'none', color: 'inherit', background: 'inherit' }} ><Search style={{ cursor: 'pointer' }} /></button>
                </SearchWrapper>
                <Mic onClick={() => onMicClick()} style={{ marginLeft: 10, cursor: 'pointer' }} color='' />
                <RightSection>
                    {
                        auth ? (
                            <>
                                <VideoCall color='' onClick={() => setOpenUploadDialog(!openUploadDialog)} />
                                <Notifications />
                                {
                                    auth?.profile ? <img style={{ width: 35, height: 35, borderRadius: '50%', cursor: 'pointer', marginLeft: 10 }} src={auth?.profile} alt="profile" onClick={() => setOpenAccountInfoDialog(!openAccountInfoDialog)} /> : <AccountCircle fontSize='large' onClick={() => setOpenAccountInfoDialog(!openAccountInfoDialog)} />
                                }
                            </>
                        ) :
                            (
                                <>
                                    <MoreVert />
                                    <Box onClick={() => onSignInClick()} style={{ padding: '5px 15px 10px 10px', border: '1px solid lightgrey', borderRadius: 25, cursor: 'pointer', color: 'Highlight', fontWeight: 600, fontSize: 14 }} component='span'>
                                        <AccountCircleOutlined style={{ marginRight: 5 }} />
                                        Sign in
                                    </Box>
                                </>
                            )
                    }
                </RightSection>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar