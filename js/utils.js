
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function randomBetween(min, max) {
    if (min < 0) {
        return min + Math.random() * (Math.abs(min)+max);
    }else {
        return min + Math.random() * max;
    }
}

function checkIntersection(ball1, ball2) {
    return checkIntersectionWithSize(ball1, ball2, playerSize);
}

function checkIntersectionWithSize(ball1, ball2, size) {
    var xDist = ball1.x - ball2.x;
    var yDist = ball1.y - ball2.y;

    var distance = Math.sqrt(xDist * xDist + yDist * yDist);
    return distance < enemySize + size;
}

function checkWallCollisionX(target, size) {
    return !!((target.x - size <= 60) || (target.x + size >= window.innerWidth - 10));
}

function checkWallCollisionY(target, size) {
    return !!((target.y - size <= 10) || (target.y + size >= window.innerHeight - 10));
}