# Timeline

## Description

A backend server for recording events.

## API

[API Docs](https://github.com/senhungwong/timeline-server/wiki)

<details>
<summary>Postman Collection</summary>
<pre>
{
	"info": {
		"_postman_id": "d5786fe3-1ca8-4ff8-9947-616fe5b8ee9e",
		"name": "timeline-server",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "Auth",
			"description": null,
			"item": [
				{
					"name": "Register",
					"event": [
						{
							"listen": "test",
							"script": {
								"id": "d84860e3-bf0e-4912-b81e-a61bafa32a28",
								"type": "text/javascript",
								"exec": [
									"var data = pm.response.json();",
									"pm.environment.set(\"timeline-auth-token\", data.token);"
								]
							}
						}
					],
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n\t\"username\": \"admin\",\n\t\"password\": \"password\"\n}"
						},
						"url": {
							"raw": "{{timeline-host}}/api/v1/auth/register",
							"host": [
								"{{timeline-host}}"
							],
							"path": [
								"api",
								"v1",
								"auth",
								"register"
							]
						}
					},
					"response": []
				},
				{
					"name": "Login",
					"event": [
						{
							"listen": "test",
							"script": {
								"id": "c32a70fe-d0c7-45d7-a9dd-a304f21b6afc",
								"type": "text/javascript",
								"exec": [
									"var data = pm.response.json();",
									"pm.environment.set(\"timeline-auth-token\", data.token);"
								]
							}
						}
					],
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n\t\"username\": \"admin\",\n\t\"password\": \"password\"\n}"
						},
						"url": {
							"raw": "{{timeline-host}}/api/v1/auth/login",
							"host": [
								"{{timeline-host}}"
							],
							"path": [
								"api",
								"v1",
								"auth",
								"login"
							]
						}
					},
					"response": []
				},
				{
					"name": "Username uniqueness check",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n\t\"username\": \"admin\"\n}"
						},
						"url": {
							"raw": "{{timeline-host}}/api/v1/auth/uniqueness/username",
							"host": [
								"{{timeline-host}}"
							],
							"path": [
								"api",
								"v1",
								"auth",
								"uniqueness",
								"username"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Event",
			"description": "",
			"item": [
				{
					"name": "Index event",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "x-access-token",
								"value": "{{timeline-auth-token}}"
							}
						],
						"body": {},
						"url": {
							"raw": "{{timeline-host}}/api/v1/events",
							"host": [
								"{{timeline-host}}"
							],
							"path": [
								"api",
								"v1",
								"events"
							]
						}
					},
					"response": []
				},
				{
					"name": "Create event",
					"event": [
						{
							"listen": "test",
							"script": {
								"id": "3463d0c7-da0a-4729-b6ff-4798d892bf8c",
								"type": "text/javascript",
								"exec": [
									"var data = pm.response.json();",
									"pm.environment.set(\"timeline-event-id\", data.id);"
								]
							}
						}
					],
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "x-access-token",
								"value": "{{timeline-auth-token}}"
							},
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"title\": \"Test event title\",\n  \"description\": \"My first event\",\n  \"postedAt\": 1531842308024\n}"
						},
						"url": {
							"raw": "{{timeline-host}}/api/v1/events",
							"host": [
								"{{timeline-host}}"
							],
							"path": [
								"api",
								"v1",
								"events"
							]
						}
					},
					"response": []
				},
				{
					"name": "Edit event",
					"request": {
						"method": "PATCH",
						"header": [
							{
								"key": "x-access-token",
								"value": "{{timeline-auth-token}}"
							},
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"title\": \"Test event title changed\",\n  \"description\": \"My first event updated\",\n  \"postedAt\": 1531842308024\n}"
						},
						"url": {
							"raw": "{{timeline-host}}/api/v1/events/:eventId",
							"host": [
								"{{timeline-host}}"
							],
							"path": [
								"api",
								"v1",
								"events",
								":eventId"
							],
							"variable": [
								{
									"key": "eventId",
									"value": "{{timeline-event-id}}"
								}
							]
						}
					},
					"response": []
				},
				{
					"name": "Delete event",
					"request": {
						"method": "DELETE",
						"header": [
							{
								"key": "x-access-token",
								"value": "{{timeline-auth-token}}"
							},
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": ""
						},
						"url": {
							"raw": "{{timeline-host}}/api/v1/events/:eventId",
							"host": [
								"{{timeline-host}}"
							],
							"path": [
								"api",
								"v1",
								"events",
								":eventId"
							],
							"variable": [
								{
									"key": "eventId",
									"value": "{{timeline-event-id}}"
								}
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Tag",
			"description": "",
			"item": [
				{
					"name": "Index tag",
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "x-access-token",
								"value": "{{timeline-auth-token}}"
							}
						],
						"body": {},
						"url": {
							"raw": "{{timeline-host}}/api/v1/tags",
							"host": [
								"{{timeline-host}}"
							],
							"path": [
								"api",
								"v1",
								"tags"
							]
						}
					},
					"response": []
				},
				{
					"name": "Create tag",
					"event": [
						{
							"listen": "test",
							"script": {
								"id": "66a9c89e-549d-4d82-a5bb-c0f31bf6b5b9",
								"type": "text/javascript",
								"exec": [
									"var data = pm.response.json();",
									"pm.environment.set(\"timeline-tag-id\", data.id);"
								]
							}
						}
					],
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "x-access-token",
								"value": "{{timeline-auth-token}}"
							},
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"name\": \"Test tag name\",\n    \"description\": \"My first tag\",\n    \"color\": \"#FFFFFF\"\n}"
						},
						"url": {
							"raw": "{{timeline-host}}/api/v1/tags",
							"host": [
								"{{timeline-host}}"
							],
							"path": [
								"api",
								"v1",
								"tags"
							]
						}
					},
					"response": []
				},
				{
					"name": "Edit tag",
					"request": {
						"method": "PATCH",
						"header": [
							{
								"key": "x-access-token",
								"value": "{{timeline-auth-token}}"
							},
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n  \"name\": \"Tag name change\",\n  \"description\": \"Tag description change\",\n  \"color\": \"#000000\"\n}"
						},
						"url": {
							"raw": "{{timeline-host}}/api/v1/tags/:tagId",
							"host": [
								"{{timeline-host}}"
							],
							"path": [
								"api",
								"v1",
								"tags",
								":tagId"
							],
							"variable": [
								{
									"key": "tagId",
									"value": "{{timeline-tag-id}}"
								}
							]
						}
					},
					"response": []
				},
				{
					"name": "Delete tag",
					"request": {
						"method": "DELETE",
						"header": [
							{
								"key": "x-access-token",
								"value": "{{timeline-auth-token}}"
							},
							{
								"key": "Content-Type",
								"value": "application/json"
							}
						],
						"body": {
							"mode": "raw",
							"raw": ""
						},
						"url": {
							"raw": "{{timeline-host}}/api/v1/tags/:tagId",
							"host": [
								"{{timeline-host}}"
							],
							"path": [
								"api",
								"v1",
								"tags",
								":tagId"
							],
							"variable": [
								{
									"key": "tagId",
									"value": "{{timeline-tag-id}}"
								}
							]
						}
					},
					"response": []
				}
			]
		}
	]
}
</pre>
</details><br/>

## Tests

```bash
$ npm test
```
