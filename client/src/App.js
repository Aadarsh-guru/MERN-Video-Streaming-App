import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LoginDialog from './components/LoginDialog'
import DataProvider from './context/DataProvider'
import Sidebar from './components/Sidebar'
import ProtectedRoutes from './components/ProtectedRoutes'
import UploadDialog from './components/UploadDialog'
import AccountInfoDialog from './components/AccountInfoDialog'
import AccountEditDialog from './components/AccountEditDialog'
import UserVideos from './pages/UserVideos'
import Watch from './pages/Watch'
import SearchPage from './pages/SearchPage'
import VoiceSearchDialog from './components/VoiceSearchDialog'

function App() {
  return (
    <DataProvider>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/watch/:id' element={<Watch />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/' element={<ProtectedRoutes />}>
          {/* <Route path='library' element={<></>} />
          <Route path='history' element={<></>} /> */}
          <Route path='your-videos' element={<UserVideos />} />
          {/* <Route path='watch-later' element={<></>} />
          <Route path='liked-videos' element={<></>} /> */}
        </Route>
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
      <VoiceSearchDialog />
      <AccountEditDialog />
      <UploadDialog />
      <LoginDialog />
      <AccountInfoDialog />
      <Sidebar />
    </DataProvider>
  )
}

export default App