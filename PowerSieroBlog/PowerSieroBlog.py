# type: ignore

import pynecone as pc
from .base_state import State
from .auth import login, signup
from .home import home
from .new_post import new_post
from .about import about

'''
from .navbar import navbar
from .postCard import postCard

class Post(pc.Base):
    image: str
    title: str
    summary: str

class PostsState(pc.State):
    posts: list[Post] = [
        Post(image="https://pynecone.io/logo.png",title="Post 1", summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"),
        Post(image="https://pynecone.io/logo.png",title="Post 2", summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"),
        Post(image="https://pynecone.io/logo.png",title="Post 3", summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"),
        Post(image="https://pynecone.io/logo.png",title="Post 4", summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat")]

def postLink(posts):
    title = posts.title
    return pc.box(
        pc.vstack(
            pc.link(title, href="#", color="rgb(107,99,246)", font_size="0.6em"),
        ),
        padding="0.2em",
    )

def index() -> pc.Component:
    return pc.center(
        pc.vstack(
            pc.heading(
                'POWERSIERO.COM',
                size='4xl'
            ),
            pc.heading(
                'Power Apps, Power Automate, Power Pages and solution architectures in Microsoft Power Platform',
                size='md'
            ),
            navbar(),
            pc.hstack(
                pc.responsive_grid(
                    pc.foreach(
                        PostsState.posts,
                        lambda posts: postCard(posts),
                    ),
                    columns=[2],
                    spacing_x="4",
                    spacing_y="10",
                    width="75%",
                    background_color="red",
                ),
                pc.vstack(
                    pc.avatar(name="Sergio García", src='/foto.jfif', size='2xl'),
                    pc.heading("SERGIO GARCÍA FONSECA", size="sm"),
                    pc.text("Power Platform developer and architect. Passionate about application development best practices. Always striving to be better! Currently working on the Power Platform team at Plain Concepts in Spain", font_size="0.5em"),
                    pc.spacer(),
                    pc.heading("RECENT POSTS", size="sm", margin_top="1em"),
                    pc.vstack(
                        pc.foreach(
                            PostsState.posts,
                            lambda posts: postLink(posts),
                        ),
                    ),
                    position='absolute',
                    top= 0,
                    right = 0,
                    width='25%',
                    height='100%',
                    padding="1em",
                    background_color="blue",
                ),
                position='relative',
                width='100%',
                padding_right="0.5em",
                background_color="green",
                
            ),
            spacing="1.5em",
            font_size="2em",
            margin_left="1em",
            margin_right="1em",
        ),
        padding_top="2%",
        padding_bottom="2%",
    )

'''
# Add state and page to the app.
app = pc.App(state=State)
app.add_page(login, route="/")
app.add_page(signup)
app.add_page(home, title='Power Siero Blog')
app.add_page(new_post, route='/new-post')
app.add_page(about)
app.compile()
