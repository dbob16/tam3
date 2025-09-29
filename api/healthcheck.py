#!/bin/env python3

import httpx
from sys import argv

def main():
    if len(argv) > 1:
        try_addr = argv[1]
    else:
        try_addr = "http://localhost/api/"
    try:
        r = httpx.get(try_addr)
    except:
        print("No server at address or port.")
        quit(1)
    if r.is_success:
        print(f"Success. {r.status_code}")
        quit(0)
    else:
        print(f"Fail!!! {r.status_code}")
        quit(1)

if __name__ == "__main__":
    main()