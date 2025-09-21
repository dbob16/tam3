from db import session


class Repo:
    def __init__(self):
        self.conn, self.cur = session()
