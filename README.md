# HorgosApp

# api
https://documenter.getpostman.com/view/5156348/SW7gT4pY

# bug fix fromphoto-view
Go to react-native-photo-view/android/build.gradle
Change:

> compileSdkVersion 23
>     buildToolsVersion "23.0.3"
> 
>     defaultConfig {
>         minSdkVersion 16
>         targetSdkVersion 23
>         versionCode 1
>     }
to
> compileSdkVersion 28
>     buildToolsVersion "28.0.3"
> 
>     defaultConfig {
>         minSdkVersion 16
>         targetSdkVersion 28
>         versionCode 1
>     }

[18:43, 27.01.2020] +7 747 936 9153: url: /api/user, прикрепить токен. В ответе будут имя, email, avatart
[18:44, 27.01.2020] +7 747 936 9153: url: /api/user/update, прикрепить токен. Параметры: name, email - обязательные; password, photo - необязательные
[18:44, 27.01.2020] +7 747 936 9153: второй запрос как PUT
[18:45, 27.01.2020] +7 747 936 9153: так же нужен параметр password_confirmation с подтверждением пароля
[18:45, 27.01.2020] +7 747 936 9153: если пароль не меняется, то указывать поля password, password_confirmation не нужно
[18:45, 27.01.2020] +7 747 936 9153: url: /api/maps(GET request) возвращает массив с изображениями карт
[18:56, 27.01.2020] +7 747 936 9153: для url: /api/interviews роут для видео
[18:56, 27.01.2020] +7 747 936 9153: там код на iframe, не знаю как он будет встраиваться в мобилку
[18:57, 27.01.2020] +7 747 936 9153: 0: {id: 7, iframe: "https://youtu.be/z-5PP-mGoUM", order: null, created_at: "2019-12-15 12:21:41",…}
1: {id: 5, iframe: "https://youtu.be/xBKyXQwUzkY", order: null, created_at: "2019-12-15 12:15:41",…}
2: {id: 2, iframe: "https://youtu.be/rRLogQ7EsLY", order: null, created_at: "2019-12-05 12:23:21",…}
3: {id: 1, iframe: "https://youtu.be/9JIuXAoZ6S4", order: null, created_at: "2019-11-19 04:05:13",…}
[18:57, 27.01.2020] +7 747 936 9153: вот в таком виде


[13:21, 29.01.2020] +7 747 936 9153: Роут для сброса пароля:
/api/forgot-password
Параметры:
email
Ответ: Link created
[13:21, 29.01.2020] +7 747 936 9153: Метод Post