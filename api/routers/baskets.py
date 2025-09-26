from fastapi import APIRouter
from exceptions import bad_key
from repos.api_keys import ApiKeyRepo
from repos.baskets import Basket, BasketRepo

basket_router = APIRouter(prefix="/api/baskets")

@basket_router.get("/")
def get_all_baskets(api_key: str) -> list[Basket]:
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return BasketRepo().get_all()

@basket_router.get("/{prefix}/")
def get_prefix_baskets(api_key: str, prefix: str) -> list[Basket]:
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return BasketRepo().get_prefix_all(prefix)

@basket_router.get("/{prefix}/{b_id}/")
def get_prefix_basket_one(api_key: str, prefix: str, b_id: int) -> Basket:
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return BasketRepo().get_prefix_one(prefix, b_id)

@basket_router.get("/{prefix}/{b_from}/{b_to}/")
def get_prefix_basket_range(api_key: str, prefix: str, b_from: int, b_to: int) -> list[Basket]:
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return BasketRepo().get_prefix_range(prefix, b_from, b_to)

@basket_router.post("/")
def post_basket_list(api_key: str, baskets: list[Basket]):
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return BasketRepo().post_list(baskets)