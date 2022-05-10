FROM rwynn/monstache-builder-cache-rel6:1.0.7 AS build-app

RUN git clone https://github.com/rwynn/monstache.git /app && cd /app && go install

COPY monstache.toml /app/monstache.toml

ARG MONGO_URL
ENV MONGO_URL ${MONGO_URL}
ARG ELASTIC_SEARCH_HOST
ENV ELASTIC_SEARCH_HOST ${ELASTIC_SEARCH_HOST}
ARG ELASTIC_SEARCH_USERNAME
ENV ELASTIC_SEARCH_USERNAME ${ELASTIC_SEARCH_USERNAME}
ARG ELASTIC_SEARCH_PASSWORD
ENV ELASTIC_SEARCH_PASSWORD ${ELASTIC_SEARCH_PASSWORD}

CMD monstache -mongo-url=${MONGO_URL} -elasticsearch-url=${ELASTIC_SEARCH_HOST} -elasticsearch-user=${ELASTIC_SEARCH_USERNAME} -elasticsearch-password=${ELASTIC_SEARCH_PASSWORD} -f /app/monstache.toml