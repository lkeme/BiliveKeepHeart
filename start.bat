@echo off
title Api Server Starter
setlocal enabledelayedexpansion
CHCP 65001

echo 输入启动端口:
set /p default_port=
::echo %default_port%
echo 输入扩充端口次数:
set /p expansion_num=
::echo %expansion_num%

for /l %%i in (1,1,!expansion_num!) do (
    echo "node app.js -p !default_port!"
    start cmd /k "node app.js -p !default_port!"
    set /a default_port+=1
)
pause

