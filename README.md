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