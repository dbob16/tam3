from dataclasses import dataclass
from .template import Repo

@dataclass
class Combined:
    prefix: str
    b_id: int
    winning_ticket: int = 0
    winner: str = ", "
    changed: bool = False

class CombinedRepo(Repo):
    def get_prefix_one(self, prefix: str, b_id: int) -> Combined:
        self.cur.execute("SELECT * FROM combined WHERE prefix = %s AND b_id = %s", (prefix, b_id))
        result = self.cur.fetchone()
        if not result:
            return Combined(prefix, b_id)
        return Combined(*result)
    def get_prefix_range(self, prefix: str, b_from: int, b_to: int) -> list[Combined]:
        r_dict = {i: Combined(prefix, i) for i in range(b_from, b_to+1)}
        self.cur.execute("SELECT * FROM combined WHERE prefix = %s AND b_id BETWEEN %s AND %s", (prefix, b_from, b_to))
        results = self.cur.fetchall()
        for b in results:
            r_dict[b[1]] = Combined(*b)
        return list(r_dict.values())
    def get_prefix_all(self, prefix:str) -> list[Combined]:
        self.cur.execute("SELECT * FROM combined WHERE prefix = %s", (prefix,))
        results = self.cur.fetchall()
        if not results:
            return []
        return [Combined(*r) for r in results]
    def get_all(self) -> list[Combined]:
        self.cur.execute("SELECT * FROM combined")
        results = self.cur.fetchall()
        if not results:
            return []
        return [Combined(*r) for r in results]
    def post_list(self, c_entries: list[Combined]):
        for combined in c_entries:
            self.cur.execute("INSERT INTO baskets (prefix, b_id, winning_ticket) VALUES (%s, %s, %s) ON DUPLICATE KEY UPDATE winning_ticket=%s",
                             (combined.prefix, combined.b_id, combined.winning_ticket, combined.winning_ticket))
        self.conn.commit()
        return {"detail": "Winners posted successfully"}