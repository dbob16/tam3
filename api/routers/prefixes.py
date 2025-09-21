from fastapi import APIRouter
from repos.prefixes import Prefix, PrefixRepo

prefix_router = APIRouter(prefix="/api/prefixes")


@prefix_router.get("/")
def get_all_prefixes():
    return PrefixRepo().get_all()


@prefix_router.get("/{prefix_name}/")
def get_one_prefix(prefix_name: str):
    return PrefixRepo().get_one(prefix_name)


@prefix_router.post("/")
def post_one_prefix(p: Prefix):
    rep_detail = PrefixRepo().add_one(p)
    return {"detail": rep_detail}


@prefix_router.delete("/")
def del_one_prefix(prefix_name: str):
    rep_detail = PrefixRepo().del_one(prefix_name)
    return {"detail": rep_detail}
