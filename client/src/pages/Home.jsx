import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, CircularProgress, styled } from '@mui/material'
import { useData } from '../context/DataProvider'
import toast from 'react-hot-toast'
import HomeVideoCard from '../components/HomeVideoCard'


const Container = styled(Box)({
    height: 'calc(100vh - 100px)',
    width: '100vw',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    margin: '20px 0',
    overflow: 'auto',
    rowGap: 20,
    scrollBehavior: 'smooth'
})


const Home = () => {

    const { render } = useData()
    const [videos, setVideos] = useState([])
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getAllVideos = async () => {
            setLoading(true)
            const response = await axios.get('/api/v1/videos/get-videos')
            response && setTimeout(() => setLoading(false), 500)
            if (response.data.success) {
                setVideos(response.data.videos)
            }
        }
        getAllVideos()
    }, [render])

    useEffect(() => {
        const loadMore = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/api/v1/videos/more-videos/${page}`)
                if (data.success) {
                    setVideos([...videos, ...data?.videos]);
                    setLoading(false)
                    videos?.length === 9 ? toast.success(data.message) : toast.success('No More videos to fetch')
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        if (page === 1) return
        loadMore()
        // eslint-disable-next-line
    }, [page])

    return (
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
                            <HomeVideoCard key={video?._id} video={video} />
                        ))
            }
            <Box sx={{ height: '50pxpx', width: '100vw', display: `${videos?.length < 9 ? 'none' : 'flex'}`, justifyContent: 'center', alignItems: 'center' }} >
                <Button onClick={() => setPage(page + 1)} >Load More..</Button>
            </Box>
        </Container>
    )
}

export default Home


