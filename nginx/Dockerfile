FROM nginx:alpine

# Установим envsubst (он есть в gettext)
RUN apk add --no-cache gettext

# Копируем entrypoint скрипт
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

# Используем entrypoint для подстановки переменных
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
