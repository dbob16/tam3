from dataclasses import dataclass
from .template import Repo

@dataclass
class Ticket:
    prefix: str
    t_id: int
    first_name: str = ""
    last_name: str = ""
    phone_number: str = ""
    preference: str = "CALL"
    changed: bool = False

class TicketRepo(Repo):
    def get_prefix_one(self, prefix: str, t_id: int):
        self.cur.execute("SELECT * FROM tickets WHERE prefix = %s AND t_id = %s", (prefix, t_id))
        result = self.cur.fetchone()
        if not result:
            return Ticket(prefix=prefix, t_id=t_id)
        return Ticket(*result)
    def get_prefix_range(self, prefix: str, t_from: int, t_to: int):
        r_dict = {i: Ticket(prefix=prefix, t_id=i) for i in range(t_from, t_to+1)}
        self.cur.execute("SELECT * FROM tickets WHERE prefix = %s AND t_id BETWEEN %s AND %s", (prefix, t_from, t_to))
        results = self.cur.fetchall()
        for r in results:
            r_dict[r[1]] = Ticket(*r)
        return list(r_dict.values())
    def get_prefix_all(self, prefix: str):
        self.cur.execute("SELECT * FROM tickets WHERE prefix = %s", (prefix,))
        results = self.cur.fetchall()
        return [Ticket(*r) for r in results]
    def get_all(self):
        self.cur.execute("SELECT * FROM tickets")
        results = self.cur.fetchall()
        return [Ticket(*r) for r in results]
    def post_list(self, tickets: list[Ticket]):
        for t in tickets:
            self.cur.execute("REPLACE INTO tickets VALUES (%s, %s, %s, %s, %s, %s)", (t.prefix, t.t_id, t.first_name, t.last_name, t.phone_number, t.preference))
        self.conn.commit()
        return {"detail": "Tickets posted successfully."}