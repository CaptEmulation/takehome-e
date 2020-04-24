import {
  useEffect,
  useState,
} from 'react'
import createGiphy, { MultiResponse } from 'giphy-api'

export default function (id: string) {
  const [data, setData] = useState<MultiResponse>()
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    
    if (id) {
      let wasCancelled = false
      const giphy = createGiphy({ apiKey: process.env.GIPHY_API_KEY, https: window.location.protocol.includes('https') })
      giphy.id(id).then(response => {
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
    } else {
      setLoading(false)
    }
  }, [id])
  return { loading, error, data }
}
