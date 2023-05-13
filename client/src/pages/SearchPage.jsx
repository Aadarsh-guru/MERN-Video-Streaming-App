import { useEffect, useState } from 'react'
import { useData } from '../context/DataProvider'
import axios from 'axios'
import { Box, CircularProgress, styled } from '@mui/material'
import HomeVideoCard from '../components/HomeVideoCard'

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

const SearchPage = () => {

    const { searchValue, render } = useData()
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const serachedVideos = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/api/v1/videos/search/${searchValue}`)
                response && setTimeout(() => setLoading(false), 500)
                if (response.data.success) {
                    setVideos(response.data.videos)
                }
            } catch (error) {
                console.log(error);
            }
        }
        searchValue && serachedVideos()
        // eslint-disable-next-line
    }, [render])

    return (
        <>
            <Box sx={{ width: '100vw', display: `flex`, justifyContent: 'center', padding: '5px', background: 'grey', fontSize: 20, fontWeight: 600, color: '#ffffff' }} >
                {searchValue ? `Search Results For '${searchValue}'` : `Your Search Results`}
            </Box >
            <Container>
                {
                    loading ?
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CircularProgress />
                        </Box>
                        : videos?.length <= 0 ?
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {searchValue ? `Serch Results for '${searchValue}' not found.` : `Search results not found`}
                            </Box>
                            :
                            videos?.map(video => (
                                <HomeVideoCard key={video?._id} video={video} />
                            ))
                }
            </Container>
        </>
    )
}

export default SearchPage