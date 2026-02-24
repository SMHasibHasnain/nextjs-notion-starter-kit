import * as React from 'react'
import Prism from 'prismjs'

export const Code = ({ code, language }: any) => {
  const ref = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    if (ref.current) {
      Prism.highlightElement(ref.current)
    }
  }, [code])

  return (
    <pre className={`language-${language || 'javascript'}`}>
      <code ref={ref} className={`language-${language || 'javascript'}`}>
        {code}
      </code>
    </pre>
  )
}
