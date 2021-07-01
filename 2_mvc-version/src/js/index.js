const seaList = document.querySelector('.sea-list')
const colItems = Array.from(seaList.querySelectorAll('.col-item'))

let a = 444

// ------------------ VIEW

const message = (status, msg) => {
    const messageList = document.querySelector('.message-list')
    const div = document.createElement('div')
    
    div.classList.add('message')
    messageList.append(div)
    
    switch (status) {
        case 'hit':
            div.classList.add('message-hit')
            div.innerHTML = msg + ' Попал !'
            console.log(444)
            break
        case 'miss':
            div.classList.add('message-miss')
            div.innerHTML = msg + ' Промах !'
            break
    }
    
    setTimeout(() => div.remove(), 2000)
}

// ---------------------- controller

const fire = (e) => {
    if (e.target.classList.contains('ship-hit')) return
    
    message('hit', e.target.closest('li').id.toUpperCase())
    e.target.classList.add('ship-hit')
}

const miss = (e) => {
    e.target.classList.add('miss')
    message('miss', e.target.id.toUpperCase())
}

const shot = (e) => {
    if (!e.target.closest('li')) return
    if (e.target.classList.contains('ship')) {
        fire(e)
    }
    else {
        miss(e)
    }
}

seaList.addEventListener('click', shot)


// ---------------------- VIEW
const createShip = (...id) => {
    id.forEach(id => {
        colItems.find(col => {
            if (id.toLowerCase() === col.id.toLowerCase()) {
                const partShip = document.createElement('div')
                partShip.classList.add('ship')
                col.append(partShip)
            }
        })
    })
}

createShip('a7', 'a2', 'b4', 'a1', 'g6', 'b6')
