import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Content from './Content'

const Page: NextPage = () => (
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

export default Page
