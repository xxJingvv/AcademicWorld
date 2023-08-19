from flask import Flask, jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_mysqldb import MySQL
from flask_pymongo import PyMongo
from flask_cors import CORS
from neo4j import GraphDatabase
from bson.json_util import dumps
    
app = Flask(__name__)
CORS(app)
api = Api(app)
app.config['CORS_Headers'] = 'Content-Type'

# MySQL configurations
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'test_root'
app.config['MYSQL_DB'] = 'academicworld'
app.config['MYSQL_HOST'] = '127.0.0.1'

mysql = MySQL()
mysql.init_app(app)

# MongoDB configurations
app.config["MONGO_URI"] = "mongodb://127.0.0.1:27017/academicworld"

mongo = PyMongo(app)

# neo4j configurations
uri = "bolt://localhost:7687"
username = "neo4j"
password = "35653212bb"
database_name = "academicworld"
driver = GraphDatabase.driver(uri, auth=(username, password))


@app.route('/mysql')
def mysql_data():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT name FROM Keyword")
    data = [{'name': row[0]} for row in cursor.fetchall()]
    cursor.close()
    return jsonify(data)

@app.route('/mongodb')
def mongodb_data():
    data = list()
    currentCollection = mongo.db.faculty
    return dumps(currentCollection.find())
    # for i in currentCollection.find():
    #     data.append({'title': i['title']})
    # return jsonify(data)

@app.route('/neo4j')
def neo4j_data():
    data = []
    with driver.session(database=database_name) as session:
        result = session.run("MATCH (n:INSTITUTE) RETURN n")
        for record in result:
            node = record['n']
            data.append(dict(node))
    return jsonify(data)

@app.route('/mongodb/search-keyword-publications', methods=['GET'])
def search_keyword_publications():
    keyword = request.args.get('keyword')
    pipeline = [
        # Match documents where keywords.name matches the input keyword
        {"$match": {"keywords.name": keyword}},
        # Group by year and get the count of matching documents for each year
        {
            "$group": {
                "_id": "$year", 
                "count": {"$sum": 1}
            }
        },
        # Project the desired fields in the result
        {
            "$project": {
                "year": "$_id",
                "keyword": keyword,
                "count": "$count",
                "_id": 0
            }
        },
        # Optionally sort by year
        {"$sort": {"year": 1}}
    ]
    result = list(mongo.db.publications.aggregate(pipeline))
    return dumps(result)

@app.route('/mysql/search-publications-by-university', methods=['GET'])
def search_publications_by_university():
    keyword = request.args.get('keyword')
    university = request.args.get('university')

    cursor = mysql.connection.cursor()

    # Query 1
    query_total = """
    SELECT COUNT(DISTINCT p.id) AS total_publications
    FROM publication p
    JOIN publication_keyword pk ON p.id = pk.publication_id
    JOIN keyword k ON pk.keyword_id = k.id
    WHERE k.name = %s;
    """

    cursor.execute(query_total, (keyword,))
    total_publications = int(cursor.fetchone()[0])

    # Query 2
    query_university = """
    SELECT
        u.name AS university,
        COUNT(DISTINCT p.id) AS university_publications
    FROM
        faculty f
    JOIN faculty_publication fp ON f.id = fp.faculty_id
    JOIN publication p ON fp.publication_id = p.id
    JOIN publication_keyword pk ON p.id = pk.publication_id
    JOIN keyword k ON pk.keyword_id = k.id
    JOIN university u ON f.university_id = u.id
    WHERE k.name = %s AND u.name = %s
    GROUP BY u.name;
    """

    cursor.execute(query_university, (keyword, university))
    university_data = cursor.fetchone()
    if(university_data):
        university_data_int = int(university_data[1])
    else:
        university_data_int = 0

    cursor.close()

    rest_of_publications = total_publications - university_data_int

    response_data = [
        {
            'university': university,
            'publications': university_data_int
        },
        {
            'university': 'other universities',
            'publications': rest_of_publications
        }
    ]

    return jsonify(response_data)

@app.route('/neo4j/top-keywords', methods=['GET'])
def get_top_keywords():
    university = request.args.get('university')
    
    if not university:
        return jsonify({'error': 'University name is required'}), 400

    with driver.session(database=database_name) as session:
        result = session.run("""
        MATCH (institute:INSTITUTE) WHERE institute.name = $universityName
        MATCH (faculty:FACULTY)-[:AFFILIATION_WITH]->(institute)
        MATCH (faculty)-[:PUBLISH]->(publication:PUBLICATION)
        MATCH (publication)-[:LABEL_BY]->(keyword:KEYWORD)
        WITH keyword, COUNT(DISTINCT publication) AS num_Publications
        ORDER BY num_Publications DESC
        LIMIT 10
        RETURN keyword.name AS keyword, num_Publications;
    """, {'universityName': university})
        
        # Convert the result to a list of dictionaries
        keywords = [{'keyword': record['keyword'], 'count': record['num_Publications']} for record in result]
        return jsonify(keywords)
    
@app.route('/mongodb/search-publications', methods=['GET'])
def search_publications():
    keyword = request.args.get('keyword')

    # Using $elemMatch to find documents where the keywords array has an element with the specified name
    publications = mongo.db.publications.find({"keywords": {"$elemMatch": {"name": keyword}}})

    results = []
    for publication in publications:
        for kw in publication.get("keywords", []):
            if kw["name"] == keyword:
                results.append({
                    "title": publication["title"],
                    "year": publication["year"],
                    "score": kw["score"]
                })
    sorted_results = sorted(results, key=lambda x: x['score'], reverse=True)

    return jsonify(sorted_results)

# use mongodb to do the crud operations for publications keywords
@app.route('/publications/keywords', methods=['GET'])
def get_keywords_for_publication():
    publication_name = request.args.get('name')
    publication = mongo.db.publications.find_one({"title": publication_name}, {"keywords": 1})
    if not publication:
        return jsonify({"error": "Publication not found"}), 404

    return jsonify(publication["keywords"])

@app.route('/publications/keywords/add', methods=['POST'])
def add_keywords_for_publication():
    data = request.get_json()
    publication_name = data.get('name')
    keyword = data.get('keyword')

    if not publication_name or not keyword:
        return jsonify({"error": "Publication name or keyword missing"}), 400
    mongo.db.publications.update_one({"title": publication_name}, {"$push": {"keywords": keyword}})
    
    return jsonify({"message": "Keyword added successfully"})

@app.route('/publications/keywords/delete', methods=['POST'])
def delete_keyword_for_publication():
    data = request.get_json()
    publication_name = data.get('name')
    keyword = data.get('keyword')

    if not publication_name or not keyword:
        return jsonify({"error": "Publication name or keyword missing"}), 400

    mongo.db.publications.update_one({"title": publication_name}, {"$pull": {"keywords": {"name": keyword["name"]}}})
    
    return jsonify({"message": "Keyword removed successfully"})


# use mongodb to do the crud operations for faculty keywords
@app.route('/faculty/keywords', methods=['GET'])
def get_keyword_for_faculty():
    faculty_name = request.args.get('name')
    faculty = mongo.db.faculty.find_one({"name": faculty_name}, {"keywords": 1})
    if not faculty:
        return jsonify({"error": "Faculty not found"}), 404

    return jsonify(faculty["keywords"])

@app.route('/faculty/keywords/add', methods=['POST'])
def add_keyword_for_faculty():
    data = request.get_json()
    faculty_name = data.get('name')
    keyword = data.get('keyword')

    if not faculty_name or not keyword:
        return jsonify({"error": "Faculty name or keyword missing"}), 400
    mongo.db.faculty.update_one({"name": faculty_name}, {"$push": {"keywords": keyword}})
    
    return jsonify({"message": "Keyword added successfully"})

@app.route('/faculty/keywords/delete', methods=['POST'])
def delete_keyword_for_faculty():
    data = request.get_json()
    faculty_name = data.get('name')
    keyword = data.get('keyword')

    if not faculty_name or not keyword:
        return jsonify({"error": "Faculty name or keyword missing"}), 400

    mongo.db.faculty.update_one({"name": faculty_name}, {"$pull": {"keywords": {"name": keyword["name"]}}})
    return jsonify({"message": "Keyword removed successfully"})


# @app.route('/combined_data')
# def get_combined_data():
#     # MySQL data
#     conn = mysql.connect()
#     cursor = conn.cursor()
#     cursor.execute("SELECT * FROM Faculty")
#     mysql_data = cursor.fetchall()
#     conn.close()

#     # MongoDB data
#     mongo_data = list(mongo.db.yourMongoCollection.find({}))

#     return jsonify({
#         "mysql_data": mysql_data,
#         "mongo_data": mongo_data
#     })

if __name__ == '__main__':
    app.run(debug=True, port=5000)