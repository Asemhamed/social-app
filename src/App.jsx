import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import { routes } from '../Router'
import './App.css'
import UserDataProvider from './Context/UserDataContext'
import UserProfileProvider from './Context/UserProfile'
const queryClient = new QueryClient()

function App() {

  

  return <>
  <QueryClientProvider client={queryClient}>
      <UserDataProvider>
      <UserProfileProvider>
          <RouterProvider router={routes}></RouterProvider>
        <Toaster   position="bottom-right"
        reverseOrder={true} />
      </UserProfileProvider>
  </UserDataProvider>
  </QueryClientProvider>
  </>
}

export default App
