import pynecone as pc

def navbar():
    return pc.box(
            pc.hstack(
                pc.link('Blog', font_size='20px'),
                pc.link('Videos',font_size='20px'),
                pc.link('Speaking',font_size='20px'),
                pc.link('Contact', font_size='20px'),
                pc.link('About',href="/about", font_size='20px'),
                pc.link('Privacy',font_size='20px'),
                pc.icon(tag='search',width='20px'),
                spacing='20px',
                justify='center'
            ),
            justify='space-between',
            border_top='2px solid #F0F0F0',
            border_bottom='2px solid #F0F0F0',
            width='100%',
            padding_x='1em',
            padding_y='0.5em'
        )