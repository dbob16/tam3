#!/bin/env python3

from fastapi import FastAPI
from sys import argv

from routers.prefixes import prefix_router

if argv[1] == "run":
    app = FastAPI(title="TAM3 API Server", docs_url=None, redoc_url=None)
else:
    app = FastAPI(title="TAM3 API Server")

app.include_router(prefix_router)
