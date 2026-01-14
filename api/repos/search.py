from .template import Repo
from .tickets import Ticket


class SearchRepo(Repo):
    def SearchTickets(
        self, first_name: str = "", last_name: str = "", phone_number: str = ""
    ):
        self.cur.execute(
            'SELECT * FROM tickets WHERE first_name LIKE %s AND last_name LIKE %s AND phone_number LIKE %s',
            (f"%{first_name}%", f"%{last_name}%", f"%{phone_number}%"),
        )
        records = self.cur.fetchall()
        if not records:
            return []
        return [Ticket(*r) for r in records]
