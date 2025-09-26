from dataclasses import dataclass
from .template import Repo

@dataclass
class Basket:
    prefix: str
    b_id: int
    description: str = ""
    donors: str = ""
    winning_ticket: int = 0
    changed: bool = False

class BasketRepo(Repo):
    def get_prefix_one(self, prefix: str, b_id: int):
        self.cur.execute("SELECT * FROM baskets WHERE prefix = %s AND b_id = %s", (prefix, b_id))
        result = self.cur.fetchone()
        if not result:
            return Basket(prefix, b_id)
        return Basket(*result)
    def get_prefix_range(self, prefix: str, b_from: int, b_to: int):
        r_dict = {i: Basket(prefix, i) for i in range(b_from, b_to+1)}
        self.cur.execute("SELECT * FROM baskets WHERE prefix = %s AND b_id BETWEEN %s AND %s", (prefix, b_from, b_to))
        results = self.cur.fetchall()
        for r in results:
            r_dict[r[1]] = Basket(*r)
        return list(r_dict.values())
    def get_prefix_all(self, prefix: str):
        self.cur.execute("SELECT * FROM baskets WHERE prefix = %s", (prefix,))
        results = self.cur.fetchall()
        if not results:
            return []
        return [Basket(*r) for r in results]
    def get_all(self):
        self.cur.execute("SELECT * FROM baskets")
        results = self.cur.fetchall()
        if not results:
            return []
        return [Basket(*r) for r in results]
    def post_list(self, baskets: list[Basket]):
        for b in baskets:
            self.cur.execute("REPLACE INTO baskets VALUES (%s, %s, %s, %s, %s)", (b.prefix, b.b_id, b.description, b.donors, b.winning_ticket))
        self.conn.commit()
        return {"detail": "Baskets posted successfully."}