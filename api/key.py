#!/bin/env python3

import string
from sys import argv

from repos import ApiKeyRepo

rdm_str = string.ascii_lowercase + string.digits


def generate():
    if len(argv) < 3:
        print("Please put name after the generate verb.")
        quit()
    new_key = ApiKeyRepo().create_api(argv[2])
    print(new_key)


def list_keys():
    result_keys = ApiKeyRepo().get_all()
    for key in result_keys:
        print(f"pc_name: {key.pc_name}")
        print(key.api_key)
        print("\n")


def delete_key():
    if len(argv) < 3:
        print("Please put api key to delete after the delete verb.")
        quit()
    del_status = ApiKeyRepo().delete(argv[2])
    print(del_status)


if len(argv) < 2:
    print("Please put action after api.py such as generate, list, or remove.")
    quit()
else:
    action = argv[1]

match action:
    case "generate":
        generate()
    case "list":
        list_keys()
    case "delete":
        delete_key()

