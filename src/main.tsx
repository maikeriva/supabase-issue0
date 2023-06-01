import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { createClient } from "@supabase/supabase-js"
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom"
import ReactDOM from 'react-dom/client'
import React, { useEffect } from "react"

const baseUrl = import.meta.env.VITE_APP_BASEURL

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const Root = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        navigate(`/redirect`)
      }
    })
    return () => { subscription.unsubscribe() }
  }, [])

  return <Auth
    supabaseClient={supabase}
    appearance={{ theme: ThemeSupa }}
    providers={['google']}
    redirectTo={`${baseUrl}/redirect`}
    theme="dark"
  />
}

const Redirect = () => {
  useEffect(() => {
    console.log("Here we would invoke a supabase function")
  }, [])

  return <h1>Redirect succeeded, invoking supabase function...</h1>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />
  },
  {
    path: "/redirect",
    element: <Redirect />
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
