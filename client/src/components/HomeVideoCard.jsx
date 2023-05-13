import { useState } from 'react'
import { Box, Menu, MenuItem, Typography, styled } from '@mui/material'
import { Close, MoreVert } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Card = styled(Box)({
    width: '30vw',
    height: '40vh',
    textDecoration: 'none',
    color: 'inherit'
})

const CardImage = styled('img')({
    width: '100%',
    height: '75%',
    objectFit: 'cover',
    borderRadius: 20,
    cursor: 'pointer'
})

const CardContent = styled(Box)({
    width: '100%',
    height: '25%',
})

const Image = styled('img')({
    height: 40,
    width: 40,
    borderRadius: '50%',
    margin: '10px 0 0 10px'
})

const Title = styled(Typography)({
    margin: '17px 5px 0 10px',
    textTransform: 'capitalize',
    fontSize: 18,
    fontWeight: 600,
    cursor: 'pointer'
})

const More = styled(MoreVert)({
    margin: '17px 5px 0 auto',
    textTransform: 'capitalize',
    fontSize: 22,
    fontWeight: 600,
    cursor: 'pointer'
})

const UserName = styled(Typography)({
    margin: '5px 0 0 12px',
    fontSize: 14,
})

const UploadedDate = styled(Typography)({
    margin: '5px 10px 0 auto',
    fontSize: 14,
})

const Item = styled(MenuItem)({
    ':hover': {
        color: 'red'
    },
    '& > svg': {
        marginRight: 10
    }
})

const HomeVideoCard = ({ video }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()
    const open = Boolean(anchorEl);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleWatch = (video) => {
        navigate(`/watch/${video?._id}`)
    }

    return (
        <Card key={video?._id} >
            <CardImage onClick={() => handleWatch(video)} src={`/api/v1/videos/get/${video?.thumbnail}`} alt="thumbnail" />
            <CardContent>
                <Box style={{ display: 'flex' }} >
                    <Image src={video?.user.profile ? `/api/v1/auth/user-profile/${video.user.id}` : '/images/account.jpg'} alt='profile' />
                    <Title onClick={() => handleWatch(video)}  >{video?.title.slice(0, 30) + (video?.title.length > 30 ? "..." : "")}</Title>
                    <More onClick={handleMenuClick} />
                </Box>
                <Box>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <Item onClick={handleMenuClose} ><Close />Close</Item>
                    </Menu>
                </Box>
                <Box style={{ display: 'flex' }}  >
                    <UserName>{video?.user.firstName + ' ' + video?.user.lastName}</UserName>
                    <UploadedDate>Uploaded on {new Date(video?.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</UploadedDate>
                </Box>
            </CardContent>
        </Card>
    )
}

export default HomeVideoCard
