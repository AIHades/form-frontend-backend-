from pydantic import BaseModel, Field, EmailStr


class SUserData(BaseModel):
    surnameUser: str = Field(
                                ..., 
                                min_length = 1, 
                                max_length = 50,
                                description="Фамилия пользователя",
                            )
    nameUser: str = Field(
                            ..., 
                            min_length = 1, 
                            max_length = 50,
                            description="Имя пользователя",
                        )
    isChangedSurnameBefore: bool | None = Field(
                                                None,
                                                description="Менялась ли раннее фамилия",
                                            )
    patronymicUser: str = Field(
                                    ..., 
                                    min_length = 1, 
                                    max_length = 50,
                                    description="Отчество пользователя",
                                )
    latinSurname: str = Field(
                                ..., 
                                min_length = 1, 
                                max_length = 50,
                                description="Фамилия пользователя латиницей",
                            )
    latinName: str = Field(
                            ..., 
                            min_length = 1, 
                            max_length = 50,
                            description="Имя пользователя латиницей",
                        )
    dayBirthday: int = Field(...,
                                ge = 1,
                                le = 31,
                                description="День рождения пользователя"
                            )
    monthBirthday: str = Field(
                                ..., 
                                min_length = 3, 
                                max_length = 50,
                                description="Месяц рождения пользователя",
                            )
    yearBirthday: int = Field(
                                ..., ge = 1900, 
                                le = 2026,
                                description="Год рождения пользователя",
                            )
    maritalStatus: str = Field(
                                ..., 
                                min_length = 1, 
                                max_length = 50,
                                description="Семейное положение пользователя",
                            )
    education: str = Field(
                            ..., 
                            min_length = 1, 
                            max_length = 50,
                            description="Образование пользователя",
                        )
    phoneNumber: str = Field(
                            ..., 
                            min_length = 15, 
                            max_length = 15,
                            description="Номер телефона пользователя",
                        )
    email: EmailStr = Field(
                            ..., 
                            min_length = 5, 
                            max_length = 70,
                            description="Email пользователя",
                        )