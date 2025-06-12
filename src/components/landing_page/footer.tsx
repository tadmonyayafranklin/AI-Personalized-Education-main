"use client"
import { Roboto_Mono } from "next/font/google"

const robotoMono = Roboto_Mono({
  weight: "500",
  subsets: ["latin"],
})

const footerLinks = {
  column1: [
    { label: "Contact Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Help", href: "#" },
    { label: "News", href: "#" },
  ],
  column2: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Your Privacy Choices", href: "#" },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left Side - Logo and Legal */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative h-10 w-16">
                <svg className="w-full h-full" viewBox="0 0 300 170" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(0.000000,170.000000) scale(0.100000,-0.100000)">
                    <path
                      d="M785 1023 c-58 -8 -184 -54 -223 -83 -127 -92 -174 -268 -105 -391
                      63 -112 174 -164 353 -164 132 0 191 19 355 115 66 39 136 75 155 81 19 6 69
                      27 112 46 l76 35 159 -85 c230 -124 345 -159 562 -173 260 -17 394 66 394 247
                      0 168 -131 304 -345 360 -125 32 -256 21 -428 -38 -103 -35 -159 -65 -267
                      -139 -50 -35 -95 -64 -100 -64 -5 0 -47 32 -93 71 -135 112 -182 135 -349 170
                      -86 17 -181 22 -256 12z m92 -20 c-20 -2 -52 -2 -70 0 -17 2 0 4 38 4 39 0 53
                      -2 32 -4z m1408 -8 c85 -23 152 -62 222 -131 72 -71 98 -137 91 -234 -6 -77
                      -37 -119 -123 -161 -73 -36 -94 -35 -38 2 20 13 50 48 67 79 25 45 31 66 31
                      115 -1 72 -34 152 -89 212 -43 49 -135 99 -196 108 -55 8 -223 -9 -305 -32
                      -80 -22 -263 -100 -354 -152 -41 -23 -76 -39 -79 -37 -5 6 166 120 228 151
                      163 82 402 117 545 80z m-1124 -36 c87 -33 221 -124 225 -151 1 -10 0 -18 -4
                      -18 -3 0 -49 24 -101 54 -91 52 -182 97 -226 112 -11 3 -15 8 -8 11 17 6 127
                      -43 230 -103 103 -61 137 -72 53 -18 -117 75 -293 152 -323 141 -6 -3 -1 -6
                      13 -6 16 -1 21 -4 14 -11 -7 -7 -21 -6 -44 4 -33 14 -34 14 -10 19 42 9 98 -2
                      181 -34z m-381 24 c-45 -16 -119 -58 -144 -81 -24 -22 -27 -23 -18 -6 11 21
                      73 73 102 86 8 4 29 7 45 7 17 -1 23 -3 15 -6z m253 -38 c87 -31 98 -42 19
                      -19 -28 9 -60 14 -69 12 -10 -2 12 -11 48 -20 84 -21 191 -71 294 -139 102
                      -66 101 -65 85 -84 -17 -21 -171 -98 -228 -116 -23 -7 -38 -15 -32 -19 12 -7
                      -75 -42 -145 -59 -74 -17 -226 -20 -280 -5 l-50 13 54 -5 c30 -3 67 -8 84 -11
                      21 -4 28 -3 23 5 -4 7 12 12 51 15 32 2 13 4 -42 3 -84 0 -107 4 -142 22 -57
                      30 -55 36 3 11 25 -12 48 -18 51 -16 2 3 -6 8 -18 12 -51 16 -120 68 -138 104
                      -63 123 -9 235 142 301 62 26 82 30 142 27 45 -2 98 -14 148 -32z m-396 -9
                      c-51 -47 -77 -107 -77 -184 0 -34 6 -77 13 -95 18 -41 63 -95 100 -117 26 -16
                      27 -18 7 -23 -11 -3 -18 -1 -14 4 3 5 -3 9 -13 9 -36 0 -111 57 -134 102 -33
                      64 -37 162 -10 215 22 45 66 83 121 107 48 21 49 20 7 -18z m1648 8 c131 -30
                      214 -132 202 -248 -16 -153 -116 -211 -362 -211 -73 0 -117 4 -130 13 -18 11
                      -16 12 15 5 63 -14 192 -9 255 10 153 47 232 172 179 283 -20 42 -82 97 -138
                      122 -87 40 -91 42 -71 38 11 -3 34 -8 50 -12z m-3 -26 c73 -34 142 -101 158
                      -155 25 -81 -32 -171 -140 -221 -49 -23 -66 -25 -171 -25 -224 2 -320 29 -486
                      141 -51 34 -65 52 -42 52 6 0 82 33 168 74 247 117 338 140 455 116 65 -13
                      134 -66 156 -121 7 -16 15 -28 17 -25 9 9 -38 85 -71 114 -49 43 -103 55 -211
                      49 -103 -5 -155 -24 -396 -139 -123 -59 -151 -69 -164 -58 -12 10 9 24 133 85
                      297 145 457 176 594 113z m-892 -148 c22 -11 40 -25 40 -31 0 -10 -18 -2 -75
                      38 -29 20 -10 16 35 -7z m-901 -149 c38 -73 116 -121 249 -152 68 -16 218 -14
                      277 5 56 17 70 14 28 -7 -92 -47 -223 -69 -322 -55 -175 24 -281 125 -281 269
                      0 81 12 98 22 30 5 -29 17 -69 27 -90z m2023 57 c0 -95 -64 -179 -161 -213
                      -73 -26 -194 -30 -291 -11 -103 21 -253 69 -300 97 -19 11 -26 17 -15 14 11
                      -4 72 -24 136 -46 129 -43 246 -62 324 -53 76 9 187 42 215 63 37 27 80 116
                      80 164 0 22 3 38 6 35 3 -4 6 -26 6 -50z m-1022 -3 c0 -6 -167 -85 -178 -85
                      -4 0 25 20 63 45 61 38 115 57 115 40z m658 -172 c-15 -2 -42 -2 -60 0 -18 2
                      -6 4 27 4 33 0 48 -2 33 -4z"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>
              <h1 className={`${robotoMono.className} text-2xl font-medium text-white tracking-wider`}>Polymath</h1>
            </div>

            {/* Legal Disclaimer */}
            <div className="max-w-sm">
              <p className="text-gray-400 text-sm leading-relaxed">
                This site is protected by reCAPTCHA Enterprise. The{" "}
                <a href="#" className="underline hover:text-gray-300 transition-colors">
                  Google Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="underline hover:text-gray-300 transition-colors">
                  Terms of Service
                </a>{" "}
                apply.
              </p>
            </div>
          </div>

          {/* Right Side - Navigation Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {/* Column 1 */}
            <div className="space-y-4">
              <ul className="space-y-3">
                {footerLinks.column1.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white hover:underline transition-all duration-200 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <ul className="space-y-3">
                {footerLinks.column2.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white hover:underline transition-all duration-200 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-10 pt-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Polymath. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
