import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from routers.form import router as routerForm 


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*", "null"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routerForm)


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)