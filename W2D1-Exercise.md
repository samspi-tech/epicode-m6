# W2D1 — Query di MondoDB

1. ### Trova tutte le risorse con il dato isActive corrispondente a true

- query: `{isActive: true}`
- risorse: 51

2. ### Trova tutte le risorse con il dato age maggior di 26

- query: `{age: {$gt: 26}}`
- risorse: 54

3. ### Trova tutte le risorse con il dato age maggiore di 26 e minore o uguale a 30

- query: `{{$and: [{age: {$gt: 26}}, {age: {$lte: 30}}]}`
- risorse: 19

4. ### Trova tutte le risorse con il dato eyes che sia brown o blue

- query: `{ $or: [ {eyeColor: "brown"}, {eyeColor: "blue"} ] }`
- risorse: 66

5. ### Trova tutte le risorse che non presentano il dato eyes uguale a green

- query: `{eyeColor: {$not: {$eq: "green"}}}`
- risorse: 66

6. ### Trova tutte le risorse che non presentano il dato eyes uguale a green e neanche a blue

- query: `{$and: [{eyeColor: {$not: {$eq: "green"}}}, {eyeColor: {$not: {$eq: "blue"}}}]}`
- risorse: 35

7. ### Trova tutte le risorse con il dato company uguale a "FITCORE" e ritorna solo l'email

- query: `{ company: "FITCORE" }`
- project: `{_id: 0, email: 1 }`
- risorse: 1