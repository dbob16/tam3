from fastapi import HTTPException, status

bad_key = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED, detail="API Key is bad, very bad."
)

not_found = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found."
)
