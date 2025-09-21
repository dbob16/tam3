from settings import read_config
from mysql.connector import connect


def session():
    config = read_config()
    conn = connect(**config["db"])
    cur = conn.cursor()
    return conn, cur

