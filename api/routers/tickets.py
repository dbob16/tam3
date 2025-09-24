from fastapi import APIRouter
from repos.tickets import TicketRepo, Ticket
from repos.api_keys import ApiKeyRepo
from exceptions import bad_key

ticket_router = APIRouter(prefix="/api/tickets")

@ticket_router.get("/")
def get_all_tickets(api_key: str) -> list[Ticket]:
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return TicketRepo().get_all()

@ticket_router.get("/{prefix}/")
def get_prefix_tickets(api_key: str, prefix: str) -> list[Ticket]:
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return TicketRepo().get_prefix_all(prefix)

@ticket_router.get("/{prefix}/{t_id}/")
def get_prefix_ticket_one(api_key: str, prefix: str, t_id: int) -> Ticket:
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return TicketRepo().get_prefix_one(prefix, t_id)

@ticket_router.get("/{prefix}/{t_from}/{t_to}")
def get_prefix_ticket_range(api_key: str, prefix: str, t_from: int, t_to: int) -> list[Ticket]:
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return TicketRepo().get_prefix_range(prefix, t_from, t_to)

@ticket_router.post("/")
def post_tickets(api_key: str, tickets: list[Ticket]):
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return TicketRepo().post_list(tickets)