import * as React from 'react'
import Prism from 'prismjs'

export const Code = ({ children, className }: any) => {
  const ref = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    if (ref.current) {
      Prism.highlightElement(ref.current)
    }
  }, [])

  // language extract
  const language =
    className?.replace('lang-', '').replace('language-', '') || 'javascript'

  return (
    <pre className={`language-${language}`}>
      <code ref={ref} className={`language-${language}`}>
        {children}
      </code>
    </pre>
  )
}
