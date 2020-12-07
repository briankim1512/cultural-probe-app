let headerApp
let tableApp
let apiDirectory = {
    'Emojis': 'api/emotionLog',
    'Answers': 'api/answers',
    'Photos': 'api/uploadImage'
}

window.onload = function () {
    headerApp = new Vue({
        el: '#header-app',
        delimiters: ['[[',']]'],
        data: {
            'visitors': 0,
            'answers': 0,
            'photos': 0
        }
    })

    tableApp = new Vue({
        el: '#table-app',
        delimiters: ['[[',']]'],
        data: {
            'tableTabs': [
                'Emojis',
                'Answers',
                'Photos'
            ],
            'tableHeaders': [],
            'tableRows': []
        }
    })

    tabButtons = document.getElementsByClassName('table-tab')
    for (button of tabButtons) {
        button.addEventListener('click', function () {
            loadTableData(apiDirectory[this.textContent.trim()])
        })
    }

    loadHeaderData()
    loadTableData('api/emotionLog')
}

function loadHeaderData() {
    fetch('api/databaseCount', {
        method: 'GET',
        headers:{'X-CSRFToken': csrfToken},
        credentials: 'same-origin'
    }).then(response => response.json()
    ).then(data => {
        headerApp.visitors = data.details.emojis
        headerApp.answers = data.details.answers
        headerApp.photos = data.details.photos
    })
}

function loadTableData(apiUrl) {
    tableApp.tableHeaders = []
    tableApp.tableRows = []

    fetch(apiUrl, {
        method: 'GET',
        headers:{'X-CSRFToken': csrfToken},
        credentials: 'same-origin'
    }).then(response => response.json()
    ).then(data => {
        data = JSON.parse(data['details'])
        tableApp.tableHeaders = parseHeaders(Object.keys(data[0]['fields']))
        for (row of data) {
            tableApp.tableRows.push(row.fields)
        }
    })
}

function parseHeaders(headers) {
    let parsedHeaders = []

    for (header of headers) {
        if (header == 'uuid') {
            parsedHeaders.push('user ID')
        } else if (header =='puid') {
            parsedHeaders.push('post ID')
        } else {
            parsedHeaders.push(header)
        }
    }

    return parsedHeaders
}