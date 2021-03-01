export const startRun = (event, keys) => {
    event.preventDefault();
    if (['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'].includes(event.key)) {
        keys[event.key] = true;
        console.log(keys);
    }
};

export const stopRun = (event, keys) => {
    event.preventDefault();
    if (['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'].includes(event.key)) {
        keys[event.key] = false;
    }
};


export const controlerPositionTank = (keys, position, speed, arena) => {
    if (keys.ArrowLeft) {
        const positionNew = {
            left: (position.left - speed) < 0 ? position.left : position.left - speed,
            top: position.top,
            vector: 'left',
        };
        return positionNew;
    };
    if (keys.ArrowRight) {
        const positionNew = {
            left: (position.left + speed + arena.width / 20) > arena.width ? position.left : position.left + speed,
            top: position.top,
            vector: 'right',
        };
        return positionNew;
    };
    if (keys.ArrowUp) {
        const positionNew = {
            left: position.left,
            top: (position.top - speed) < 0 ? position.top : position.top - speed,
            vector: 'top',
        };
        return positionNew;
    };
    if (keys.ArrowDown) {
        const positionNew = {
            left: position.left,
            top: (position.top + speed + arena.width / 20) > arena.height ? position.top : position.top + speed,
            vector: 'bottom',
        };
        return positionNew;
    };
}

export const startPositionShell = (positionTank, arena) => {
    let positionNew, left, top;
    switch (positionTank.vector) {
        case 'left':
            left = positionTank.left - (arena.width / 100);
            top = positionTank.top + (arena.width / 40) - (arena.width / 200);
            break;
        case 'top':
            left = positionTank.left + (arena.width / 40) - (arena.width / 200);
            top = positionTank.top - (arena.width / 100);
            break;
        case 'right':
            left = positionTank.left + (arena.width / 20);
            top = positionTank.top + (arena.width / 40) - (arena.width / 200);
            break;
        case 'bottom':
            left = positionTank.left + (arena.width / 40) - (arena.width / 200);
            top = positionTank.top + (arena.width / 20);
            break;
    };
    if ( left < 0 || top < 0 || left > arena.width || top > arena.height) {
        positionNew = null;
    } else {
        positionNew = {
            left: left,
            top: top,
            vector: positionTank.vector,
        }
    };
    return positionNew;
}

export const controlerPositionShell = (position, speed, arena) => {
    let positionNew, left, top;
    switch (position.vector) {
        case 'left':
            left = position.left - speed;
            top = position.top;
            break;
        case 'top':
            left = position.left;
            top = position.top - speed;
            break;
        case 'right':
            left = position.left + speed;
            top = position.top;
            break;
        case 'bottom':
            left = position.left;
            top = position.top + speed;
            break;
    };
    if ( left < 0 || top < 0 || left > arena.width || top > arena.height) {
        positionNew = null;
    } else {
        positionNew = {
            left: left,
            top: top,
            vector: position.vector,
        }
    };
    return positionNew;
};