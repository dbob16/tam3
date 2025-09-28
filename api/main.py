#!/bin/env python3

from fastapi import FastAPI
from sys import argv

from routers.prefixes import prefix_router
from routers.tickets import ticket_router
from routers.baskets import basket_router
from routers.combined import combined_router
from routers.reports import report_router
from routers.backuprestore import backup_router

if argv[1] == "run":
    app = FastAPI(title="TAM3 API Server", docs_url=None, redoc_url=None)
else:
    app = FastAPI(title="TAM3 API Server")

app.include_router(prefix_router)
app.include_router(ticket_router)
app.include_router(basket_router)
app.include_router(combined_router)
app.include_router(report_router)
app.include_router(backup_router)