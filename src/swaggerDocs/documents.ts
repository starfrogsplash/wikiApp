/**
@swagger
* components:
*     schemas:
*       document:
*         type: object
*         required:
*           - document
*           - name
*         properties:
*           title:
*             type: string
*             description: The title of the document.
*           content:
*             type: string
*             description: the content of the article
*         example:
*            content: 'The winds of winter and a tale of house and fire'
*       allDocuments:
*         type: array
*         items:
*           type: object
*         example:
*            - title: flash
*            - title: goosebumps
*            - title: house of the dragon
*       allRevisions:
*         type: array
*         items:
*           type: object
*         example:
*            - id: 3
*              title: flash
*              content: updated content v2
*              revision: 3
*              timeStamp: 2022-10-10T21:19:55.000Z
*            - id: 2
*              title: flash
*              content: updated content v1
*              revision: 2
*              timeStamp: 2022-10-10T21:10:55.000Z
*            - id: 1
*              title: flash
*              content: updated content v1
*              revision: 1
*              timeStamp: 2022-10-10T20:10:55.000Z
*       latest:
*         type: array
*         items:
*           type: object
*         properties:
*           title:
*             type: string
*             description: The title of the document.
*         example:
*            - id: 3
*              title: flash
*              content: updated content v2
*              revision: 3
*              timeStamp: 2022-10-10T21:19:55.000Z
*/

/** 
 *@swagger
 *  tags:
 *    name: Documents
 *    description: API to manage your document.
 */

/**
 * @swagger
 *  /documents:
 *    get:
 *      summary: Lists all Documents by title
 *      tags: [Documents]
 *      responses:
 *        "200":
 *          description: returns with a list of documents by title.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/allDocuments'
 * /documents/{title}:
 *    get:
 *      summary: get document and all its revisions by title
 *      tags: [Documents]
 *      parameters:
 *        - in: path
 *          name: title
 *          schema:
 *            type: string
 *          required: true
 *          description: title of the document
 *      responses:
 *        "200":
 *          description: returns documents with all its revisions
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/allRevisions'
 *    post:
 *      summary: Creates a new document
 *      tags: [Documents]
 *      parameters:
 *        - in: path
 *          name: title
 *          schema:
 *            type: string
 *          required: true
 *          description: wiki document
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/document'
 *      responses:
 *        "200":
 *          description: The newly created or updated document if already exists.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/document'
 * /documents/{title}/latest:
 *    get:
 *      summary: get latest revision of document
 *      tags: [Documents]
 *      parameters:
 *        - in: path
 *          name: title
 *          schema:
 *            type: string
 *          required: true
 *          description: title of the document
 *      responses:
 *        "200":
 *          description: return document
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/latest'
 * /documents/{title}/{timeStamp}:
 *    get:
 *      summary: get latest revision of document
 *      tags: [Documents]
 *      parameters:
 *        - in: path
 *          name: title
 *          schema:
 *            type: string
 *          required: true
 *          description: title of the document
 *        - in: path
 *          name: timeStamp
 *          schema:
 *            type: string
 *          required: true
 *          description: timeStamp of the document in iso string format
 *          example:
 *            '2022-10-10T20:03:21Z'
 *      responses:
 *        "200":
 *          description: return document
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/latest'
 */