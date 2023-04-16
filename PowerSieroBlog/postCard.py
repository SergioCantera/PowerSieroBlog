import pynecone as pc

def postCard(posts):
    image = posts.image
    title = posts.title
    summary = posts.summary
    return pc.box(
        pc.vstack(
            pc.image(src=image, width="50px"),
            pc.heading(title, size="lg", color="black"),
            pc.text(summary, font_size="0.4em"),
        ),
        border="1px solid #000",
        border_radius="1em",
        padding="1em",
    )