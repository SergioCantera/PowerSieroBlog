import {useEffect, useRef, useState} from "react"
import {useRouter} from "next/router"
import {E, connect, updateState, uploadFiles} from "/utils/state"
import "focus-visible/dist/focus-visible"
import {Box, Center, FormControl, FormLabel, HStack, Heading, Input, Link, Text, VStack, useColorMode} from "@chakra-ui/react"
import NextLink from "next/link"
import {SearchIcon} from "@chakra-ui/icons"
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
<Center><VStack><Heading size="4xl">{`POWERSIERO.COM`}</Heading>
<Heading size="md">{`Power Apps, Power Automate, Power Pages and solution architectures in Microsoft Power Platform`}</Heading>
<Box sx={{"justify": "space-between", "borderTop": "2px solid #F0F0F0", "borderBottom": "2px solid #F0F0F0", "width": "100%", "paddingX": "1em", "paddingY": "0.5em"}}><HStack justify="center"
spacing="20px"><NextLink href="#"
passHref={true}><Link sx={{"fontSize": "20px"}}>{`Blog`}</Link></NextLink>
<NextLink href="#"
passHref={true}><Link sx={{"fontSize": "20px"}}>{`Videos`}</Link></NextLink>
<NextLink href="#"
passHref={true}><Link sx={{"fontSize": "20px"}}>{`Speaking`}</Link></NextLink>
<NextLink href="#"
passHref={true}><Link sx={{"fontSize": "20px"}}>{`Contact`}</Link></NextLink>
<NextLink href="/about"
passHref={true}><Link sx={{"fontSize": "20px"}}>{`About`}</Link></NextLink>
<NextLink href="#"
passHref={true}><Link sx={{"fontSize": "20px"}}>{`Privacy`}</Link></NextLink>
<SearchIcon sx={{"width": "20px"}}/></HStack></Box>
<VStack sx={{"width": "100%"}}><FormControl isRequired={true}
sx={{"width": "100%"}}><FormLabel>{`Título`}</FormLabel>
<Input placeholder="Introduce un titulo para tu post..."
type="text"/></FormControl>
<FormControl isRequired={true}
sx={{"width": "100%"}}><FormLabel>{`Resumen`}</FormLabel>
<Box dangerouslySetInnerHTML={{"__html": "<textarea id="summary" name="summary" placeholder="Escribe el resumen de tu post..." style="width: 100%; height: 100%; padding: 5px 15px; border: 1px solid #DDD; border-radius: 4px;"></textarea>"}}
sx={{"height": "100px"}}/></FormControl>
<FormControl><FormLabel>{`Fecha`}</FormLabel>
<Text>{`16/04/23`}</Text></FormControl></VStack></VStack>
<NextHead><title>{`Pynecone App`}</title>
<meta content="A Pynecone app."
name="description"/>
<meta content="favicon.ico"
property="og:image"/></NextHead></Center>
)
}