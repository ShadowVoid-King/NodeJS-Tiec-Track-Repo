@echo off
title Running all microservices

start cmd /k "cd %~dp0\Auth-Server && npm run dev"
start cmd /k "cd %~dp0\Gateway-Server && npm run dev"
start cmd /k "cd %~dp0\Groups-Server && npm run dev"
start cmd /k "cd %~dp0\Posts-Server && npm run dev"
start cmd /k "cd %~dp0\Reels-Server && npm run dev"
