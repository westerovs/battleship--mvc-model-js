const seaList = document.querySelector('.sea-list')
const colItems = Array.from(seaList.querySelectorAll('.col-item'))

let a = 444

// ------------------ VIEW

const message = (status = 'msg', msg = 'Морской бой!') => {
    const messageList = document.querySelector('.message-list')
    const div = document.createElement('div')
    div.classList.add('message')
    messageList.append(div)
    
    switch (status) {
        case 'hit':
            div.classList.add('message-hit')
            div.innerHTML = msg + ' Попал !'
            setTimeout(() => div.remove(), 5000)
            break
        case 'miss':
            div.classList.add('message-miss')
            div.innerHTML = msg + ' Промах !'
            setTimeout(() => div.remove(), 5000)
            break
        default:
            div.classList.add('message-msg')
            div.innerHTML = msg
            setTimeout(() => div.remove(), 5000)
            break
    }
}

// ---------------------- controller

const fire = (e) => {
    if (!e.target.classList.contains('col-item')) return
    
    e.target.classList.add('hit')
    message('hit', e.target.id)
    
}

const miss = (e) => {
    if (!e.target.classList.contains('col-item')) return
    
    e.target.classList.add('miss')
    message('msg', e.target.id)
}

seaList.addEventListener('click', miss)


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
