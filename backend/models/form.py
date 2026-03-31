from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String

from src.database import Base


class FormModel(Base):
    __tablename__ = "forms"

    id: Mapped[int] = mapped_column(primary_key=True)
    surnameUser: Mapped[str] = mapped_column(String(50))
    nameUser: Mapped[str] = mapped_column(String(50))
    isChangedSurnameBefore: Mapped[bool | None]
    patronymicUser: Mapped[str] = mapped_column(String(50))
    latinSurname: Mapped[str] = mapped_column(String(50))
    latinName: Mapped[str] = mapped_column(String(50))
    dayBirthday: Mapped[int]
    monthBirthday: Mapped[int] = mapped_column(String(50))
    yearBirthday: Mapped[int]
    maritalStatus: Mapped[str] = mapped_column(String(50))
    education: Mapped[str] = mapped_column(String(50))
    phoneNumber: Mapped[str] = mapped_column(String(15))
    email: Mapped[str] = mapped_column(String(70))