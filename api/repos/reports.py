from dataclasses import dataclass
from .template import Repo

@dataclass
class ReportItem:
    prefix: str
    winner_name: str
    phone_number: str | None
    preference: str
    b_id: int
    winning_ticket: int
    description: str

class ReportRepo(Repo):
    def get_byname(self, prefix: str) -> list[ReportItem]:
        self.cur.execute("SELECT * FROM report WHERE prefix = %s", (prefix,))
        results = self.cur.fetchall()
        return [ReportItem(*r) for r in results]
    def get_bybasket(self, prefix: str) -> list[ReportItem]:
        self.cur.execute("SELECT * FROM report WHERE prefix = %s ORDER BY b_id ASC", (prefix,))
        results = self.cur.fetchall()
        return [ReportItem(*r) for r in results]