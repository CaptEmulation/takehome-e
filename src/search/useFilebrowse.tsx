import {
  Dispatch,
  createContext,
  useContext,
  Context,
  FunctionComponent,
  useReducer,
  useEffect,
  useState,
} from 'react'
import qs from 'querystring'

interface State {
  prefix: string
  count: number
}

const COUNT = 'count'
const PREFIX = 'prefix'
type UpdateCountAction = {
  type: typeof COUNT
  payload: number
}
type UpdatePrefixAction = {
  type: typeof PREFIX
  payload: string
}
const actionCreators = {
  updateCount: (count: number) =>
    ({
      type: COUNT,
      payload: count,
    } as UpdateCountAction),
  updatePrefix: (prefix: string) =>
    ({
      type: PREFIX,
      payload: prefix,
    } as UpdatePrefixAction),
}

type Actions = UpdateCountAction | UpdatePrefixAction

function reducer(state: State, action: Actions) {
  switch (action.type) {
    case COUNT: {
      const { payload: count } = action as UpdateCountAction
      return {
        ...state,
        count,
      }
    }
    case PREFIX: {
      const { payload: prefix } = action as UpdatePrefixAction
      return {
        ...state,
        prefix,
      }
    }
    default:
      throw new Error(`Unknown action: ${action}`)
  }
}

const defaults = {
  prefix: '',
  count: 10,
}
interface ProviderContext {
  state: State
  loading: boolean
  error: Error
  data: any
  dispatch: Dispatch<Actions>
  actionCreators: typeof actionCreators
}
let context: Context<ProviderContext>

export const Provider: FunctionComponent<Partial<State>> = ({
  children,
  ...rest
}) => {
  const initialState = { ...defaults, ...rest }
  const [state, dispatch] = useReducer(reducer, initialState)
  const { prefix, count } = state
  const [data, setData] = useState<string>()
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let wasCancelled = false

    fetch(
      `${process.env.FILEBROWSE_ENDPOINT}/search?${qs.stringify({
        prefix,
        count,
      })}`
    ).then(
      async (response) => {
        setData(await response.json())
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      }
    )

    return () => (wasCancelled = true)
  }, [prefix, count])
  const value = { state, dispatch, actionCreators, loading, error, data }
  if (!context) {
    context = createContext(value)
  }
  return <context.Provider value={value}>{children}</context.Provider>
}

export default function () {
  return useContext(context)
}
