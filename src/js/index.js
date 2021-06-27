const seaList = document.querySelector('.sea-list')
const colItems = Array.from(seaList.querySelectorAll('.col-item'))

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
    let count = 0
    
    colItems.forEach((item, index) => {
        if (item.id.toLowerCase() === id[count]) {
            const partShip = document.createElement('div')
            partShip.classList.add('ship')
            item.append(partShip)
            
            count++
        }
    })
}

createShip('f3', 'f4', 'f5', 'g1')
