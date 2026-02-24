// used for rendering equations (optional)
import 'katex/dist/katex.min.css'

// core styles
import 'react-notion-x/src/styles.css'

// global styles
import 'styles/global.css'

// prism theme
import 'prismjs/themes/prism-tomorrow.css'

// overrides
import 'styles/notion.css'
import 'styles/prism-theme.css'

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import * as React from 'react'
import Prism from 'prismjs'

// load prism languages only on client
if (typeof window !== 'undefined') {
  require('prismjs/components/prism-javascript')
  require('prismjs/components/prism-typescript')
  require('prismjs/components/prism-csharp')
  require('prismjs/components/prism-sql')
  require('prismjs/components/prism-json')
  require('prismjs/components/prism-bash')
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  React.useEffect(() => {
    const highlightCode = () => {
      if (typeof window === 'undefined') return

      setTimeout(() => {
        document.querySelectorAll('pre code').forEach((block) => {
          const el = block as HTMLElement

          // যদি language class না থাকে fallback দেই
          if (!el.className.includes('language-')) {
            el.classList.add('language-javascript')
          }
        })

        Prism.highlightAll()
      }, 0)
    }

    const handleRouteChange = () => {
      highlightCode()
    }

    // first load
    highlightCode()

    // route change
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}
