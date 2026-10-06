import { useEffect } from 'react'
// Sets a unique title and description for each page.
export default function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) { tag = document.createElement('meta'); tag.setAttribute('name', 'description'); document.head.appendChild(tag) }
    tag.setAttribute('content', description)
  }, [title, description])
}
