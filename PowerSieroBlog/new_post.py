import pynecone as pc
from .base_state import Post, User, State
from .navbar import navbar
import datetime

class NewPostState(State):
    post:str

    def add_post(self):
        """Post a tweet."""
        if self.username == "":
            return pc.window_alert("Please log in to post.")
        with pc.session() as session:
            post = Post(
                username=self.username,
                post=self.post,
                time=datetime.datetime.now().strftime("%m/%d %H"),
            )
            session.add(post)
            session.commit()
        return self.get_posts() 

def new_post():
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
            pc.vstack(
                pc.form_control(
                    pc.form_label("Título"),
                    pc.input(placeholder="Introduce un titulo para tu post..."),
                    is_required=True,
                    width="100%",
                ),
                pc.form_control(
                    pc.form_label("Resumen"),
                    pc.html('<textarea id="summary" name="summary" placeholder="Escribe el resumen de tu post..." style="width: 100%; height: 100%; padding: 5px 15px; border: 1px solid #DDD; border-radius: 4px;"></textarea>',height="100px"),
                    is_required=True,
                    width="100%"
                ),
                pc.form_control(
                    pc.form_label("Fecha"),
                    pc.text(datetime.datetime.now().strftime("%d/%m/%y"))
                ),
                width="100%"
            )
        )
    )