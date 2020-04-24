import {
  useEffect,
  useState,
} from 'react'
import createGiphy, { MultiResponse } from 'giphy-api'

export default function (limit: number) {
  const [data, setData] = useState<MultiResponse>()
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let wasCancelled = false
    const giphy = createGiphy({ apiKey: process.env.GIPHY_API_KEY, https: window.location.protocol.includes('https') })
    giphy.trending({ limit, rating: 'r' }).then(response => {
      if (!wasCancelled) {
        setData(response)
        setLoading(false)
      }
    }, error => {
      if (!wasCancelled) {
        setError(error)
        setLoading(false)
      }
    })
    return () => (wasCancelled = true)
  }, [limit])
  return { loading, error, data }
}
