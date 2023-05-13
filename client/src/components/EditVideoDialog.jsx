import axios from 'axios'
import { Box, Button, Dialog, TextField, Typography, styled } from '@mui/material'
import { useData } from '../context/DataProvider'
import { Close } from '@mui/icons-material'
import { useState, useEffect } from 'react'
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
    background: '#f2f2f2'
})

const Form = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 20px',
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

const Error = styled(Typography)({
    fontSize: 10,
    color: 'red',
    fontWeight: 600,
    margin: '2px 0 0 0',
})

const EditVideoDialog = ({ openEditDialog, setOpenEditDialog, video }) => {

    const { render, setRender } = useData()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const { data } = await axios.put(`/api/v1/videos/update/${video?._id}`, { title, description })
            data && setLoading(false)
            if (data.success) {
                setOpenEditDialog(!openEditDialog)
                toast.success(data.message)
                setRender(!render)
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error('something went wrong.')
        }
    }

    useEffect(() => {
        setTitle(video?.title)
        setDescription(video?.description)
        // eslint-disable-next-line
    }, [])

    return (
        <Dialog open={openEditDialog} hideBackdrop={true} sx={{
            "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                    width: "100%",
                    maxWidth: "40vw",
                    height: '100%',
                    maxHeight: '80vh',
                    borderRadius: 5
                },
            },
        }} >
            <Header>
                <Heading>Edit Video Details</Heading>
                <CloseButton onClick={() => setOpenEditDialog(!openEditDialog)} />
            </Header>
            <Wrapper>
                <Form onSubmit={(e) => handleSubmit(e)} >
                    <TextField onChange={(e) => setTitle(e.target.value)} value={title} required label='Title' variant='standard' />
                    {title && title.length < 3 && <Error>Title Must Containes Atleast 3 Charecters.</Error>}
                    <TextField onChange={(e) => setDescription(e.target.value)} value={description} variant='standard' required minRows={20} multiline style={{ overflow: 'auto' }} maxRows={220} label='Description' />
                    {description && description.length < 3 && <Error>Description Must Containes Atleast 3 Charecters.</Error>}
                    <Button disabled={loading && true} type='submit' variant='contained' >{loading ? 'Updating..' : 'Update'}</Button>
                </Form>
            </Wrapper >
        </Dialog >
    )
}

export default EditVideoDialog