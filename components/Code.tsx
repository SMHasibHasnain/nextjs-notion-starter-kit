import * as React from 'react'
import Prism from 'prismjs'

export const Code = ({ children, className }: any) => {
  const ref = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    if (ref.current) {
      Prism.highlightElement(ref.current)
    }
  }, [children])

  let language = 'javascript'

  if (className) {
    if (className.includes('lang-')) {
      language = className.replace('lang-', '')
    } else if (className.includes('language-')) {
      language = className.replace('language-', '')
    }
  }

  return (
    <pre className={`language-${language}`}>
      <code ref={ref} className={`language-${language}`}>
        {children}
      </code>
    </pre>
  )
}
