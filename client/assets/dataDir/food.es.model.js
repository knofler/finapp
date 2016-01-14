PUT aircanteen
{
  "mappings": {
    "food":{
      "properties": {
        "food_name":{
          "type": "string",
          "index": "analyzed"
        },
        "food_info":{
          "type": "string",
          "index": "analyzed",
          "analyzer": "english"
        },
        "img":{
          "type": "string",
          "index": "not_analyzed"
        },
        "genre":{
          "type": "string",
          "index": "not_analyzed"
        },
        "cost":{
          "type": "float",
          "index": "not_analyzed"  
        },
        "latitude":{
          "type": "float",
          "index": "not_analyzed"
        },
        "longitude":{
          "type": "float",
          "index": "not_analyzed"
        },
        "recipe":{
           "type": "string",
          "index": "analyzed",
          "analyzer": "english"
        },
        "created_by":{
          "type": "string",
          "index": "analyzed",
          "analyzer": "standard"
        },
        "created_at":{
          "type": "date",
          "index": "not_analyzed"
        }
        
      }
    }
  }  
}
