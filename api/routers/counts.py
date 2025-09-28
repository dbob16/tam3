from fastapi import APIRouter
from dataclasses import dataclass

from exceptions import bad_key
from repos.template import Repo
from repos.api_keys import ApiKeyRepo

@dataclass
class Count:
    prefix: str
    total_sold: int
    unique_sold: int

class CountRepo(Repo):
    def get_counts(self):
        self.cur.execute("SELECT * FROM counts")
        results = self.cur.fetchall()
        return [Count(*r) for r in results]
    


counts_router = APIRouter(prefix="/api/counts")

@counts_router.get("/")
def get_ticket_counts(api_key: str):
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return CountRepo().get_counts()