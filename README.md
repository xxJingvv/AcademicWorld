# Course Project of CS411 - Academic World Dashboard
The project assignment of CS411, the project owner is Jing


1. Project Title: 
Keywords tool of Academic World

2. Purpose: 
    The project is developed to be a convenient tool for tracking and editing keywords on three different databases. The primary goal of this project is to simplify the process of tracking and editing keywords within academic databases. The project offered users an easy platform to search for, and track keywords across diverse databases.

3. Demo: https://mediaspace.illinois.edu/media/t/1_z1jse2r2

4. Installation: 
   To run the project, you need to install Python and React dependencies. 
   using terminal, need to make sure the academic world database is stored and running on Neo4j.

   run app.py by 'python app.py' in the server first, and the server host will be localhost:5000 by default.
   then run 'npm start' in the client, the client side will be localhost:3000 by default.

5. Usage: 
    Input the information of required keywords or university names, in different widgets, you will see the descriptions of different features in the app.

6. Design:
    1. Frontend Layer: React Components,
    2. Middleware Layer: Flask;
    3. Database Layer: MySQL, MongoDB, Neo4j.
    The project is architected to develop RESTful APIs with Python and Flask, pass the portal to the client side, and reduce the calculation on the frontend.

7. Implementation:
    ## Database:
    A. MySQL: Relational database management system, it is used to store structured data, ensuring data integrity and efficiency.

    B. MongoDB: NoSQL database known for its flexibility, scalability, and performance, it caters to unstructured or semi-structured data, allowing for easier storage and retrieval of varied data formats.

    C. Neo4j: Graph database that represents and stores data as interconnected nodes and relationships. It's especially useful for understanding and querying complex relationships between data points.

    ## Framework:

    Backend:
    Flask (Python): A lightweight and flexible web application framework. Flask serves as the backend of the application, managing interactions with the three databases, and providing the necessary data to the frontend.

    Frontend:
    React: A modern JavaScript library for building user interfaces. React enables the development of reusable widgets that offer users a dynamic and interactive experience. These widgets help users easily search for and edit keyword-related information.

    ## UI Components:

    Material-UI (MUI): 
    A popular React UI framework, MUI provides a wide array of ready-made components, ensuring a cohesive and modern design throughout the application.

    Recharts: 
    A composable charting library built on React components. It's employed in the project to visualize keyword trends, database comparisons, or any other data-driven insights that would benefit from a graphical representation.

3. Features:
    1. The Trend of the Keyword in Publications
    Input the keyword you want to search for, and the chart will show the number of publications related to this keyword in history.
    2. University contribution of the keyword
    Input the keyword and university name you want to search for, and the chart will show the number of publications in the university and the keyword you enter taking in the industry.
    3. Most popular keywords in the university
    Input the university name you want to search for, and the chart will return the list of the top 10 popular keywords, ranking by counts of the publications from the university faculty related to the keyword you input.
    4. Publications related to the Keyword
    Input the keyword you want to search for, and the table will show the name of publications related to the keyword, including the year it was published. the table is ranked by keyword score.
    5. Manage Keywords of a publication
    Input a publication's title, the table will show the keywords contained in the publication. You could add and delete the keyword in the list, and it will update the database.
    6. Manage the Keyword of a faculty
    Input a faculty's name, the table will show the keywords related to the faculty. You could add and delete the keyword in the list, and it will update the database.

8. Database Technique:
    1. Indexing
    For the data returned to tables, the id is attached since the frontend component required each row to have a primary id.
    2. Prepared statements
    In multiple methods like search_publications_by_university(), and get_top_keywords(), the prepared statements are applied.
    3. Stored Procedure
    MongoDB pipeline is applied in the API.
    4. REST API for accessing databases
    The backend is based on REST API.

9. Contributions:
   Jing did almost all of the work on this project, thanks Jing.
