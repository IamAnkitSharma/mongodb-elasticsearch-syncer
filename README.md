
# MongoDB Elastic Search Syncer with Monstache



Sync your MongoDB Database to **Elasticsearch** using [**Monstache**](https://rwynn.github.io/monstache-site/)   which is a **sync daemon** written in Go that continously indexes your MongoDB collections into Elasticsearch. 


## Update monstache.toml file

To let monstache sync only your required collections to elastic search index, edit the **monstache/monstache.toml**

add your DatabaseName.CollectionName in **direct-read-namespaces** and **change-stream-namespaces** key in the toml file.

**Example:**
```bash
    direct-read-namespaces = ["mydb.users"]
    change-read-namespaces = ["mydb.users"]
```
To map which MongoDB's collection indexes to a particular ElasticSearch index use mappings where you can specify database namespace and a elastic search index.

**Example:**
```bash
    [[mapping]]
    namespace = "es.users" //db collection name
    index = "users" //elasticsearch index name
```


## How to run


To build the syncer's image go to **monstache** folder,


Make sure you have docker and docker-compose installed in your machine
```bash
  sudo docker build . -t mongo-es-syncer --build-arg MONGO_URL={MONGO_URI} --build-arg ELASTIC_SEARCH_URL={ELASTIC_SEARCH_URL}
```
**Example:**
```bash
 sudo docker build . -t mongo-es-syncer --build-arg MONGO_URL=mongodb+srv://@cluster/es --build-arg ELASTIC_SEARCH_URL=http://elasticsearch:9200 
```
Once the image is built you can run your nodejs or any app along with the syncer using docker-compose

```bash
 sudo docker-compose up -d
```

Now whenever any data is changed in mongodb via any medium (ORM, Direct Writes), the syncer will keep sycing the data to elasticsearch.
 