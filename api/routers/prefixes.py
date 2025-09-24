from fastapi import APIRouter
from repos.api_keys import ApiKeyRepo
from repos.prefixes import Prefix, PrefixRepo
from exceptions import bad_key

prefix_router = APIRouter(prefix="/api/prefixes")


@prefix_router.get("/")
def get_all_prefixes(api_key: str):
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return PrefixRepo().get_all()


@prefix_router.get("/{prefix_name}/")
def get_one_prefix(api_key: str, prefix_name: str):
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return PrefixRepo().get_one(prefix_name)


@prefix_router.post("/")
def post_one_prefix(api_key: str, p: Prefix):
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    rep_detail = PrefixRepo().add_one(p)
    return {"detail": rep_detail}


@prefix_router.delete("/")
def del_one_prefix(api_key: str, prefix_name: str):
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    rep_detail = PrefixRepo().del_one(prefix_name)
    return {"detail": rep_detail}
