from fastapi import APIRouter, Body, Query
from sqlalchemy import select, insert, or_

from src.database import session_maker

from models.form import FormModel
from schemas.form import SCreateUser, SUserData


router = APIRouter(prefix="/form", tags=["Форма заявки на полет на Марс"],)


@router.post("/", summary="Отправка данных о пользователях")
async def submit_form(
    user_data: SCreateUser = Body(openapi_examples={
        "1": {"summary":"Дюженко Денис",
              "value":{
                    "surnameUser": "Дюженко",
                    "nameUser": "Денис",
                    "isChangedSurnameBefore": False,
                    "patronymicUser": "Анатольевич",
                    "latinSurname": "Dyuzhenko",
                    "latinName": "Denis",
                    "dayBirthday": 12,
                    "monthBirthday": "декабрь",
                    "yearBirthday": 2004,
                    "maritalStatus": "not-married",
                    "education": "secondary-general",
                    "phoneNumber": "+79222222222",
                    "email": "user@example.com",
        }}
    }),
):
    async with session_maker() as session:
        add_userData_stm = insert(FormModel).values(**user_data.model_dump())
        await session.execute(add_userData_stm)
        await session.commit()
    return {"status": "ok"}


@router.get("/", summary="Получение данных о пользователях")
async def get_users(): 
    query = select(FormModel)
    async with session_maker() as session:
        res = await session.execute(query)
        usersData = res.scalars().all()
    return usersData


@router.get("/search", summary="Получение нужного пользователя")
async def get_user_by_search(
    queryName: str | None = Query(None, min_length = 1, max_length = 50)
):
    async with session_maker() as session:
        if queryName:
            query = select(FormModel).where(
                or_(
                    FormModel.nameUser.ilike(f"%{queryName}%"),
                    FormModel.surnameUser.ilike(f"%{queryName}%")
                )
            )
                
        res = await session.execute(query)
        user = res.scalars().all()

        if user is None: return {"status": "user not found"}
        return user