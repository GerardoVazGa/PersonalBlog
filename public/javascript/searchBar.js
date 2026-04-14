import { escapeHtml } from './sanitizer.js'
class SearchBar {
    constructor() {
        this.searchInput = document.getElementById('blog-search-input')
        this.searchBtn = document.getElementById('search-btn')
        this.clearBtn = document.getElementById('clear-search-btn')
        this.resultsContainer = document.getElementById('search-results')
        this.debounceTimeout = null
        this.controller = null
        this.delay = 300
    }

    init() {
        this.searchInput.addEventListener('keypress', this.keypressHandler.bind(this))
        this.searchInput.addEventListener('input', this.inputHandler.bind(this))
        this.searchBtn.addEventListener('click', this.performSearch.bind(this))
        this.clearBtn.addEventListener('click', this.clearSearch.bind(this))
    }

    keypressHandler(e) {
        if (e.key === 'Enter') {
            clearTimeout(this.debounceTimeout)
            this.performSearch()
        }
    }

    inputHandler() {
        const value = this.searchInput.value.trim()

        this.clearBtn.style.display = value ? 'block' : 'none'

        clearTimeout(this.debounceTimeout)

        this.debounceTimeout = setTimeout(() => {
            this.performSearch()
        }, this.delay)
    }

    async performSearch() {
        const query = this.searchInput.value.trim()

        if(query.length === 0) {
            this.clearSearch()
            return
        }

        if (!query || query.length < 2) {
            this.setState('empty', null, 'Escribe al menos 2 caracteres para buscar')
            return
        }

        this.setState('loading')

        if(this.controller) {
            this.controller.abort()
        }

        this.controller = new AbortController()

        try {
            const response = await fetch(`/api/posts/search?q=${encodeURIComponent(query)}`, { signal: this.controller.signal })

            if(!response.ok) {
                throw new Error('Error en la búsqueda')
            }

            const data = await response.json()
            if(!data.posts || data.posts.length === 0) {
                this.setState('empty', null, '😔 No se encontraron artículos. Intenta con otras palabras clave.')
                return
            }

            this.setState('success', data.posts)
        } catch (error) {
            console.error('Error en la búsqueda:', error)
            this.setState('error', null, '❌ Error al realizar la búsqueda. Por favor, intenta de nuevo.')
        }

    }

    renderResults(posts) {
        posts.forEach(post => {
            const itemLink = document.createElement('a')
            itemLink.href = `/post/${post.slug}`
            itemLink.classList.add('search-result-item')
            const titleDiv = document.createElement('div')
            titleDiv.classList.add('search-result-title')
            titleDiv.textContent = `📝 ${post.title}`
            const previewDiv = document.createElement('div')
            previewDiv.classList.add('search-result-preview')
            previewDiv.textContent = `${post.preview.substring(0, 120)}...`
            itemLink.appendChild(titleDiv)
            itemLink.appendChild(previewDiv)
            this.resultsContainer.appendChild(itemLink)

        }) 
    }

    clearSearch() {
        this.searchInput.value = ''
        this.resultsContainer.innerHTML = ''
        this.resultsContainer.style.display = 'none'
        this.clearBtn.style.display = 'none'
        this.searchInput.focus()
    }

    setState(state, data = null, message = '') {
        this.resultsContainer.innerHTML = ''
        this.resultsContainer.style.display = 'block'
        
        switch(state) {
            case 'loading':
                this.loadingState()
                break
            case 'error':
                this.errorSearch('search-error', message)
                break
            case 'empty':
                this.errorSearch('no-results', message || 'No se encontraron resultados')
                break
            case 'success':
                this.renderResults(data || [])
                break

        }
    }

    loadingState() {
        const divLoading = document.createElement('div')
        divLoading.classList.add('search-loading')
        divLoading.textContent = 'Buscando artículos'
        this.resultsContainer.appendChild(divLoading)
        this.resultsContainer.style.display = 'block'
    }

    errorSearch(errorClass, message) {
        const divError = document.createElement('div')
        divError.classList.add(errorClass)
        divError.textContent = message
        this.resultsContainer.appendChild(divError)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = new SearchBar()
    searchBar.init()
})

