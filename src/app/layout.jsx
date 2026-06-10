// import "./globals.css";

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//           {/* <Navbar /> */}
//           {children}
//           {/* <Footer /> */}
//       </body>
//     </html>
//   );
// }

// --------------------------------------------------------------------------------------
"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar/navbar";
import Loader from "@/components/loader/loader";
// import Footer from "@/components/footer/Footer";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <Loader />
        <Navbar/>
        {children}
        {/* {pathname !== "/" && <Footer />} */}
      </body>
    </html>
  );
}