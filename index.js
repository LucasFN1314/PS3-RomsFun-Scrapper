import { Database } from "bun:sqlite";

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Inicializar la base de datos
const db = new Database("games.db");

// Crear tabla si no existe
db.run(`
    CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT NOT NULL,
        title TEXT NOT NULL,
        link TEXT NOT NULL UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// Preparar statement para inserción
const insertStmt = db.prepare(`
    INSERT OR IGNORE INTO games (image, title, link)
    VALUES (?, ?, ?)
`);

// Preparar statement para búsqueda con paginación
const searchStmt = db.prepare(`
    SELECT id, image, title, link, created_at
    FROM games
    WHERE title LIKE ?
    ORDER BY id ASC
    LIMIT ? OFFSET ?
`);

// Preparar statement para contar resultados
const countStmt = db.prepare(`
    SELECT COUNT(*) as total
    FROM games
    WHERE title LIKE ?
`);

Bun.serve({
    port: 3000,
    async fetch(req) {
        const url = new URL(req.url);

        try {
            if (req.method === "OPTIONS") {
                return new Response(null, { headers: CORS_HEADERS });
            }

            if (req.method === "POST" && url.pathname === "/insert") {
                const body = await req.json();
                console.log(`Recibidos ${body.length} juegos`);

                let inserted = 0;
                let skipped = 0;

                // Insertar cada juego
                for (const game of body) {
                    const result = insertStmt.run(game.image, game.title, game.link);
                    if (result.changes > 0) {
                        inserted++;
                    } else {
                        skipped++;
                    }
                }

                return Response.json(
                    {
                        success: true,
                        inserted,
                        skipped,
                        total: body.length
                    },
                    { headers: CORS_HEADERS }
                );
            }

            if (req.method === "GET" && url.pathname === "/games") {
                const limite = parseInt(url.searchParams.get("limite") || "10");
                const pagina = parseInt(url.searchParams.get("pagina") || "1");
                const busqueda = url.searchParams.get("busqueda") || "";

                const offset = (pagina - 1) * limite;
                const searchPattern = `%${busqueda}%`;

                // Obtener juegos
                const games = searchStmt.all(searchPattern, limite, offset);

                // Obtener total de resultados
                const { total } = countStmt.get(searchPattern);
                const totalPaginas = Math.ceil(total / limite);

                return Response.json(
                    {
                        success: true,
                        data: games,
                        pagination: {
                            pagina,
                            limite,
                            total,
                            totalPaginas,
                            siguiente: pagina < totalPaginas ? pagina + 1 : null,
                            anterior: pagina > 1 ? pagina - 1 : null
                        }
                    },
                    { headers: CORS_HEADERS }
                );
            }

        } catch (error) {
            return Response.json(
                { success: false, message: error.message },
                { headers: CORS_HEADERS, status: 500 }
            );
        }
    }
});

console.log("Server running on http://localhost:3000");
/*

// Insertar juegos
fetch('http://localhost:3000/insert', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify([
    {
      image: "https://example.com/image.png",
      title: "Tomb Raider",
      link: "https://example.com/tomb-raider"
    }
  ])
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Buscar juegos
fetch('http://localhost:3000/games?limite=10&pagina=1&busqueda=tomb')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

*/