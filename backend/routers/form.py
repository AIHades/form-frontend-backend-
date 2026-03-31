from fastapi import APIRouter
from schemas.form import SUserData


router = APIRouter(prefix="/form", tags="Форма заявки на полет на Марс",)


@router.get("/", summary="Получение данных о пользователях")
async def get_user_data(user_data: SUserData) -> SUserData:
    ...