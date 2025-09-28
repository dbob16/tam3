from fastapi import APIRouter, Body
from dataclasses import dataclass, field
from typing import List
from exceptions import bad_key

from repos.api_keys import ApiKeyRepo
from repos.prefixes import Prefix, PrefixRepo
from repos.tickets import Ticket, TicketRepo
from repos.baskets import Basket, BasketRepo
from repos.template import Repo

@dataclass
class BackupFile:
    prefixes: List[Prefix] = field(default_factory=list)
    tickets: List[Ticket] = field(default_factory=list)
    baskets: List[Basket] = field(default_factory=list)

class BackupFileRepo:
    def get_file(self):
        new_file = BackupFile(prefixes=PrefixRepo().get_all(), tickets=TicketRepo().get_all(), baskets=BasketRepo().get_all())
        return new_file
    def post_file(self, uploaded_file: BackupFile) -> str:
        PrefixRepo().add_list(uploaded_file.prefixes)
        TicketRepo().post_list(uploaded_file.tickets)
        BasketRepo().post_list(uploaded_file.baskets)
        return "File posted successfully."
    
backup_router = APIRouter(prefix="/api/backuprestore")

@backup_router.get("/")
def get_backup_file(api_key: str):
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return BackupFileRepo().get_file()

@backup_router.post("/")
def post_backup_file(api_key: str, uploaded_file: BackupFile):
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return {"detail": BackupFileRepo().post_file(uploaded_file)}