import '@/app/ui/global.css';
import '@/app/ui/random.css';
// import localFont from 'next/font/local'
import { 
  inter, 
  lusitana, 
  // roboto_mono,
 } from '@/app/ui/fonts';


//local fonts
// const myFont = localFont({
//   src: './ARone.ttf',
//   display: 'swap',
// })


export default function RootLayout({children}:{
  children: React.ReactNode; //when using javascript we don't  have to include this line
}){
  return (
    <html>
      <body>
        <body className={`${lusitana.className} antialiased`}>{children}</body>
        {/* {children} */}
        {/* <div className="center-div">
          <div className={roboto_mono.className}>Hello world!</div>
        </div> */}
      </body>
    </html>
  );
}