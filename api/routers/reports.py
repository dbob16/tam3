from fastapi import APIRouter
from repos.reports import ReportItem, ReportRepo
from repos.api_keys import ApiKeyRepo
from exceptions import bad_key

report_router = APIRouter(prefix="/api/reports")

@report_router.get("/byname/{prefix}/")
def get_report_byname(api_key: str, prefix: str):
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return ReportRepo().get_byname(prefix)

@report_router.get("/bybasket/{prefix}/")
def get_report_bybasket(api_key: str, prefix: str):
    if not ApiKeyRepo().check_api(api_key):
        raise bad_key
    return ReportRepo().get_bybasket(prefix)