from fastapi import APIRouter, Body
from dataclasses import dataclass, field
from typing import List
from exceptions import bad_key

from repos.api_keys import ApiKeyRepo
from repos.prefixes import Prefix, PrefixRepo
from repos.tickets import Ticket, TicketRepo
from repos.baskets import Basket, BasketRepo
from repos.template import Repo

def chunk_list(in_lst: list, chunk_size: int):
    chunks = []
    for i in range(0, len(in_lst), chunk_size):
        chunks.append(in_lst[i:i + chunk_size])
    return chunks

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
        for ticket_chunk in chunk_list(uploaded_file.tickets, 300):
            TicketRepo().post_list(ticket_chunk)
        for basket_chunk in chunk_list(uploaded_file.baskets, 300):
            BasketRepo().post_list(basket_chunk)
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