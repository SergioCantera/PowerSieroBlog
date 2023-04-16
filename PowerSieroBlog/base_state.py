import pynecone as pc

class User(pc.Model, table=True):
    '''A table of Users'''
    username: str
    password: str

class Post(pc.Model, table=True):
    '''A table of Posts'''
    username: str
    image: str
    title: str
    summary: str
    date:str

class State(pc.State):
    '''The base state for the app'''
    username: str
    logged_in: bool = False

    def logout(self):
        '''Log out a user'''
        self.reset()
        return pc.redirect("/")