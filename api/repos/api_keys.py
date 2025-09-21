import random as r
import string
from dataclasses import dataclass
from .template import Repo

rdm_set = string.ascii_lowercase + string.digits


@dataclass
class ApiKey:
    api_key: str
    pc_name: str = ""


class ApiKeyRepo(Repo):
    def check_api(self, api_key: str) -> bool:
        self.cur.execute("SELECT * FROM api_keys WHERE api_key = %s", (api_key,))
        result = self.cur.fetchone()
        if result:
            return True
        else:
            return False

    def create_api(self, name: str) -> str:
        while True:
            new_key = "".join(r.choice(rdm_set) for i in range(16))
            if not self.check_api(new_key):
                break
        self.cur.execute("INSERT INTO api_keys VALUES (%s, %s)", (new_key, name))
        self.conn.commit()
        return new_key

    def get_all(self) -> list[ApiKey]:
        self.cur.execute("SELECT * FROM api_keys")
        results = self.cur.fetchall()
        if not results:
            return []
        return [ApiKey(*r) for r in results]

    def delete(self, api_key: str) -> str:
        self.cur.execute("DELETE FROM api_keys WHERE api_key = %s", (api_key,))
        self.conn.commit()
        return "Key deleted successfully."
