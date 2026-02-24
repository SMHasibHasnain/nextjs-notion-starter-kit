// used for rendering equations (optional)
import 'katex/dist/katex.min.css'

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// global styles
import 'styles/global.css'

// 🔥 Prism theme (better than okaidia)
import 'prismjs/themes/prism-tomorrow.css'

// notion overrides
import 'styles/notion.css'

// optional prism overrides
import 'styles/prism-theme.css'

import type { AppProps } from 'next/app'
import * as Fathom from 'fathom-client'
import { useRouter } from 'next/router'
import { posthog } from 'posthog-js'
import * as React from 'react'

import Prism from 'prismjs'

// ✅ Load languages ONLY in client (prevent SSR crash)
if (typeof window !== 'undefined') {
  require('prismjs/components/prism-csharp')
  require('prismjs/components/prism-sql')
  require('prismjs/components/prism-javascript')
  require('prismjs/components/prism-typescript')
  require('prismjs/components/prism-json')
  require('prismjs/components/prism-bash')
}

import { bootstrap } from '@/lib/bootstrap-client'
import {
  fathomConfig,
  fathomId,
  isServer,
  posthogConfig,
  posthogId
} from '@/lib/config'

// ✅ bootstrap only on client
if (!isServer) {
  bootstrap()
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  React.useEffect(() => {
    // 🔥 Prism highlight function
    const highlight = () => {
      Prism.highlightAll()
    }

    function onRouteChangeComplete() {
      if (fathomId) {
        Fathom.trackPageview()
      }

      if (posthogId) {
        posthog.capture('$pageview')
      }

      highlight() // ✅ FIX: re-highlight on page change
    }

    // analytics init
    if (fathomId) {
      Fathom.load(fathomId, fathomConfig)
    }

    if (posthogId) {
      posthog.init(posthogId, posthogConfig)
    }

    // first load highlight
    highlight()

    // route change listener
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  return <Component {...pageProps} />
}
