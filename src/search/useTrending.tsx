import {
  useEffect,
  useState,
} from 'react'
import createGiphy, { MultiResponse } from 'giphy-api'

export default function () {
  const [data, setData] = useState<MultiResponse>()
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let wasCancelled = false
    const giphy = createGiphy(process.env.GIPHY_API_KEY)
    giphy.trending().then(response => {
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
  }, [])
  return { loading, error, data }
}
