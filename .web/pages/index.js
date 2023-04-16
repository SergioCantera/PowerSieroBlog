import {useEffect, useRef, useState} from "react"
import {useRouter} from "next/router"
import {E, connect, updateState, uploadFiles} from "/utils/state"
import "focus-visible/dist/focus-visible"
import {Box, Button, Center, Input, Link, VStack, useColorMode} from "@chakra-ui/react"
import NextLink from "next/link"
import NextHead from "next/head"

const PING = "http://localhost:8000/ping"
const EVENT = "ws://localhost:8000/event"
const UPLOAD = "http://localhost:8000/upload"
export default function Component() {
const [state, setState] = useState({"auth_state": {"confirm_password": "", "password": ""}, "home_state": {"myposts": [], "post": "", "search": ""}, "logged_in": false, "new_post_state": {"post": ""}, "username": "", "events": [{"name": "state.hydrate"}], "files": []})
const [result, setResult] = useState({"state": null, "events": [], "processing": false})
const router = useRouter()
const socket = useRef(null)
const { isReady } = router;
const { colorMode, toggleColorMode } = useColorMode()
const Event = events => setState({
  ...state,
  events: [...state.events, ...events],
})
const File = files => setState({
  ...state,
  files,
})
useEffect(() => {
  if(!isReady) {
    return;
  }
  if (!socket.current) {
    connect(socket, state, setState, result, setResult, router, EVENT, ['websocket', 'polling'])
  }
  const update = async () => {
    if (result.state != null) {
      setState({
        ...result.state,
        events: [...state.events, ...result.events],
      })
      setResult({
        state: null,
        events: [],
        processing: false,
      })
    }
    await updateState(state, setState, result, setResult, router, socket.current)
  }
  update()
})
return (
<Box sx={{"paddingTop": "10em", "textAlign": "top", "position": "relative", "backgroundImage": "bg.svg", "backgroundSize": "100% auto", "width": "100%", "height": "100vh"}}><VStack><Center sx={{"shadow": "lg", "padding": "1em", "borderRadius": "lg", "background": "white"}}><VStack><Input onBlur={(_e) => Event([E("state.set_username", {value:_e.target.value})])}
placeholder="Username"
sx={{"width": "100%"}}
type="text"/>
<Input onBlur={(_e) => Event([E("state.auth_state.set_password", {value:_e.target.value})])}
placeholder="Password"
sx={{"width": "100%"}}
type="password"/>
<Button onClick={() => Event([E("state.auth_state.login", {})])}
sx={{"width": "100%"}}>{`Login`}</Button>
<NextLink href="/signup"
passHref={true}><Link sx={{"width": "100%"}}><Button sx={{"width": "100%"}}>{`Sign Up`}</Button></Link></NextLink></VStack></Center></VStack>
<NextHead><title>{`Pynecone App`}</title>
<meta content="A Pynecone app."
name="description"/>
<meta content="favicon.ico"
property="og:image"/></NextHead></Box>
)
}