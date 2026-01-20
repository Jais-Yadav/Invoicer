import { Children, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react'
import AppShell from './Components/AppShell'
import Dashboard from './Pages/Dashboard'
import CreateInvoice from './Pages/CreateInvoice'
import Invoices from './Pages/Invoices'
import InvoicesPreview from './Components/InvoicesPreview'
import BusinessProfile from './Pages/BusinessProfile'


function App() {
  const ClerkProtected=({children})=>(
    <>
    <SignedIn>{children}</SignedIn>
    <SignedOut>
      <RedirectToSignIn/>
    </SignedOut>
    </>
  )

  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/app' element={<ClerkProtected><AppShell/></ClerkProtected>}>
      
      <Route index element={<Dashboard/>}/>
      <Route path='dashboard' element={<Dashboard/>}/>
      <Route path='invoices' element={<Invoices/>}/>
      <Route path="invoices/new" element={<CreateInvoice/>}/>
      <Route path="invoices/:id" element={<InvoicesPreview/>}/>
      <Route path='invoices/:id/preview' element={<InvoicesPreview/>}/>
      <Route path="invoices/:id/edit" element={<CreateInvoice/>}/>
      <Route path="create-invoice" element={<CreateInvoice/>}/>
      <Route path='business' element={<BusinessProfile/>}/>
      </Route>
      
     </Routes>
    </>
  )
}

export default App
