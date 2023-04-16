import {useEffect, useRef, useState} from "react"
import {useRouter} from "next/router"
import {E, connect, updateState, uploadFiles} from "/utils/state"
import "focus-visible/dist/focus-visible"
import {Avatar, Box, Button, Center, HStack, Heading, Image, Input, Link, SimpleGrid, Spacer, Text, VStack, useColorMode} from "@chakra-ui/react"
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
<Center sx={{"paddingTop": "2%", "paddingBottom": "2%"}}><VStack spacing="1.5em"
sx={{"fontSize": "2em", "marginLeft": "1em", "marginRight": "1em"}}><Heading size="4xl">{`POWERSIERO.COM`}</Heading>
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
<HStack sx={{"width": "100%"}}><NextLink href="/new-post"
passHref={true}><Link sx={{"padding": "10px", "fontSize": "0.6em"}}><Button sx={{"bg": "rgb(29 161 242)", "color": "white"}}>{`Nuevo post`}</Button></Link></NextLink>
<Input onChange={(_e) => Event([E("state.home_state.set_search", {search:_e.target.value})])}
placeholder="Buscar post"
sx={{"width": "80%"}}
type="text"/></HStack>
<HStack sx={{"position": "relative", "width": "100%", "paddingRight": "0.5em", "backgroundColor": "green"}}><SimpleGrid columns={[2]}
spacingX="4"
spacingY="10"
sx={{"width": "75%", "backgroundColor": "red"}}>{state.home_state.myposts.map((qrtpoulp, i) => <Box key={i}
sx={{"border": "1px solid #000", "borderRadius": "1em", "padding": "1em"}}><VStack><Image src={qrtpoulp.image}
sx={{"width": "50px"}}/>
<Heading size="lg"
sx={{"color": "black"}}>{qrtpoulp.title}</Heading>
<Text sx={{"fontSize": "0.4em"}}>{qrtpoulp.summary}</Text></VStack></Box>)}</SimpleGrid>
<VStack sx={{"position": "absolute", "top": 0, "right": 0, "width": "25%", "height": "100%", "padding": "1em", "backgroundColor": "blue"}}><Avatar name="Sergio García"
size="2xl"
src="/foto.jfif"/>
<Heading size="sm">{`SERGIO GARCÍA FONSECA`}</Heading>
<Text sx={{"fontSize": "0.5em"}}>{`Power Platform developer and architect. Passionate about application development best practices. Always striving to be better! Currently working on the Power Platform team at Plain Concepts in Spain`}</Text>
<Spacer/>
<Heading size="sm"
sx={{"marginTop": "1em"}}>{`RECENT POSTS`}</Heading>
<VStack>{state.home_state.myposts.map((saiphfgr, i) => <Box key={i}
sx={{"padding": "0.2em"}}><VStack><NextLink href="#"
passHref={true}><Link sx={{"color": "rgb(107,99,246)", "fontSize": "0.6em"}}>{saiphfgr.title}</Link></NextLink></VStack></Box>)}</VStack></VStack></HStack></VStack>
<NextHead><title>{`Power Siero Blog`}</title>
<meta content="A Pynecone app."
name="description"/>
<meta content="favicon.ico"
property="og:image"/></NextHead></Center>
)
}