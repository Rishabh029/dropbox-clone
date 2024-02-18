import { UserButton } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="">
      <div className='flex flex-col lg:flex-row items-center bg-[#2B2929] dark:bg-slate-900'>
      <div className='p-10 flex flex-col  text-white space-y-5 '>
        <h1 className='text-5xl font-bold pt-10'> 
          Welcome to Drop Box.<br/> 
          <br />
          Storing everything for you and your business.All in one place.
        </h1>

        <p className='text-sm font-semibold'>Drop files to upload, it will be stored in your drop box account. This project is not affiliated with Dropbox. </p>

        <Link href = '/dashboard' className='text-xl flex font-semibold w-fit cursor-pointer bg-blue-600 p-6'>
          Get Started
        <ArrowRight className='ml-10' />
        </Link>
      </div>

      <div className='bg-[#cbbbbb] dark:bg-slate-900 h-full p-10'>
        <video autoPlay loop muted className='rounded-lg'>
          <source src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      </div>

      <p className='text-xl text-center pt-5 font-bold'>Disclaimer</p>
      <p className='text-center font-semibold pt-3'>This is a demo app. Drop files to upload, it will be stored in your drop box account. This project is not affiliated with Dropbox. </p>

    </main>
  )
}
