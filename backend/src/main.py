import uvicorn
from fastapi import FastAPI

import sys
from pathlib import Path

from routers.form import router as routerForm 

sys.path.append(str(Path(__file__).parent.parent))


app = FastAPI()

app.include_router(routerForm)


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)