import { Box, CircularProgress, Typography, styled } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import toast from 'react-hot-toast'
import axios from 'axios'
import { ThumbUp, Share, WatchLater } from '@mui/icons-material'
import RelatedVideoCard from '../components/RelatedVideoCard'
import { useData } from '../context/DataProvider'

const Container = styled(Box)({
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    rowGap: 20,
})

const LeftBox = styled(Box)({
    height: 'calc(100vh)',
    width: '65vw',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    overflow: 'auto',
    scrollBehavior: 'smooth',
})

const RightBox = styled(Box)({
    height: 'calc(100vh)',
    width: '35vw',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    rowGap: 20,
    background: '#f2f2f2',
    padding: '10px 0 75px 0',
    overflow: 'auto',
    scrollBehavior: 'smooth',
})

const BottomBox = styled(Box)({
    height: '40vh',
    width: '100%',
})

const Title = styled(Typography)({
    width: '100%',
    padding: '10px 20px',
    fontSize: '22px',
    fontWeight: 600,
    textTransform: 'capitalize',
})

const Actions = styled(Box)({
    width: '100%',
    display: 'flex',
})

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%',
    margin: '0px 20px'
})

const UserName = styled(Typography)({
    margin: '10px 0',
    fontSize: 20,
    fontWeight: 600
})

const Like = styled(Box)({
    fontSize: 18,
    fontWeight: 600,
    margin: 'auto 10px auto 10px',
    "& > svg": {
        fontSize: 20,
        margin: '0 5px 5px 0 '
    },
    border: '1px solid grey',
    padding: '3px 10px',
    borderRadius: 20,
    ':hover': {
        background: '#f2f2f2'
    },
    cursor: 'pointer'
})

const ShareButton = styled(Box)({
    fontSize: 18,
    fontWeight: 600,
    margin: 'auto 10px auto 10px',
    "& > svg": {
        fontSize: 20,
        margin: '0 5px 5px 0 '
    },
    border: '1px solid grey',
    padding: '3px 10px',
    borderRadius: 20,
    ':hover': {
        background: '#f2f2f2'
    },
    cursor: 'pointer'
})

const WatchLaterButton = styled(Box)({
    fontSize: 18,
    fontWeight: 600,
    margin: 'auto 10px auto 10px',
    "& > svg": {
        fontSize: 20,
        margin: '0 5px 5px 0 '
    },
    border: '1px solid grey',
    padding: '3px 10px',
    borderRadius: 20,
    ':hover': {
        background: '#f2f2f2'
    },
    cursor: 'pointer'
})

const DecriptionBox = styled(Box)({
    width: 'calc(100% - 20px)',
    height: '18vh',
    maxHeight: '100%',
    background: '#f2f2f2',
    margin: 10,
    borderRadius: 20,
    overflowY: 'auto',
    scrollBehavior: 'smooth'
})

const UploadedDate = styled(Typography)({
    margin: '10px 10px 0 0',
    fontSize: 14,
    fontWeight: 600,
    color: 'gray'
})

const Description = styled(Box)({
    margin: '20px',
})

const Watch = () => {

    const { render } = useData()
    const { id } = useParams()
    const [video, setVideo] = useState({})
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axios.get(`/api/v1/videos/get-video/${id}`)
                if (response.status === 200) {
                    setVideo(response.data.video)
                }
            } catch (error) {
                console.log(error);
                toast.error('something went wrong')
            }
        }
        fetchVideo()
        // eslint-disable-next-line
    }, [render])

    useEffect(() => {
        const fetchRelatedVideos = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/api/v1/videos/related-videos/${video?.userId}`)
                response && setTimeout(() => setLoading(false), 500)
                if (response.data.success) {
                    const filteredData = response.data.videos.filter(e => e._id !== id)
                    setVideos(filteredData)
                }
            } catch (error) {
                console.log(error);
                toast.error('something went wrong')
            }
        }
        video?.title && fetchRelatedVideos()
        // eslint-disable-next-line
    }, [video, render])


    return (
        <Container>
            <LeftBox>
                <Box className="container">
                    {
                        video && <video autoPlay controls src={`/api/v1/videos/get/${video?.video}`} id="video"></video>
                    }
                </Box>
                <BottomBox>
                    <Title>{video?.title}</Title>
                    <Actions>
                        {video && video?.user?.profile ? <Image src={`/api/v1/auth/user-profile/${video?.userId}`} /> : <Image src={`/images/account.jpg`} />}
                        <UserName>{video?.user?.firstName + ' ' + video?.user?.lastName}</UserName>
                        <Box sx={{ marginLeft: 'auto', display: 'flex' }}>
                            <Like component='span'><ThumbUp />Like</Like>
                            <ShareButton component='span'><Share />Share</ShareButton>
                            <WatchLaterButton component='span'><WatchLater />Watch Later</WatchLaterButton>
                        </Box>
                    </Actions>
                    <DecriptionBox>
                        <Box style={{ display: 'flex', padding: '0px 20px' }} >
                            <UploadedDate>Uploaded on {new Date(video?.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</UploadedDate>
                        </Box>
                        <Description>
                            {video?.description}
                        </Description>
                    </DecriptionBox>
                </BottomBox>
            </LeftBox>
            <RightBox>
                {
                    loading ?
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CircularProgress />
                        </Box>
                        : videos?.length <= 0 ?
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                No Related Videos to display.
                            </Box>
                            :
                            videos?.map(video => (
                                <RelatedVideoCard key={video?._id} video={video} />
                            ))
                }
            </RightBox>
        </Container>
    )
}

export default Watch

