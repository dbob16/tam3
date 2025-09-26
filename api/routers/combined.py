from fastapi import APIRouter
from repos.combined import Combined, CombinedRepo
from repos.api_keys import ApiKeyRepo
from exceptions import bad_key

combined_router = APIRouter(prefix="/api/combined")

@combined_router.get("/")
def get_all_combined(api_key: str) -> list[Combined]:
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return CombinedRepo().get_all()

@combined_router.get("/{prefix}/")
def get_prefix_combined(api_key: str, prefix: str) -> list[Combined]:
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return CombinedRepo().get_prefix_all(prefix)

@combined_router.get("/{prefix}/{b_id}/")
def get_prefix_combined_one(api_key: str, prefix: str, b_id: int) -> Combined:
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return CombinedRepo().get_prefix_one(prefix, b_id)

@combined_router.get("/{prefix}/{b_from}/{b_to}/")
def get_prefix_combined_range(api_key: str, prefix: str, b_from: int, b_to: int) -> list[Combined]:
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return CombinedRepo().get_prefix_range(prefix, b_from, b_to)

@combined_router.post("/")
def post_combined_range(api_key: str, winner_list: list[Combined]):
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return CombinedRepo().post_list(winner_list)