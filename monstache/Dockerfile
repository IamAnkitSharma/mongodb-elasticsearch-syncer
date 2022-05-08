FROM rwynn/monstache-builder-cache-rel6:1.0.7 AS build-app

RUN git clone https://github.com/rwynn/monstache.git /app && cd /app && go install

COPY monstache.toml /app/monstache.toml

ARG MONGO_URL
ENV MONGO_URL ${MONGO_URL}
ARG ELASTIC_SEARCH_URL
ENV ELASTIC_SEARCH_URL ${ELASTIC_SEARCH_URL}

CMD monstache -mongo-url=${MONGO_URL} -elasticsearch-url=${ELASTIC_SEARCH_URL} -f /app/monstache.toml