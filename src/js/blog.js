const articlesSection = body.querySelector('[data-functionality="articles"]')
const articlesSearch = articlesSection.querySelector('[data-functionality="articles-search"]')
const articlesContainer = articlesSection.querySelector('.articles')

const articlesNodeList = articlesSection.querySelectorAll('.articles__item')
const articlesArray = Array.prototype.slice.call(articlesNodeList)

const articlesFilters = articlesSection.querySelector('.articles__filters')

const articlesTagsNodeList = articlesSection.querySelectorAll('.articles__list .article__tag')
const articlesTagsArray = Array.prototype.slice.call(articlesTagsNodeList)
let articlesTags = new Set()

let searchPhrase = []
let searchTags = []
let matchedArticles = articlesArray

const articlesPerPage = 6
let activePage = 0

if (articlesArray && articlesArray.length > 0 && articlesSearch) {

	const articlesPagination = document.createElement('nav')
	articlesPagination.classList.add('pagination', 'articles__pagination')
	articlesContainer.appendChild(articlesPagination)

	const createPagination = () => {
		articlesPagination.innerHTML = ''
		let articlesPages = matchedArticles.reduce((articlesPagesArray, article, index) => {
			const chunkIndex = Math.floor(index / articlesPerPage)

			if (!articlesPagesArray[chunkIndex]) {
				articlesPagesArray[chunkIndex] = []
			}

			articlesPagesArray[chunkIndex].push(article)

			return articlesPagesArray
		}, [])

		articlesPages.forEach(page => {
			if (articlesPages.indexOf(page) == activePage) {
				page.forEach(article => {
					article.classList.remove('articles__item--hidden')
				})
			} else {
				page.forEach(article => {
					article.classList.add('articles__item--hidden')
				})
			}
		})

		articlesPages.forEach((page, index) => {
			let pageButton = document.createElement('button')
			pageButton.classList.add('pagination__button', 'articles__pagination-button')
			pageButton.innerText = index + 1
			pageButton.dataset.pagenumber = index
			articlesPagination.appendChild(pageButton)
			if (index == activePage) {
				pageButton.classList.add('pagination__button--active');
			}
		})
	}
	createPagination()

	const findMatchedArticles = (event) => {
		matchedArticles = []
		if (event) {
			activePage = event.target.dataset.pagenumber
		} else {
			activePage = 0
		}
		articlesArray.forEach(article => {
			const checkPhrase = searchPhrase.some(substring => article.textContent.toLowerCase().includes(substring))
			const checkTags = searchTags.some(substring => article.textContent.toLowerCase().includes(substring))
			const emptyPhrase = searchPhrase.length == 0
			const emptyTags = searchTags.length == 0

			if ((checkPhrase && checkTags) || (checkPhrase && emptyTags) || (checkTags && emptyPhrase) || (emptyPhrase && emptyTags)) {
				article.classList.remove('articles__item--filtered')
				matchedArticles.push(article)
			} else {
				article.classList.add('articles__item--filtered')
			}
		})
		createPagination()
	}

	articlesSearch.addEventListener('input', (event) => {
		searchPhrase = event.target.value.toLowerCase().split(/[$&+,:;=?@#|'<>.^*()%!-^\s+$]/).filter(substring => substring)
		findMatchedArticles()
	})

	articlesPagination.addEventListener('click', (event) => {
		if (event.target.classList.contains('articles__pagination-button')) {
			findMatchedArticles(event)
		}
	})

	if (articlesTagsArray && articlesTagsArray.length > 0) {
		articlesTagsArray.forEach(tag => {
			articlesTags.add(tag.textContent)
		})

		const articlesFiltersList = document.createElement('div')
		articlesFiltersList.classList.add('filters__list')

		articlesTags.forEach(uniqueTag => {
			let uniqueTagElement = document.createElement('button')
			uniqueTagElement.classList.add('tag', 'filters__button')
			uniqueTagElement.innerText = uniqueTag
			uniqueTagElement.dataset.filtertag = uniqueTag
			articlesFiltersList.appendChild(uniqueTagElement)
		})

		articlesFilters.appendChild(articlesFiltersList)

		articlesFilters.classList.remove('articles__filters--hidden')

		articlesFiltersList.addEventListener('click', (event) => {
			if (event.target.classList.contains('filters__button')) {
				if (!searchTags.some(substring => substring === event.target.dataset.filtertag)) {
					searchTags.push(event.target.dataset.filtertag)
					event.target.classList.add('tag--active')
				} else {
					searchTags = searchTags.filter(word => word !== event.target.dataset.filtertag)
					event.target.classList.remove('tag--active')
				}
			}
			findMatchedArticles()
		})
	}

}

