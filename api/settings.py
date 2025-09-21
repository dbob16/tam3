import os
from pathlib import Path
from configparser import ConfigParser

data_path = Path(os.getenv("TAM3_DATA_PATH", "data"))
data_path.mkdir(exist_ok=True)


def read_config():
    config = ConfigParser()
    config_path = data_path / "config.ini"
    if config_path.is_file():
        config.read(config_path)
        return config
    else:
        config["db"] = {
            "host": os.getenv("TAM3_DB_HOST", "localhost"),
            "port": os.getenv("TAM3_DB_PORT", "3306"),
            "user": os.getenv("TAM3_DB_USER", "tam3"),
            "password": os.getenv("TAM3_DB_PASSWD", "tam3"),
            "database": os.getenv("TAM3_DB_DATABASE", "tam3"),
        }
        with open(config_path, "w") as f:
            config.write(f)
        return config
