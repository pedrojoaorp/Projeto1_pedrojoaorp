let users = [
    {id:1,first_name:"Lauren",last_name:"Shaxby",email:"lshaxby0@php.net",created_at:"16/10/2021"},
    {id:2,first_name:"Ardenia",last_name:"Paddingdon",email:"apaddingdon1@nsw.gov.au",created_at:"27/07/2021"},
    {id:3,first_name:"Renaldo",last_name:"Alenichev",email:"ralenichev2@ftc.gov",created_at:"10/06/2021"},
    {id:4,first_name:"Nichole",last_name:"OHeneghan",email:"noheneghan3@flavors.me",created_at:"28/06/2021"},
    {id:5,first_name:"Haywood",last_name:"Daintry",email:"hdaintry4@nhs.uk",created_at:"18/03/2021"},
    {id:6,first_name:"Leslie",last_name:"Daile",email:"ldaile5@vimeo.com",created_at:"23/05/2021"},
    {id:7,first_name:"Byrann",last_name:"Slorance",email:"bslorance6@kickstarter.com",created_at:"15/05/2021"},
    {id:8,first_name:"My",last_name:"Swendell",email:"mswendell7@moonfruit.com",created_at:"15/12/2021"},
    {id:9,first_name:"Brier",last_name:"Esson",email:"besson8@usa.gov",created_at:"14/03/2021"},
    {id:10,first_name:"Seth",last_name:"Piddle",email:"spiddle9@nationalgeographic.com",created_at:"20/10/2021"},
    {id:11,first_name:"Fer",last_name:"Piddle",email:"ferspiddle9@nationalgeographic.com",created_at:"20/10/2022"},
  ]

const usersPerPage = 5

function mod(n, m){
    return ((n % m) + m) % m;
  }

function deleteUser(id, page) {
    users = users.filter(user => user.id !== id)
    document.getElementById(`${id}`).remove()
    setPagination(page)
}

function getUsersElements(page=0){
    const startPage = page * usersPerPage
    const endPage = startPage + usersPerPage

    return users.slice(startPage, endPage).map(user => {
        let row = document.createElement('tr')
        row.setAttribute('id', user.id)

        let userName = document.createElement('td')
        userName.appendChild(document.createTextNode(`${user.first_name} ${user.last_name}`))

        let userEmail = document.createElement('td')
        userEmail.appendChild(document.createTextNode(user.email))

        let userCreatedAt = document.createElement('td')
        userCreatedAt.appendChild(document.createTextNode(user.created_at))

        let actionsCell = document.createElement('td')
        actionsCell.classList.add('action_buttons')

        let editButton = document.createElement('button')
        editButton.classList.add('text_button', 'edit_button')
        editButton.appendChild(document.createTextNode('editar'))

        let deleteButton = document.createElement('button')
        deleteButton .classList.add('text_button', 'delete_button')
        deleteButton.appendChild(document.createTextNode('deletar'))
        deleteButton.setAttribute('type', 'button')
        deleteButton.addEventListener('click', () => deleteUser(user.id, page))

        actionsCell.appendChild(editButton)
        actionsCell.appendChild(deleteButton)

        row.appendChild(userName)
        row.appendChild(userEmail)
        row.appendChild(userCreatedAt)
        row.appendChild(actionsCell)

        return row
    })
}

const tbody = document.querySelector('tbody')

function generatePage(page=0) {
    while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.lastChild)
    }

    getUsersElements(page).forEach(userElement => tbody.appendChild(userElement))
    setPagination(page)
}

function setPagination(currentPage=0) {
    const pagination = document.querySelector('.pagination')
    while (pagination.hasChildNodes()) {
        pagination.removeChild(pagination.lastChild)
    }

    let totalPages = Math.ceil(users.length / usersPerPage)

    let prevPageButton = document.createElement('button')
    prevPageButton.appendChild(document.createTextNode('<<'))
    prevPageButton.setAttribute('type', 'button')
    prevPageButton.addEventListener('click', () => generatePage(mod(currentPage-1, totalPages)))
    pagination.appendChild(prevPageButton)

    for (let page = 0; page < totalPages; page++) {
        let pageButton = document.createElement('button')
        pageButton.appendChild(document.createTextNode(`${page+1}`))
        pageButton.setAttribute('type', 'button')
        
        if (page === currentPage) pageButton.classList.add('active')

        pageButton.addEventListener('click', () => generatePage(page))
        pagination.appendChild(pageButton)
    }

    let nextPageButton = document.createElement('button')
    nextPageButton.appendChild(document.createTextNode('>>'))
    nextPageButton.setAttribute('type', 'button')
    nextPageButton.addEventListener('click', () => generatePage(mod(currentPage+1, totalPages)))
    pagination.appendChild(nextPageButton)
}

getUsersElements(0).forEach(userElement => tbody.appendChild(userElement))
setPagination(0)