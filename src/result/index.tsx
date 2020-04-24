import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useKeyPress from 'app/hooks/useKeyPress'
import Head from 'next/head'
import Content from './Content'

const Page: NextPage = () => {
  const back = useKeyPress('ArrowLeft')
  const esc = useKeyPress('Escape')
  const router = useRouter()
  useEffect(() => {
    if (back || esc) {
      router.back()
    }
  }, [back, esc])
  return (
    <>
      <Head>
        <title>Take home</title>
        <meta name="title" content="Take home" />
        <meta name="description" content="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <Content />
    </>
  )
}

export default Page
