export const generateId = () => Math.random().toString(32).substring(2, 9) + (+new Date).toString(32);

export const random = (maxNum, minNum = 0) => minNum + Math.floor(Math.random() * (maxNum - minNum + 1));

export const impact = (objOnePositionElem, objTwoPositionElem, arena, typeOneElem = 'tank', typeTwoElem = 'tank', changeTank = 0) => {
    const { left, top } = objOnePositionElem;
    const leftA = left - changeTank;
    const topA = top - changeTank;
    let rightA, bottomA;
    switch (typeOneElem) {
        case 'tank':
            rightA = left + (arena.width / 20) + changeTank;
            bottomA = top + (arena.width / 20) + changeTank;
            break;
        case 'shot':
            rightA = leftA + (arena.width / 100);
            bottomA = topA + (arena.width / 100);
            break;
    };

    const { left: leftB, top: topB } = objTwoPositionElem;
    let rightB, bottomB;
    switch (typeTwoElem) {
        case 'tank':
            rightB = leftB + (arena.width / 20);
            bottomB = topB + (arena.width / 20);
            break;
        case 'shot':
            rightB = leftB + (arena.width / 100);
            bottomB = topB + (arena.width / 100);
            break;
    };

    if (topA < bottomB && rightA > leftB && leftA < rightB && bottomA > topB) {
        return true;
    };
    return false;
};

export const controlerPositionTank = (keys, position, speed, arena) => {
    if (keys.ArrowLeft) {
        const positionNew = {
            left: (position.left - speed) < 0 ? position.left : position.left - speed,
            top: position.top,
            vector: 'left',
            id: position.id,
        };
        return positionNew;
    };
    if (keys.ArrowRight) {
        const positionNew = {
            left: (position.left + speed + arena.width / 20) > arena.width ? position.left : position.left + speed,
            top: position.top,
            vector: 'right',
            id: position.id,
        };
        return positionNew;
    };
    if (keys.ArrowUp) {
        const positionNew = {
            left: position.left,
            top: (position.top - speed) < 0 ? position.top : position.top - speed,
            vector: 'top',
            id: position.id,
        };
        return positionNew;
    };
    if (keys.ArrowDown) {
        const positionNew = {
            left: position.left,
            top: (position.top + speed + arena.width / 20) > arena.height ? position.top : position.top + speed,
            vector: 'bottom',
            id: position.id,
        };
        return positionNew;
    };
};

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
            id: generateId(),
        }
    };
    return positionNew;
};

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
            id: position.id,
        }
    };
    return positionNew;
};

export const startPositionEnemies = (positionTank, positionEnemyArr, arena) => {
    const direction = ['left', 'top', 'right', 'bottom'];
    let positionNew = {
        left: random((arena.width - (arena.width / 20))),
        top: random((arena.height - (arena.width / 20))),
        vector: direction[random(3)],
        id: generateId(),
    };
    if (impact(positionTank, positionNew, arena, 'tank', 'tank', (arena.width / 10))) {
        return null;
    };
    for (let i = 0; i < positionEnemyArr.length; i++) {
        if (impact(positionEnemyArr[i], positionNew, arena)) {
            positionNew = null;
            break;
        }
    };
    return positionNew;
};

export const controlerPositionEnemies = (positionTank, positionEnemy, speedEnemy) => {
    let positionNew;
    const { left: leftA, top: topA, id, vector} = positionEnemy;
    const { left: leftB, top: topB} = positionTank;
    const minimizingExpansion = elem => Math.floor( elem / 10);
    const horizon = () => {
        if (minimizingExpansion(leftA) === minimizingExpansion(leftB)) {
            positionNew = topA > topB 
            ? {left: leftA, top: topA - speedEnemy, vector: 'top', id: id} 
            : {left: leftA, top: topA + speedEnemy, vector: 'bottom', id: id};
        } else {
            positionNew = leftA > leftB 
            ? {left: leftA - speedEnemy, top: topA, vector: 'left', id: id} 
            : {left: leftA + speedEnemy, top: topA, vector: 'right', id: id};
        };
        return positionNew;
    };
    const vertical = () => {
        if (minimizingExpansion(topA) === minimizingExpansion(topB)) {
            positionNew = leftA > leftB 
            ? {left: leftA - speedEnemy, top: topA, vector: 'left', id: id} 
            : {left: leftA + speedEnemy, top: topA, vector: 'right', id: id};
        } else {
            positionNew = topA > topB 
            ? {left: leftA, top: topA - speedEnemy, vector: 'top', id: id} 
            : {left: leftA, top: topA + speedEnemy, vector: 'bottom', id: id};
        };
        return positionNew;
    };
    return (vector === 'left') || (vector === 'right') ? horizon() : vertical();
};

export const startPositionShellEnemies = (positionTank, positionEnemy, arena) => {
    let positionNew = null;
    const { left: leftA, top: topA, vector} = positionEnemy;
    const { left: leftB, top: topB} = positionTank;
    const minimizingExpansion = elem => Math.floor( elem / 10);
    switch (positionEnemy.vector) {
        case 'left':
            if ((minimizingExpansion(topA) === minimizingExpansion(topB)) && (leftA > leftB)) {
                positionNew = {
                    left: leftA - (arena.width / 100),
                    top: topA + (arena.width / 40) - (arena.width / 200),
                    vector: vector,
                    id: generateId(),
                }
            };
            break;
        case 'right':
            if ((minimizingExpansion(topA) === minimizingExpansion(topB)) && (leftA < leftB)) {
                positionNew = {
                    left: leftA + (arena.width / 20),
                    top: topA + (arena.width / 40) - (arena.width / 200),
                    vector: vector,
                    id: generateId(),
                }
            };
            break;
        case 'top':
            if ((minimizingExpansion(leftA) === minimizingExpansion(leftB)) && (topA > topB)) {
                positionNew = {
                    left: leftA + (arena.width / 40) - (arena.width / 200),
                    top: topA - (arena.width / 100),
                    vector: vector,
                    id: generateId(),
                }
            };
            break;
        case 'bottom':
            if ((minimizingExpansion(leftA) === minimizingExpansion(leftB)) && (topA < topB)) {
                positionNew = {
                    left: leftA + (arena.width / 40) - (arena.width / 200),
                    top: topA + (arena.width / 20),
                    vector: vector,
                    id: generateId(),
                }
            };
            break;
    };
    return positionNew;
};