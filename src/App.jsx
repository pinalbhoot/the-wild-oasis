import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./Context/darkmodeconext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Dashboard from "./pages/Dashboard";
import GlobalStyles from "./styles/globalstyles";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Setting from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Applayout from "./ui/AppLayout";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoutes from "./ui/protectedRoute";


  const queryclient = new QueryClient({
      defaultOptions:{
        queries:{
          //staleTime:60 *1000,
          staleTime:0,
        }
      }
  })
function App()
{
  return(
  <DarkModeProvider>

        <QueryClientProvider client={queryclient}>
          <ReactQueryDevtools initialIsOpen={false}/>

    <GlobalStyles/>
   <BrowserRouter>
    <Routes>
      <Route element={ 
      <ProtectedRoutes>
        <Applayout/>
      </ProtectedRoutes> 
     }>        
      <Route index element={<Navigate replace to="dashboard"/>}/>
      <Route path="dashboard" element={<Dashboard/>}/>
      <Route path="bookings" element={<Bookings/>}/>    
      <Route path="bookings/:bookingId" element={<Booking/>}/>   
      <Route path="checkin/:bookingId" element={<Checkin/>}/>        
      <Route path="cabins" element={<Cabins/>}/>
      <Route path="user" element={<Users/>}/>
      <Route path="Settings" element={<Setting/>}/>
      <Route path="account" element={<Account/>}/>
    </Route> 
      <Route path="login" element={<Login/>}/>
      <Route path="*" element={<PageNotFound/>}/>
      </Routes>
  </BrowserRouter>
  <Toaster 
      position="top-center" 
      gutter={12}
      containerStyle={{margin:"8px"}}
      toastOptions={{
        success:{
          duration:3000,
        },
        error:{
          duration:5000,
        },
        style:{
          fontSize:"16ox",
          maxWidth:"500px",
          padding:"16px 24px",
          backgroundColor:"var(--color-grey-0)",
          color:"var(--color-grey-700)",
        },  
      }}
      />
    </QueryClientProvider>
</DarkModeProvider>
  
  )
}
export default App;