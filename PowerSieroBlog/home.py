import pynecone as pc
from .base_state import State, User, Post
from .navbar import navbar
from .postCard import postCard
from .new_post import new_post

class HomeState(State):
    '''The state for the home page.'''
    post:str
    myposts:list[Post] = []
    search:str

    def get_posts(self):
        """Get posts from the database."""
        with pc.session() as session:
            if self.search != "":
                self.myposts = (
                    session.query(Post)
                    .filter(Post.title.contains(self.search))
                    .all()[::-1]
                )
            else:
                self.myposts = session.query(Post).all()[::-1]

    def set_search(self, search):
        """Set the search query."""
        self.search = search
        return self.get_posts()
    
def postLink(myposts) -> pc.Component:
    title = myposts.title
    return pc.box(
        pc.vstack(
            pc.link(title, href="#", color="rgb(107,99,246)", font_size="0.6em"),
        ),
        padding="0.2em",
    )

def home() -> pc.Component:
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
                pc.link(
                    pc.button(
                        "Nuevo post",
                        bg="rgb(29 161 242)",
                        color="white"
                    ),
                    href="/new-post",
                    padding="10px",
                    font_size="0.6em",
                ),               
                pc.input(
                    on_change=HomeState.set_search,
                    placeholder="Buscar post",
                    width="80%"
                ),
                width="100%"
            ),
            pc.hstack(
                pc.responsive_grid(
                    pc.foreach(
                        HomeState.myposts,
                        lambda myposts: postCard(myposts),
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
                            HomeState.myposts,
                            lambda myposts: postLink(myposts),
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