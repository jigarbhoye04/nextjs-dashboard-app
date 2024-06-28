import AcmeLogo from '@/app/ui/jigx-logo';
import { ArrowRightIcon,CheckIcon, HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { 
  lusitana, 
  // BB, 
  // space_Mono,
  // roboto_mono,
 } from '@/app/ui/fonts';
 
import Image from 'next/image';
import { GiftIcon } from '@heroicons/react/24/outline';
import { HomeModernIcon } from '@heroicons/react/20/solid';

export default function Page() {
  return (
    // This are tailwind classes
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
        {/* <div className={styles.shape} /> */}
      </div>
      <div className="mt-2 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <div className="h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent" />
          <p
            className={`${lusitana.className} text-sm text-gray-800 md:text-2xl md:leading-normal`}
          >
            <strong>Welcome to Dashboard app.</strong> This is the example for the
            <a href="https://nextjs.org/learn/" className="text-blue-500">
            </a> Made by JIGX.
          </p>
          <div className="mt-4 flex grow flex-row gap-4 md:flex-row">
            <Link
              href="/login"
              className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-200 hover:text-black md:text-base md:font-sm"
            >
              <span>Log in</span> 
              <ArrowRightIcon className='"w-5 md:w-6'/>
            </Link>
            <Link
              href={'/dashboard'}
              className="flex items-center gap-5 self-start rounded-lg border border-gray-500 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-blue-200 md:text-base"
            >
                <span>Dashboard</span>
                <HomeIcon className="w-5 md:w-6"/>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block" //this line hides the images for mobile version and only renders in desk ver.
            alt="Screenshot of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={375}
            height={667}
            className="block md:hidden" //this line hides the images for desktop version and only renders in mobile ver.
            alt="Screenshot of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
