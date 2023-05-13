import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, CircularProgress, styled } from '@mui/material'
import { useData } from '../context/DataProvider'
import UserVideoCard from '../components/UserVideoCard'

const Container = styled(Box)({
    height: 'calc(100vh - 120px)',
    width: '100vw',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    margin: '20px 0',
    overflow: 'auto',
    rowGap: 20,
    scrollBehavior: 'smooth'
})

const UserVideos = () => {

    const { render, auth } = useData()
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getAllVideos = async () => {
            setLoading(true)
            const response = await axios.get('/api/v1/videos/user-videos')
            response && setTimeout(() => setLoading(false), 500)
            if (response.data.success) {
                setVideos(response.data.videos)
            }
        }
        getAllVideos()
        // eslint-disable-next-line
    }, [render, auth])


    return (
        <>
            <Box sx={{ width: '100vw', display: `flex`, justifyContent: 'center', padding: '5px', background: 'grey', fontSize: 20, fontWeight: 600, color: '#ffffff' }} >
                Your Videos
            </Box >
            <Container>
                {
                    loading ?
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CircularProgress />
                        </Box>
                        : videos?.length <= 0 ?
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                No Videos to display. Upload videos to see result here.
                            </Box>
                            :
                            videos?.map(video => (
                                <UserVideoCard key={video?._id} video={video} />
                            ))
                }
            </Container>
        </>
    )
}

export default UserVideos
