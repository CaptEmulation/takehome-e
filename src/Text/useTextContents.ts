import { useState, useEffect } from 'react'

export default function (path: string) {
  const [data, setData] = useState<string>()
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let wasCancelled = false

    fetch(`${process.env.FILEBROWSE_ENDPOINT}/static/${path}`).then(
      async (response) => {
        if (!wasCancelled) {
          setData(await response.text())
          setLoading(false)
        }
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )

    return () => (wasCancelled = true)
  }, [path])
  return { data, error, loading }
}
