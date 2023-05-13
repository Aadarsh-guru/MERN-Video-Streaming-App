import axios from 'axios'
import { Box, Button, Dialog, TextField, Typography, styled } from '@mui/material'
import { useData } from '../context/DataProvider'
import { Close, Upload } from '@mui/icons-material'
import { useState } from 'react'
import toast from 'react-hot-toast'


const Header = styled(Box)({
    height: '5vh',
    width: '100%',
    background: '#f2f2f2',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid lightgrey'
})

const Heading = styled(Box)({
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 600
})

const CloseButton = styled(Close)({
    marginRight: 20,
    cursor: 'pointer',
})

const Wrapper = styled(Box)({
    width: '100%',
    height: '95%',
    display: 'flex',
    background: '#f2f2f2'
})

const LeftBox = styled(Box)({
    width: '50vw',
    height: '100vh',
    background: 'lightgray'
})

const RightBox = styled(Box)({
    width: '50vw',
    height: '100vh',
})

const Form = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    margin: '0px 20px',
    '& > label > p': {
        textTransform: 'capitalize',
        padding: '10px',
        background: 'grey',
        color: '#ffffff',
        borderRadius: 5,
        cursor: 'pointer',
        width: '100%',
        textAlign: 'center',
        margin: '5px 0px'
    },
    '& > div': {
        margin: '5px 0',
    },
    '& > button': {
        margin: '5px 0'
    },
})

const VideoInfo = styled(Box)({
    '& > h1': {
        fontWeight: 600,
        color: 'gray'
    },
    '& > p': {
        padding: 5,
    }
})

const ThumnailInfo = styled(Box)({
    '& > h1': {
        fontWeight: 600,
        color: 'gray'
    },
    '& > p': {
        padding: 5,
    }
})

const Error = styled(Typography)({
    fontSize: 10,
    color: 'red',
    fontWeight: 600,
    margin: '2px 0 0 0',
})

const UploadDialog = () => {

    const { openUploadDialog, setOpenUploadDialog, render, setRender } = useData()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [video, setVideo] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!video) {
                return toast.error('Select a video file')
            }
            if (!video.type.includes('video')) {
                return toast.error('Only Video Files Are Accepted.')
            }
            if (!thumbnail) {
                return toast.error('Select a thumbnail')
            }
            if (!thumbnail.type.includes('image')) {
                return toast.error('Thumbnail must be a image file.')
            }
            const formData = new FormData()
            formData.append('video', video)
            formData.append('thumbnail', thumbnail)
            formData.append('title', title)
            formData.append('description', description)
            setLoading(true)
            const response = await axios.post('/api/v1/videos/upload', formData)
            response && setLoading(false)
            if (response.status === 201) {
                toast.success(response.data.message)
                setOpenUploadDialog(!openUploadDialog)
                setRender(!render)
                setDescription('')
                setTitle('')
                setThumbnail('')
                setVideo('')
            } else {
                toast.error(response.data.message)
                setDescription('')
                setTitle('')
                setThumbnail('')
                setVideo('')
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error('something went wrong.')
        }
    }

    const onDialogClose = () => {
        setOpenUploadDialog(!openUploadDialog)
        setVideo('')
        setThumbnail('')
    }

    return (
        <Dialog open={openUploadDialog} hideBackdrop={true} sx={{
            "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                    width: "100%",
                    maxWidth: "80vw",
                    height: '100%',
                    maxHeight: '80vh',
                    borderRadius: 5
                },
            },
        }} >
            <Header>
                <Heading>Upload Video</Heading>
                <CloseButton onClick={() => onDialogClose()} />
            </Header>
            <Wrapper>
                <LeftBox>
                    {
                        video ?
                            <Box>
                                <Box className='vimeo-video-container' >
                                    <video controls title={video?.name} className='vimeo-video' src={URL.createObjectURL(video)} frameBorder="0"></video>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', paddingTop: '30px' }} >
                                    {
                                        thumbnail ?
                                            <>
                                                <ThumnailInfo>
                                                    <Typography variant='h5' >Thumbnail Information</Typography>
                                                    <Typography>Name: {thumbnail && thumbnail?.name}</Typography>
                                                    <Typography>Size: {thumbnail && Math.round(thumbnail?.size / 1048576) + 'MB'}</Typography>
                                                    <Typography>Type: {thumbnail && thumbnail?.type}</Typography>
                                                </ThumnailInfo>
                                            </>
                                            :
                                            <ThumnailInfo>
                                                <Typography variant='h5' >Thumbnail Information</Typography>
                                                <Typography style={{ marginTop: 40, marginLeft: 30 }} >
                                                    Select A thumbnail
                                                </Typography>
                                            </ThumnailInfo>
                                    }
                                    <VideoInfo>
                                        <Typography variant='h5' >Video Info</Typography>
                                        <Typography>Name: {video?.name}</Typography>
                                        <Typography>Size: {Math.round(video?.size / 1048576)} MB</Typography>
                                        <Typography>Type: {video?.type}</Typography>
                                    </VideoInfo>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5, color: 'gray' }}>
                                    {loading && <Typography variant='h5' >Your Video is uploading..</Typography>}
                                </Box>
                            </Box>
                            :
                            <Box sx={{ marginTop: 35, marginLeft: 25 }} >
                                No video has selected.
                            </Box>
                    }
                </LeftBox>
                <RightBox>
                    <Form onSubmit={(e) => handleSubmit(e)} >
                        <Typography variant='h6' style={{ textAlign: 'center', margin: 10 }}  >Enter Video Details</Typography>
                        <label htmlFor="file"><Typography>Select Video <Upload /></Typography></label>
                        {video && !video.type.includes('video') && <Error>Only Video Files Are Aceepted.</Error>}
                        <TextField onChange={(e) => setVideo(e.target.files[0])} type='file' id='file' style={{ display: 'none' }} />
                        <label htmlFor="thumnail"><Typography>Select Thumbnail <Upload /></Typography></label>
                        {thumbnail && !thumbnail.type.includes('image') && <Error>Only Image Files Are Aceepted.</Error>}
                        <TextField onChange={(e) => setThumbnail(e.target.files[0])} type='file' id='thumnail' style={{ display: 'none' }} />
                        <TextField onChange={(e) => setTitle(e.target.value)} required label='Title' variant='standard' />
                        {title && title.length < 3 && <Error>Title Must Containes Atleast 3 Charecters.</Error>}
                        <TextField onChange={(e) => setDescription(e.target.value)} variant='standard' required minRows={14} multiline style={{ overflow: 'auto' }} maxRows={14} label='Description' />
                        {description && description.length < 3 && <Error>Description Must Containes Atleast 3 Charecters.</Error>}
                        <Button disabled={loading && true} type='submit' variant='contained' >{loading ? 'Publishing..' : 'Publish'}</Button>
                    </Form>
                </RightBox>
            </Wrapper >
        </Dialog >
    )
}

export default UploadDialog