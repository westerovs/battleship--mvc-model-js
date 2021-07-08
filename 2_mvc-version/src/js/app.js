import {model} from './model.js'
import {controller} from './controller.js'

const init = () => {
    // разместить корабли
    model.generateShipLocations();
    
    controller.fire()
}

window.onload = init;





