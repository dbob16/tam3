from exceptions import bad_key
from fastapi import APIRouter
from repos.api_keys import ApiKeyRepo
from repos.search import SearchRepo

search_router = APIRouter(prefix="/api/search")


@search_router.get("/tickets/")
def search_tickets(
    api_key: str, first_name: str = "", last_name: str = "", phone_number: str = ""
):
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return SearchRepo().SearchTickets(
        first_name=first_name, last_name=last_name, phone_number=phone_number
    )
