#  app-pokedex

> Pokédex interactiva construida con React, Tailwind CSS y React Query consumiendo la PokeAPI. Más de 1350 pokémon en la palma de tu mano.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

##  Features

### Requerimientos base
-  Tabla con 10 pokémon por página con nombre e imagen
-  Paginación con botones anterior/siguiente usando los campos `next` y `previous` de la API
-  Filtro de búsqueda por nombre
-  Doble clic en la imagen para ver tipo, peso y habilidades
-  Clic en una habilidad para ver sus efectos
-  Diseño totalmente responsive

### Mejoras extra
-  **Búsqueda en tiempo real** — filtra entre 1350 pokémon localmente sin llamadas extra a la API
-  **Filtro por tipo** — dropdown con los 18 tipos combinable con la búsqueda por nombre
-  **Paginación en resultados** — los resultados filtrados también se paginan de a 10
-  **Contador de resultados** — muestra cuántos pokémon encontró y con qué filtros
-  **Página X de Y** — siempre sabés en qué página estás del total
-  **Skeleton loading** — placeholders animados mientras carga, como Netflix o YouTube
-  **Nombre en español** — usa `/pokemon-species/{name}` para el nombre oficial en español
-  **Estadísticas con barras** — HP, Ataque, Defensa y más con barras de colores animadas
-  **Sonido del pokémon** — reproduce el grito oficial directamente desde la PokeAPI
-  **Modal con color por tipo** — gradiente diagonal si tiene 2 tipos, color sólido si tiene uno
-  **Animación del modal** — entrada con fade + scale y salida animada
-  **Doble tap en mobile** — detecta doble tap en menos de 300ms para dispositivos táctiles

---

##  Tecnologías

| Tecnología | Uso |
|-----------|-----|
| [React 19](https://react.dev/) | Framework principal |
| [Vite 6](https://vite.dev/) | Bundler y dev server |
| [Tailwind CSS 4](https://tailwindcss.com/) | Estilos |
| [React Query 5](https://tanstack.com/query) | Consumo y cacheo de la API |
| [Axios](https://axios-http.com/) | Cliente HTTP |
| [Lucide React](https://lucide.dev/) | Íconos |
| [PokeAPI](https://pokeapi.co/) | Fuente de datos |

---

##  Instalación y uso

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/djrocerk/app-pokedex.git
cd app-pokedex

# 2. Instalar dependencias
npm install

# 3. Correr en desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:5173
```

### Build para producción

```bash
npm run build
npm run preview
```

---

##  Estructura del proyecto

```
app-pokedex/
└── src/
    ├── api/
    │   └── pokemon.js          # Todas las llamadas a la PokeAPI
    ├── components/
    │   ├── PokemonTable.jsx     # Tabla principal
    │   ├── PokemonRow.jsx       # Fila individual con skeleton
    │   ├── Pagination.jsx       # Controles de paginación
    │   ├── SearchBar.jsx        # Buscador con filtro de tipos
    │   ├── PokemonModal.jsx     # Modal con detalle completo
    │   └── AbilityModal.jsx     # Modal con efectos de habilidad
    ├── hooks/
    │   └── usePokemon.js        # Hooks de React Query
    ├── App.jsx                  # Componente raíz
    └── main.jsx                 # Entry point
```

---

##  Endpoints utilizados

| Endpoint | Uso |
|----------|-----|
| `/pokemon?limit=10&offset=N` | Lista paginada |
| `/pokemon?limit=1350` | Lista completa para búsqueda local |
| `/pokemon/{name}` | Detalle, imagen, stats, sonido |
| `/pokemon-species/{name}` | Nombre en español |
| `/ability/{name}` | Efectos de habilidades |
| `/type/{name}` | Pokémon por tipo |
| `/type?limit=20` | Lista de todos los tipos |

---

##  Screenshots

###  Pantalla principal
<img width="1883" height="1079" alt="image" src="https://github.com/user-attachments/assets/10b73cad-6bb4-4735-8912-01c50d94eeb9" />


###  Búsqueda en tiempo real
<img width="1667" height="1036" alt="image" src="https://github.com/user-attachments/assets/601fd568-7c1e-48b5-a458-3ff49c0fa918" />


###  Filtro por tipo
<img width="1021" height="1004" alt="image" src="https://github.com/user-attachments/assets/fdabb648-0ccd-4adc-b37c-86afca1a9ddc" />


###  Modal de detalle
<img width="1026" height="914" alt="image" src="https://github.com/user-attachments/assets/676e1fdb-b3ca-4e8e-a579-6b46e2e5325e" />


###  Modal de habilidad

<img width="1020" height="864" alt="image" src="https://github.com/user-attachments/assets/e0ad7e0c-c76e-4699-9d49-2e2500bf56ae" />


---

##  Autor

Desarrollado por **Roberto Cerquera Guerrero** como prueba técnica de selección.

---

##  Licencia

MIT © djrocerk
