from .template import Repo
from dataclasses import dataclass
from exceptions import not_found


@dataclass
class Prefix:
    name: str
    color: str = ""
    weight: int = 0


class PrefixRepo(Repo):
    def get_all(self) -> list[Prefix]:
        self.cur.execute("SELECT * FROM prefixes ORDER BY weight, name")
        results = self.cur.fetchall()
        if not results:
            return []
        return [Prefix(*r) for r in results]

    def get_one(self, prefix_name: str):
        self.cur.execute("SELECT * FROM prefixes WHERE name = %s", (prefix_name,))
        result = self.cur.fetchone()
        if not result:
            raise not_found
        return Prefix(*result)

    def add_one(self, prefix: Prefix) -> str:
        self.cur.execute(
            "REPLACE INTO prefixes VALUES (%s, %s, %s)",
            (prefix.name, prefix.color, prefix.weight),
        )
        self.conn.commit()
        return "Prefix inserted successfully."

    def del_one(self, prefix_name: str) -> str:
        self.cur.execute("DELETE FROM prefixes WHERE name = %s", (prefix_name,))
        self.conn.commit()
        return "Prefix deleted successfully."
