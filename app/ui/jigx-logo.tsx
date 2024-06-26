import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana,space_Mono } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${space_Mono.className} flex flex-row items-center leading-none text-white`}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[25deg]" />
      <p className={`${space_Mono.className} text-[44px]`}> Jigar</p>
    </div>
  );
}
