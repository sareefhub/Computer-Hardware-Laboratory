@echo off
echo ===========================
echo Running Spring Boot Project
echo ===========================

cd /d %~dp0

mvn spring-boot:run

pause
