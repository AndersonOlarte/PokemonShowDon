# PokemonShowDon

Este proyecto utiliza [Playwright](https://playwright.dev/) para automatizar pruebas de la aplicación Pokemon Showdown, incluyendo la creación y validación de equipos de Pokémon.

## Estructura del Proyecto

- `data/`: Contiene archivos JSON con los datos de prueba.
- `Pages/`: Contiene clases que implementan el Page Object Model (POM) para cada página de la aplicación.
- `tests/`: Contiene los archivos de pruebas automatizadas.
- `playwright.config.ts`: Configuración de Playwright para el proyecto.
- `README.md`: Documentación del proyecto.
  
## Instalación

### Prerrequisitos

Asegúrate de tener instalado:
- Node.js (v14 o superior)

### Pasos de instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/AndersonOlarte/PokemonShowDon.git

2. Ve al directorio del proyecto:
    ```bash
    cd PokemonShowDon
3. Instala las dependencias:
    ```bash
    npm install
4. Instala los navegadores requeridos por Playwright:
    ```bash
    npx playwright install

### Ejecución de las Pruebas 
1. Para ejecutar solo el archivo pokemon.spec.ts:
    ```bash
    npx playwright test tests/pokemon.spec.ts
2. Para ejecutar solo el archivo pokemonFailure.spec.ts:
    ```bash
    npx playwright test tests/pokemonFailure.spec
3. Ejecutar pruebas en modo "headed" (navegador visible)
    ```bash
    npx playwright test tests/pokemon.spec.ts --headed
4. Ver el reporte de pruebas
    ```bash
    npx playwright show-report

