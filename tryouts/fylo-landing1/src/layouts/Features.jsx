import React from 'react'
import access from '../imgs/icon-access-anywhere.svg';
import security from '../imgs/icon-security.svg';
import colab from '../imgs/icon-collaboration.svg';
import storeFiles from '../imgs/icon-any-file.svg';
import MyFeautre from '../components/MyFeautre';

const data = [
    {
        icon: access,
        headText: 'Access your files, anywhere',
        bodyText: 'The ability to use a smartphone, tablet, or computer to access your account means your files follow you everywhere.',
    },
    {
        icon: security,
        headText: 'Security you can trust',
        bodyText: '2-factor authentication and user-controlled encryption are just a couple of the security features we allow to help secure your files.'
    },
    {
        icon: colab,
        headText: 'Real-time collaboration',
        bodyText: 'Securely share files and folders with friends, family and colleagues for live collaboration. No email attachments required.'
    },
    {
        icon: storeFiles,
        headText: 'Store any type of file',
        bodyText: 'Whether you\'re sharing holidays photos or work documents, Fylo has you covered allowing for all file types to be securely stored and shared.'
    }
]

const Features = () => {
  return (
    <div className='container flex flex-wrap mx-auto items-baseline justify-center py-28 gap-24 px-4 sm:px-10'>
        {data.map(({icon, headText, bodyText}, index)=><MyFeautre key={index} icon={icon} headText={headText} bodyText={bodyText} />)}
    </div>
  )
}

export default Features